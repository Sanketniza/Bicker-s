import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../shared/AdminNavbar";
import Footer from "../shared/footer";
import axios from "axios";
import { Link } from "wouter";
import { useSelector } from "react-redux";
import { toast } from "sonner";

function ProductsCreation() {
    const navigate = useNavigate();
    const { companies } = useSelector((state) => state.company);

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
    const [loading, setLoading] = useState(false);

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
        
        const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
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
        
        const newVideoPreviews = videoPreviews.filter((_, i) => i !== index);
        setVideoPreviews(newVideoPreviews);
    };

    const handleArrayChange = (field, index, value) => {
        const updated = [...form[field]];
        updated[index] = value;
        setForm({ ...form, [field]: updated });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

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
            
            // Add specifications as JSON string
            formData.append("specifications", JSON.stringify(form.specifications));
            
            // Add features as JSON string (filter empty ones)
            const filteredFeatures = form.features.filter(f => f.trim() !== "");
            formData.append("features", JSON.stringify(filteredFeatures));
            
            // Add tags
            if (form.tags) {
                formData.append("tags", form.tags);
            }
            
            // Add images
            imageFiles.forEach((file, index) => {
                if (file) {
                    formData.append(`images`, file);
                }
            });
            
            // Add videos
            videoFiles.forEach((file, index) => {
                if (file) {
                    formData.append(`videos`, file);
                }
            });

            const response = await axios.post(
                "http://localhost:8000/api/v1/product/create", 
                formData, 
                {
                    withCredentials: true,
                    headers: {
                        // Don't set Content-Type when using FormData
                        // Browser will set it properly with boundary info
                    }
                }
            );

            if (response.data.success) {
                toast.success("Product created successfully!");
                navigate("/admin-products");
            }
        } catch (error) {
            console.error("Error creating product:", error);
            toast.error(`Error creating product: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AdminNavbar />
            
            <div className="mx-10">
                <div className="relative p-10 mx-auto my-10 border rounded-lg shadow-2xl border-orange-500/30 max-w-4xl bg-black/20 backdrop-blur-sm">
                    <div
                        className="absolute inset-0 rounded-lg opacity-30 blur-xl"
                        style={{
                            background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3), transparent 80%)`,
                        }}
                    />

                    <div className="relative z-10 text-white">
                        <h1 className="text-3xl font-bold text-center text-green-500 mb-6">
                            Create New Product
                        </h1>

                        <div className="flex justify-end">
                            <Link to="/admin-products" className="flex items-center px-4 py-2 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition duration-200 ease-in-out">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                <span className="text-white font-semibold text-lg">Back</span>
                            </Link>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6" encType="multipart/form-data">
                            <div>
                                <label className="block mb-1">Product Name*</label>
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
                                <label className="block mb-1">Logo</label>
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
                                <label className="block mb-1">Description *</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Enter description (max 1000 characters)"
                                    maxLength={1000}
                                    className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20 h-28"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1">Type *</label>
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
                                <label className="block mb-1">Price *</label>
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
                                <label className="block mb-1">Location *</label>
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
                                <label className="block mb-1">Company *</label>
                                <select 
                                    name="companyId" 
                                    value={form.companyId} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20" 
                                    required
                                >
                                    <option value="">Select Company</option>
                                    {companies.map((company) => (
                                        <option key={company._id} value={company._id}>{company.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block mb-1">Status</label>
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
                                <label className="block mb-1">Tags</label>
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
                                <p className="text-xs text-gray-400 mt-1">Separate tags with commas</p>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block mb-1">Photos</label>
                                {imagePreviews.map((preview, index) => (
                                    <div key={index} className="flex items-center space-x-2 mb-2">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(index, e)}
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
                                            onClick={() => removeImageField(index)}
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
                                <label className="block mb-1">Videos</label>
                                {videoPreviews.map((preview, index) => (
                                    <div key={index} className="flex items-center space-x-2 mb-2">
                                        <input
                                            type="file"
                                            accept="video/*"
                                            onChange={(e) => handleVideoChange(index, e)}
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
                                            onClick={() => removeVideoField(index)}
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
                                <label className="block mb-1">Features</label>
                                <div className="space-y-2">
                                    {form.features.map((feature, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <input
                                                type="text"
                                                value={feature}
                                                onChange={(e) => handleArrayChange('features', index, e.target.value)}
                                                className="flex-1 px-4 py-2 rounded bg-black/50 text-white border border-white/20"
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
                                            <label className="block mb-2 text-white">{key}</label>
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
                                <label className="block mb-1">Stock *</label>
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
                                disabled={loading}
                                className={`md:col-span-2 ${loading ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-700'} py-2 px-6 rounded text-white font-semibold shadow mt-4 mx-auto w-4/5 flex justify-center items-center`}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    "Create Product"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default ProductsCreation;