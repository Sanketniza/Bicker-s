const Product = require("../models/product.model");
const Company = require("../models/company.model");
const getDataUri = require("../utils/datauri");
const cloudinary = require("../utils/cloudinary");

// Create Product
exports.createProduct = async(req, res) => {
    try {
        const { title, description, price, stock, location, category, tags, companyId , specifications , features} = req.body;

        // Validate required fields
        if (!title || !description || !price || !stock || !location || !category || !companyId || !features || !specifications) {
            return res.status(400).json({
                message: "Please provide all required fields.",
                success: false,
            });
        }

        // Check if the company exists
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false,
            });
        }

        // Validate ownership
        if (company.ownerId.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied! You can only create products in your own company.",
                success: false,
            });
        }

        // Handle image and video uploads
        let imageUrls = [];
        let videoUrls = [];

        if (req.files) {
            // Handle images
            if (req.files.images) {
                for (const image of req.files.images) {
                    const dataUri = getDataUri(image);
                    const cloudResponse = await cloudinary.uploader.upload(dataUri.content);
                    imageUrls.push(cloudResponse.secure_url);
                }
            }

            // Handle videos
            if (req.files.videos) {
                for (const video of req.files.videos) {
                    const dataUri = getDataUri(video);
                    const cloudResponse = await cloudinary.uploader.upload(dataUri.content, {
                        resource_type: "video"
                    });
                    videoUrls.push(cloudResponse.secure_url);
                }
            }
        }

        // Handle tags properly
        let parsedTags = [];
        if (tags) {
            // If tags is a string, try to parse it
            try {
                parsedTags = typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()) : tags;
            } catch (error) {
                console.log("Error parsing tags:", error);
                parsedTags = [];
            }
        }

        // Create product
        const product = await Product.create({
            title,
            description,
            price: Number(price),
            stock: Number(stock),
            location,
            category,
            tags: parsedTags,
            shopOwnerId: req.user.id,
            companyId,
            specifications,
            features,
            images: imageUrls,
            videos: videoUrls,
        });

        return res.status(201).json({
            message: "Product created successfully.",
            success: true,
            product,
        });

    } catch (error) {
        console.error("Error in createProduct:", error.message);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};

// Get All Products for a Specific Company
exports.getProductsByCompany = async(req, res) => {
    try {
        const { companyId } = req.params;

        // Check if company exists
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false,
            });
        }

        const products = await Product.find({ companyId });

        return res.status(200).json({
            message: "Products retrieved successfully.",
            success: true,
            products,
        });

    } catch (error) {
        console.error("Error in getProductsByCompany:", error.message);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};



// Get All Products
exports.getAllProducts = async(req, res) => {

    try {
        const products = await Product.find();

        if (!products) {
            return res.status(404).json({
                message: "No products found.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Products retrieved successfully.",
            success: true,
            products,
        });


    } catch (error) {
        console.error("Error in getAllProducts:", error.message);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
}


// Update Product
exports.updateProduct = async(req, res) => {
    try {
        const { productId } = req.params;
        const { companyId, title, description, price, stock, location, category, tags , specifications , features } = req.body;

        // Validate required fields
        if (!companyId || !productId) {
            return res.status(400).json({
                message: "Product ID and Company ID are required.",
                success: false,
            });
        }

        // Check if company exists
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false,
            });
        }

        // Validate ownership
        if (company.ownerId.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied! You can only update products in your own company.",
                success: false,
            });
        }

        // Check if product exists
        let product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found.",
                success: false,
            });
        }

        // Validate ownership
        if (product.shopOwnerId.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied! Only the owner can update this product.",
                success: false,
            });
        }


        // Handle product image upload (optional)
        if (req.file) {
            const dataUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(dataUri.content);
            product.image = cloudResponse.secure_url;
        }

        // Update product fields
        if (title) product.title = title;
        if (description) product.description = description;
        if (price) product.price = price;
        if (stock) product.stock = stock;
        if (location) product.location = location;
        if (category) product.category = category;
        if (tags) product.tags = tags;
        if (specifications) product.specifications = specifications;
        if (features) product.features = features;



        // Handle image and video updates
        if (req.files) {
            if (req.files.images) {
                const imageUrls = [];
                for (let image of req.files.images) {
                    const dataUri = getDataUri(image);
                    const cloudResponse = await cloudinary.uploader.upload(dataUri.content);
                    imageUrls.push(cloudResponse.secure_url);
                }
                product.images = imageUrls;
            }

            if (req.files.videos) {
                const videoUrls = [];
                for (let video of req.files.videos) {
                    const dataUri = getDataUri(video);
                    const cloudResponse = await cloudinary.uploader.upload(dataUri.content, { resource_type: "video" });
                    videoUrls.push(cloudResponse.secure_url);
                }
                product.videos = videoUrls;
            }
        }

        await product.save();

        return res.status(200).json({
            message: "Product updated successfully.",
            success: true,
            product,
        });

    } catch (error) {
        console.error("Error in updateProduct:", error.message);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};

// Increment Product Views
exports.incrementViews = async(req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found.",
                success: false,
            });
        }

        product.views += 1;
        await product.save();

        return res.status(200).json({
            message: "Product views incremented.",
            success: true,
            views: product.views,
        });
    } catch (error) {
        console.error("Error in incrementViews:", error.message);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};

// Delete Product
exports.deleteProduct = async(req, res) => {
    try {
        const { productId, companyId } = req.params;

        // Check if company exists
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false,
            });
        }

        // Validate ownership
        if (company.ownerId.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied! You can only delete products in your own company.",
                success: false,
            });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found.",
                success: false,
            });
        }

        await product.deleteOne();

        return res.status(200).json({
            message: "Product deleted successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Error in deleteProduct:", error.message);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};

// Get Product by ID
exports.getProductById = async(req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findById(productId)
            .populate('shopOwnerId', 'fullname email')
            .populate('companyId', 'name');

        if (!product) {
            return res.status(404).json({
                message: "Product not found.",
                success: false,
            });
        }

        // Increment views when product is fetched
        product.views += 1;
        await product.save();

        return res.status(200).json({
            message: "Product retrieved successfully.",
            success: true,
            product,
        });

    } catch (error) {
        console.error("Error in getProductById:", error.message);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};