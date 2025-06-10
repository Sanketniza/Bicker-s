import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../shared/AdminNavbar";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import Footer from "../shared/footer";
import { Link } from "react-router-dom";
import { removeProduct, setSingleProduct } from "../../store/productSlice";

function ProductEdit() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [imagesToDelete, setImagesToDelete] = useState([]);
    const [videosToDelete, setVideosToDelete] = useState([]);
    
    // Form states
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        images: [],
        videos: [],
        features: [""],
        specifications: {
            EngineType: "",
            Displacement: "",
            Power: "",
            Condition: "",
        },
        status: "active",
        logoFile: null,
        companyId: "",
        category: "bike",
        tags: "",
        stock: 0,
    });
    
    const [imageFiles, setImageFiles] = useState([]);
    const [videoFiles, setVideoFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [videoPreviews, setVideoPreviews] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [existingVideos, setExistingVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Get product and companies from Redux
    const { allProducts, singleProduct } = useSelector(state => state.product);
    const { companies } = useSelector(state => state.company);
    
    // Fetch product data on component mount
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                // First check if we already have it in Redux
                let product = allProducts.find(p => p._id === id) || 
                              (singleProduct?._id === id ? singleProduct : null);
                
                if (!product) {
                    // If not in Redux, fetch it
                    const response = await axios.get(`http://localhost:8000/api/v1/product/${id}`, {
                        withCredentials: true
                    });
                    
                    if (response.data.success) {
                        product = response.data.product;
                        dispatch(setSingleProduct(product));
                    } else {
                        throw new Error(response.data.message || "Failed to fetch product");
                    }
                }
                
                if (product) {
                    // Populate form with product data
                    populateFormData(product);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                toast.error("Failed to load product information");
            } finally {
                setLoading(false);
            }
        };
        
        if (id) {
            fetchProduct();
        }
    }, [id, allProducts, singleProduct, dispatch]);
    
    // Populate form with existing product data
    const populateFormData = (product) => {

        const tagString = Array.isArray(product.tags) 
            ? product.tags.join(", ") 
            : product.tags || "";
            
        // Handle companyId - could be string or object
        const companyId = typeof product.companyId === 'object'
            ? product.companyId._id
            : product.companyId;
            
        // Get existing images and videos
        const productImages = product.images || [];
        const productVideos = product.videos || [];
        
        setExistingImages(productImages);
        setExistingVideos(productVideos);
        
        // Create preview URLs for existing media
        setImagePreviews(productImages);
        setVideoPreviews(productVideos);
        
        // Build specifications object with defaults
         const specs = product.specifications || {};
        const defaultSpecs = {
            EngineType: "",
            Displacement: "",
            Power: "",
            Condition: ""
        };

        // Filter out any non-primitive values and ensure only expected keys
        const cleanSpecs = {};
        Object.entries(specs).forEach(([key, value]) => {
            // Only include string/number values and skip if value is object/array
            if (typeof value !== 'object' && value !== null) {
                cleanSpecs[key] = value;
            }
        });
        
         // Merge with default specs to ensure all fields exist
        const mergedSpecs = { ...defaultSpecs, ...cleanSpecs };
        
        // Rest of your existing code
        setForm({
            title: product.title || "",
            description: product.description || "",
            price: product.price || "",
            location: product.location || "",
            images: productImages,
            videos: productVideos,
            features: product.features?.length > 0 ? product.features : [""],
            specifications: mergedSpecs, // Now using cleaned specs
            status: product.status || "active",
            logo: product.logo || "",
            companyId: companyId || "",
            category: product.category || "bike",
            tags: tagString,
            stock: product.stock || 0,
        });
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes("specifications.")) {
            const specKey = name.split(".")[1];
            setForm({ ...form, specifications: { ...form.specifications, [specKey]: value } });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleLogoChange = (e) => {
        if (e.target.files[0]) {
            setForm({
                ...form,
                logoFile: e.target.files[0],
                logo: URL.createObjectURL(e.target.files[0])
            });
        }
    };
    
    const handleImageChange = (index, e) => {
        if (e.target.files[0]) {
            const newImageFiles = [...imageFiles];
            newImageFiles[index] = e.target.files[0];
            setImageFiles(newImageFiles);

            const newImagePreviews = [...imagePreviews];
            newImagePreviews[index] = URL.createObjectURL(e.target.files[0]);
            setImagePreviews(newImagePreviews);
        }
    };
    
    const addImageField = () => {
        setImageFiles([...imageFiles, null]);
        setImagePreviews([...imagePreviews, ""]);
    };

    const removeImageField = (index) => {
        const newImageFiles = imageFiles.filter((_, i) => i !== index);
        setImageFiles(newImageFiles);
        
        const newImagePreviews = [...imagePreviews];
        newImagePreviews.splice(index, 1);
        setImagePreviews(newImagePreviews);
    };
    
    const handleVideoChange = (index, e) => {
        if (e.target.files[0]) {
            const newVideoFiles = [...videoFiles];
            newVideoFiles[index] = e.target.files[0];
            setVideoFiles(newVideoFiles);

            const newVideoPreviews = [...videoPreviews];
            newVideoPreviews[index] = URL.createObjectURL(e.target.files[0]);
            setVideoPreviews(newVideoPreviews);
        }
    };
    
    const addVideoField = () => {
        setVideoFiles([...videoFiles, null]);
        setVideoPreviews([...videoPreviews, ""]);
    };
    

    const removeVideoField = (index) => {
        const newVideoFiles = videoFiles.filter((_, i) => i !== index);
        setVideoFiles(newVideoFiles);
        
        const newVideoPreviews = [...videoPreviews];
        newVideoPreviews.splice(index, 1);
        setVideoPreviews(newVideoPreviews);
    };

    const handleDeleteExistingImage = (index) => {
    // Mark image for deletion
    setImagesToDelete([...imagesToDelete, index]);
    
    // Remove from display
    const updatedImages = [...existingImages];
    updatedImages.splice(index, 1);
    setExistingImages(updatedImages);
    
    // Also update previews
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);
};

// Add this function to handle existing video deletion
const handleDeleteExistingVideo = (index) => {
    // Mark video for deletion
    setVideosToDelete([...videosToDelete, index]);
    
    // Remove from display
    const updatedVideos = [...existingVideos];
    updatedVideos.splice(index, 1);
    setExistingVideos(updatedVideos);
    
    // Also update previews
    const updatedPreviews = [...videoPreviews];
    updatedPreviews.splice(index, 1);
    setVideoPreviews(updatedPreviews);
};
    
    const handleArrayChange = (field, index, value) => {
        const updated = [...form[field]];
        updated[index] = value;
        setForm({ ...form, [field]: updated });
    };

    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!form.title || !form.description || !form.price || !form.companyId) {
            toast.error("Please fill in all required fields");
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            const formData = new FormData();
            
            // Add basic fields
            formData.append("title", form.title);
            formData.append("description", form.description);
            formData.append("price", form.price);
            formData.append("location", form.location);
            formData.append("category", form.category);
            formData.append("status", form.status);
            formData.append("companyId", form.companyId);
            formData.append("stock", form.stock);
            
            // Add logo if exists
            if (form.logoFile) {
                formData.append("logo", form.logoFile);
            }
            
            // Add specifications
            Object.entries(form.specifications).forEach(([key, value]) => {
                formData.append(`specifications[${key}]`, value);
            });
            
            // Add features
            const filteredFeatures = form.features.filter(f => f.trim() !== "");
            filteredFeatures.forEach((feature, index) => {
                formData.append(`features[${index}]`, feature);
            });
            
            // Add tags
            if (form.tags) {
                formData.append("tags", form.tags);
            }
            
            // Add new images
            imageFiles.forEach((file, index) => {
                if (file) {
                    formData.append(`images`, file);
                }
            });
            
            // Add new videos
            videoFiles.forEach((file, index) => {
                if (file) {
                    formData.append(`videos`, file);
                }
            });

            if (imagesToDelete.length > 0) {
                formData.append("deleteImages", JSON.stringify(imagesToDelete));
            }

            if (videosToDelete.length > 0) {
                formData.append("deleteVideos", JSON.stringify(videosToDelete));
            }
            
            // Make the update request
            const response = await axios.put(
                `http://localhost:8000/api/v1/product/${id}`,
                formData, 
                {
                    withCredentials: true,
                    headers: {
                        // Don't set Content-Type when using FormData
                    }
                }
            );
            
            if (response.data.success) {
                toast.success("Product updated successfully!");
                // Update Redux store
                dispatch(setSingleProduct(response.data.product));
                // Navigate back
                navigate("/admin-products");
            } else {
                throw new Error(response.data.message || "Failed to update product");
            }
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error(`Error updating product: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleDelete = async () => {
        // Confirm deletion with the user
        if (!window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
            return;
        }
        
        if (!form.companyId) {
            toast.error("Product information incomplete. Cannot delete.");
            return;
        }
        
        setIsDeleting(true);
        
        try {
            console.log(`Deleting product: ${id} from company: ${form.companyId}`);
            
            const response = await axios.delete(`http://localhost:8000/api/v1/product/${id}/${form.companyId}`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            if (response.data?.success) {
                toast.success(
                    "Product deleted successfully!",
                    {
                        style: {
                            color: '#10B981',
                            backgroundColor: '#09090B',
                            fontSize: '20px',
                            borderColor: '#10B981',
                            padding: '10px 20px'
                        }
                    }
                );
                
                dispatch(removeProduct(id));
                navigate("/admin-products");
            } else {
                toast.error(
                    response.data?.message || "Failed to delete product",
                    {
                        style: {
                            color: '#f44336',
                            backgroundColor: '#fff',
                            fontSize: '18px',
                            borderColor: '#f44336',
                            padding: '10px 20px'
                        }
                    }
                );
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            
            const errorMessage = error.response?.data?.message || 
                              "Failed to delete product. Please try again.";
            
            toast.error(errorMessage);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <AdminNavbar />
            
            <div className="mx-10">
                <div className="relative p-10 mx-auto my-20 border rounded-lg shadow-2xl border-emerald-500/30 max-w-4xl bg-black/20 backdrop-blur-sm">
                    <div
                        className="absolute inset-0 rounded-lg opacity-30 blur-xl"
                        style={{
                            background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3), transparent 80%)`,
                        }}
                    />

                    <div className="relative z-10 text-white">
                        <h1 className="text-3xl font-bold text-center text-white  mb-6">
                            <span className="text-green-500">Update</span> Product
                        </h1>

                        {/* Divider */}
                        <div className="my-10 border-t border-gray-700"></div>

                        <div className="flex justify-between items-center">
                            <Link to="/admin-products" className="flex items-center px-4 py-2 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition duration-200 ease-in-out">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                <span className="text-white font-semibold text-lg">Back</span>
                            </Link>

                            <h3 className="text-2xl font-bold text-white">
                                <span className="text-orange-500">Would you like to Delete</span> this Company?
                            </h3>
                            
                            <button 
                                className={`${
                                    isDeleting 
                                        ? "bg-gray-500" 
                                        : "bg-red-500 hover:bg-red-700"
                                } text-white py-2 px-4 rounded-lg flex items-center`}
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Deleting...
                                    </>
                                ) : "Delete Product"}
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="my-10 border-t border-gray-700"></div>

                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6" encType="multipart/form-data">
                                <div>
                                    <label className="block mb-1 text-[20px] text-yellow-500 font-semibold">Product Name*</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        placeholder="Enter product name"
                                        className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-[20px] text-yellow-500 font-semibold">Logo</label>
                                    <input
                                        type="file"
                                        name="logoFile"
                                        accept="image/*"
                                        onChange={handleLogoChange}
                                        className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                                    />
                                    {form.logo && (
                                        <img
                                            src={form.logo}
                                            alt="preview"
                                            className="mt-2 w-16 h-16 rounded-full object-cover"
                                        />
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block mb-1 text-[20px] text-yellow-500 font-semibold">Description *</label>
                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        placeholder="Enter description (max 1000 characters)"
                                        maxLength={1000}
                                        className="w-full px-4 py-2 rounded bg-black/50 text-zinc-300 border border-white/20 h-28"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-[20px] text-yellow-500 font-semibold">Type *</label>
                                    <select 
                                        name="category" 
                                        value={form.category} 
                                        onChange={handleChange} 
                                        className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20" 
                                        required
                                    >
                                        <option value="bike">Bike</option>
                                        <option value="car">Car</option>
                                        <option value="Scooter">Scooter</option>
                                        <option value="Electric Bike">Electric Bike</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-1 text-[20px] text-yellow-500 font-semibold">Price *</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={form.price}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-[20px] text-yellow-500 font-semibold ">Location *</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={form.location}
                                        onChange={handleChange}
                                        placeholder="Enter location ex: Kolhapur, Maharashtra"
                                        className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-[20px] text-yellow-500 font-semibold">Company *</label>
                                    <select 
                                        name="companyId" 
                                        value={form.companyId} 
                                        onChange={handleChange} 
                                        className="w-full px-4 py-2 rounded bg-black/50 text-zinc-500 border border-white/20" 
                                        required
                                    >
                                        <option value="">Select Company</option>
                                        {companies.map((company) => (
                                            <option key={company._id} value={company._id}>{company.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-1 text-[20px] text-yellow-500 font-semibold">Status</label>
                                    <select 
                                        name="status" 
                                        value={form.status} 
                                        onChange={handleChange} 
                                        className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="sold">Sold</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-1 text-[20px] text-yellow-500 font-semibold">Tags</label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="text"
                                            name="tags"
                                            value={form.tags}
                                            onChange={handleChange}
                                            placeholder="Enter tags (comma separated)"
                                            className="flex-1 px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                                        />
                                    </div>
                                    <p className="text-xs  text-gray-400">Separate tags with commas</p>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-[26px] text-yellow-500 font-semibold">Photos</label>
                                    
                                    {/* Existing images */}
                                    {existingImages.length > 0 && (
                                        <div className="mb-4">
                                            <p className="text-sm text-gray-400 mb-2">Existing Images</p>
                                            <div className="flex flex-wrap gap-2">
                                                {existingImages.map((url, index) => (
                                                    <div key={`existing-${index}`} className="relative group">
                                                        <img 
                                                            src={url} 
                                                            alt={`existing-${index}`}
                                                            className="w-16 h-16 object-cover rounded"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteExistingImage(index)}
                                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-80 hover:opacity-100"
                                                            title="Remove image"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* New images */}
                                    {/* <p className="text-sm text-gray-400 mb-2">Add New Images</p> */}
                                    {imagePreviews.slice(existingImages.length).map((preview, index) => (
                                        <div key={index} className="flex items-center space-x-2 mb-2">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageChange(index + existingImages.length, e)}
                                                className="flex-1 px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                                            />
                                            {preview && (
                                                <img 
                                                    src={preview} 
                                                    alt={`preview-${index}`} 
                                                    className="w-16 h-16 rounded-full object-cover" 
                                                />
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => removeImageField(index + existingImages.length)}
                                                className="p-1 bg-red-500 text-white rounded transition duration-200 hover:bg-red-600 active:bg-red-800"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addImageField}
                                        className="mt-2 px-4 py-2 bg-green-500 text-white rounded transition duration-200 hover:bg-green-600 active:bg-green-700"
                                        disabled={imagePreviews.length >= 15}
                                    >
                                        Add Photo
                                    </button>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block mt-3 text-[26px] text-yellow-500 font-semibold">Videos</label>
                                    
                                    {/* Existing videos */}
                                    {existingVideos.length > 0 && (
                                        <div className="mb-4">
                                            <p className="text-sm text-gray-400">Existing Videos</p>
                                            <div className="flex flex-wrap gap-2">
                                                {existingVideos.map((url, index) => (
                                                    <div key={`existing-video-${index}`} className="relative group">
                                                        <video 
                                                            src={url} 
                                                            className="w-24 h-24 object-cover rounded"
                                                            controls
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteExistingVideo(index)}
                                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-80 hover:opacity-100"
                                                            title="Remove video"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* New videos */}
                                    {/* <p className="text-sm text-gray-400 ">Add New Videos</p> */}
                                    {videoPreviews.slice(existingVideos.length).map((preview, index) => (
                                        <div key={index} className="flex items-center space-x-2 mb-2">
                                            <input
                                                type="file"
                                                accept="video/*"
                                                onChange={(e) => handleVideoChange(index + existingVideos.length, e)}
                                                className="flex-1 px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                                            />
                                            {preview && (
                                                <video 
                                                    src={preview} 
                                                    alt={`preview-${index}`} 
                                                    className="w-16 h-16 rounded-full object-cover" 
                                                    controls 
                                                />
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => removeVideoField(index + existingVideos.length)}
                                                className="p-1 bg-red-500 text-white rounded transition duration-200 hover:bg-red-600 active:bg-red-800"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addVideoField}
                                        className="mt-2 px-4 py-2 bg-green-500 text-white rounded transition duration-200 hover:bg-green-600 active:bg-green-700"
                                        disabled={videoPreviews.length >= 10}
                                    >
                                        Add Video
                                    </button>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block mb-1 text-[20px] text-yellow-500 font-semibold">Features</label>
                                    <div className="space-y-2">
                                        {form.features.map((feature, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <input
                                                    type="text"
                                                    value={feature}
                                                    onChange={(e) => handleArrayChange('features', index, e.target.value)}
                                                    className="flex-1 px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                                                    placeholder="Enter feature"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const updatedFeatures = form.features.filter((_, i) => i !== index);
                                                        setForm({ ...form, features: updatedFeatures.length ? updatedFeatures : [""] });
                                                    }}
                                                    className="p-1 bg-red-500 text-white rounded transition duration-200 hover:bg-red-600 active:bg-red-800"
                                                    disabled={form.features.length <= 1}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => setForm({ ...form, features: [...form.features, ""] })}
                                            className="mt-2 px-4 py-2 bg-green-500 text-white rounded transition duration-200 hover:bg-green-600 active:bg-green-700"
                                            disabled={form.features.length >= 10}
                                        >
                                            Add Feature
                                        </button>
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block mb-2 text-center w-full text-2xl text-green-500">Specifications *</label>
                                    <div className="grid grid-cols-2 gap-4 w-full">
                                        {Object.keys(form.specifications).map((key) => (
                                            <div key={key} className="relative">
                                                <label className="block mb-2 text-[20px] text-yellow-500 font-semibold">{key}</label>
                                                <input
                                                    type="text"
                                                    name={`specifications.${key}`}
                                                    value={form.specifications[key]}
                                                    onChange={handleChange}
                                                    placeholder={`ex, ${key === 'EngineType' ? '4-stroke' : key === 'Displacement' ? '159.7cc' : key === 'Power' ? '15.1hp @ 8000rpm' : key === 'Condition' ? 'New' : ''}`}
                                                    className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                                                    required
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block mb-1 text-[20px] text-yellow-500 font-semibold">Stock *</label>
                                    <input 
                                        name="stock" 
                                        type="number" 
                                        value={form.stock} 
                                        onChange={handleChange} 
                                        placeholder="Stock" 
                                        className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20" 
                                        required 
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`md:col-span-2 ${isSubmitting ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-700'} py-2 px-6 rounded text-white font-semibold shadow mt-4 mx-auto w-4/5 flex justify-center items-center`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Updating...
                                        </>
                                    ) : (
                                        "Update Product"
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default ProductEdit;