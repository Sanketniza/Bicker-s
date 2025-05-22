const Product = require("../models/product.model");
const Company = require("../models/company.model");
const getDataUri = require("../utils/datauri");
const cloudinary = require("../utils/cloudinary");


// Create Product
exports.createProduct = async (req, res) => {
    try {
        const { title, description, price, stock, location, category, tags, companyId } = req.body;
        
        console.log("Request body:", req.body);
        console.log("Request files:", req.files ? Object.keys(req.files) : "No files");
        
        if (req.files && req.files.images) {
            console.log(`Found ${req.files.images.length} images to upload`);
            req.files.images.forEach((img, i) => 
                console.log(`Image ${i+1}: ${img.originalname}, Size: ${img.size}, Type: ${img.mimetype}`)
            );
        }
        
        // Validate required fields
        if (!title || !description || !price || !location || !category || !companyId) {
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

        // Parse specifications from form data
        let specifications = {};
        try {
            if (typeof req.body.specifications === 'string') {
                specifications = JSON.parse(req.body.specifications);
            } else if (req.body.specifications) {
                specifications = req.body.specifications;
            }
        } catch (error) {
            console.error("Error parsing specifications:", error);
            specifications = {};
        }

        // Parse features from form data
        let features = [];
        try {
            if (typeof req.body.features === 'string') {
                features = JSON.parse(req.body.features);
            } else if (req.body.features) {
                features = req.body.features;
            }
        } catch (error) {
            console.error("Error parsing features:", error);
            features = [];
        }

        // Handle image and video uploads with improved error handling
        let imageUrls = [];
        let videoUrls = [];
        let logoUrl = null;

        if (req.files) {
            // Process logo
            if (req.files.logo && req.files.logo[0]) {
                try {
                    console.log("Processing logo:", req.files.logo[0].originalname);
                    const logoDataUri = getDataUri(req.files.logo[0]);
                    if (logoDataUri && logoDataUri.content) {
                        const logoResult = await cloudinary.uploader.upload(logoDataUri.content, {
                            folder: "product_logos",
                            resource_type: "auto"
                        });
                        logoUrl = logoResult.secure_url;
                        console.log("Logo uploaded successfully:", logoUrl);
                    } else {
                        console.error("Failed to get dataURI for logo");
                    }
                } catch (error) {
                    console.error("Logo upload error:", error);
                }
            }

            // Process images
            if (req.files.images && req.files.images.length > 0) {
                console.log(`Processing ${req.files.images.length} images`);
                
                for (const image of req.files.images) {
                    try {
                        console.log("Processing image:", image.originalname);
                        const imageDataUri = getDataUri(image);
                        
                        if (!imageDataUri || !imageDataUri.content) {
                            console.error("Failed to get dataURI for image:", image.originalname);
                            continue;
                        }
                        
                        console.log(`Uploading image: ${image.originalname} to Cloudinary...`);
                        const imageResult = await cloudinary.uploader.upload(imageDataUri.content, {
                            folder: "product_images",
                            resource_type: "auto"
                        });
                        
                        imageUrls.push(imageResult.secure_url);
                        console.log("Image uploaded successfully:", imageResult.secure_url);
                    } catch (error) {
                        console.error(`Error uploading image ${image.originalname}:`, error);
                    }
                }
            } else {
                console.log("No images found in the request");
            }

            // Process videos
            if (req.files.videos && req.files.videos.length > 0) {
                console.log(`Processing ${req.files.videos.length} videos`);
                
                for (const video of req.files.videos) {
                    try {
                        console.log("Processing video:", video.originalname);
                        const videoDataUri = getDataUri(video);
                        
                        if (!videoDataUri || !videoDataUri.content) {
                            console.error("Failed to get dataURI for video");
                            continue;
                        }
                        
                        console.log(`Uploading video: ${video.originalname} to Cloudinary...`);
                        const videoResult = await cloudinary.uploader.upload(videoDataUri.content, {
                            resource_type: "video",
                            folder: "product_videos",
                            timeout: 300000 // 5 minute timeout for videos
                        });
                        
                        videoUrls.push(videoResult.secure_url);
                        console.log("Video uploaded successfully:", videoResult.secure_url);
                    } catch (error) {
                        console.error(`Error uploading video ${video.originalname}:`, error);
                    }
                }
            }
        }

        // Handle tags
        let parsedTags = [];
        if (tags) {
            try {
                parsedTags = typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()) : tags;
            } catch (error) {
                console.log("Error parsing tags:", error);
            }
        }

        // Create product with all the data
        console.log("Creating product with image count:", imageUrls.length);
        console.log("Image URLs:", imageUrls);
        
        const productData = {
            title,
            description,
            price: Number(price),
            stock: Number(stock || 0),
            location,
            category,
            tags: parsedTags,
            shopOwnerId: req.user.id,
            ownerId: req.user.id,
            companyId,
            specifications,
            features,
            images: imageUrls,
            videos: videoUrls
        };

        if (logoUrl) {
            productData.logo = logoUrl;
        }

        const product = await Product.create(productData);

        return res.status(201).json({
            message: "Product created successfully.",
            success: true,
            product,
        });

    } catch (error) {
        console.error("Error in createProduct:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message || "Unknown error",
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
        // Populate both owner IDs to help with client-side filtering
        const products = await Product.find()
            .populate('shopOwnerId', '_id')
            .populate('ownerId', '_id');

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
};

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
            .populate('shopOwnerId', 'fullname email phone')
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
        });    } catch (error) {
        console.error("Error in getProductById:", error.message);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};

// Get Products owned by the current user
exports.getUserProducts = async(req, res) => {
    try {
        const userId = req.user.id;
        
        // Find products where the user is either the shop owner or the owner
        const products = await Product.find({
            $or: [
                { shopOwnerId: userId },
                { ownerId: userId }
            ]
        }).populate('companyId', 'name');
        
        return res.status(200).json({
            message: "User products retrieved successfully.",
            success: true,
            products,
        });
    } catch (error) {
        console.error("Error in getUserProducts:", error.message);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};