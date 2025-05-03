import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../shared/AdminNavbar";
import Footer from "../shared/footer";
import axios from "axios";
import { Link } from "wouter";


function ProductsCreation() {

  const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        images: [""],
        videos: [""],
        features: [""],

        specifications: {
            EngineType: "",
            Displacement: "",
            Power: "",
            Condition: "",
        },
        status: "active",
        logo: "",
        companyId: "",
        category: "bike",
        tags: [""],
        stock: 0,
    });

    // const [loading, setLoading] = useState(false);
    // const [companies, setCompanies] = useState([]);

    const handlChange = (e) => {
        const { name, value } = e.target;
        if (name.includes("specifications.")) {
            const specKey = name.split(".")[1];
            setForm({ ...form, specifications: { ...form.specifications, [specKey]: value } });
        } else {
            setForm({ ...form, [name]: value });
        }

        setForm((prev) => (
            { 
                ...prev, [e.target.name]: e.target.value 
            }
        ));
    }

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/company/get");
        setCompanies(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("specifications.")) {
      const specKey = name.split(".")[1];
      setForm({ ...form, specifications: { ...form.specifications, [specKey]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  };

  const handleSubmit = async (e) => {
    
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
                        Create New Product....
                    </h1>

                    <div className="flex justify-end">
                        <Link to="/admin-companies" className="flex items-center px-4 py-2 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition duration-200 ease-in-out">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="text-white font-semibold  text-lg">Back</span>
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                        <label className="block mb-1">Bike Name*</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter bike name ex: Royal Enfield Classic 350"
                            className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                            required
                        />
                        </div>

                        <div>
                        <label className="block mb-1">Logo </label>
                        <input
                            type="file"
                            name="logo"
                            accept=".png, .jpg, .jpeg"
                            onChange={(e) =>  ((prev) => ({ ...prev, logo: URL.createObjectURL(e.target.files[0]) }))}
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
                        <select name="category" value={form.category} onChange={handleChange} className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20" required>
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
                            className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                            className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                                {/* {companies.map((company) => (
                                <option key={company._id} value={company._id}>{company.name}</option>
                                ))} */}
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1">Status</label>
                            <select name="status" value={form.status} onChange={handleChange} className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20">
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
                                    onChange={(e) => handleArrayChange('tags', 0, e.target.value)}
                                    placeholder="Enter tags (comma separated) ex: test, new "
                                    className="flex-1 px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                                />
                                <p className="text-red-500 text-sm">Separate tags with commas</p>
                            </div>

                        </div>

                        <div className="md:col-span-2">
                            <label className="block mb-1">Photos</label>
                            {   
                                form.images.map((image, index) => (
                                    <div key={index} className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="file"
                                        accept=".png, .jpg, .jpeg"
                                        onChange={(e) => handleArrayChange('images', index, URL.createObjectURL(e.target.files[0]))}
                                        className="flex-1 px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                                    />
                                    {image && (
                                        <img src={image} alt={`preview-${index}`} className="w-16 h-16 rounded-full object-cover" />
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => {
                                        const updatedImages = form.images.filter((_, i) => i !== index);
                                        setForm({ ...form, images: updatedImages });
                                        }}
                                        className="p-1 bg-red-500 text-white rounded transition duration-200 hover:bg-red-600 active:bg-red-800"
                                    >
                                        Remove
                                    </button>
                                    </div>
                                ))
                            }
                            <button
                                type="button"
                                onClick={() => setForm({ ...form, images: [...form.images, ""] })}
                                className="mt-2 px-4 py-2 bg-green-500 text-white rounded transition duration-200 hover:bg-green-600 active:bg-green-700"
                                disabled={form.images.length >= 15}
                            >
                                Add Photo
                            </button>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block mb-1">Videos</label>
                            {
                                form.videos.map((video, index) => (
                                    <div key={index} className="flex items-center space-x-2 mb-2">
                                        <input
                                            type="file"
                                            accept=".mp4, .avi, .mov"
                                            onChange={(e) => handleArrayChange('videos', index, URL.createObjectURL(e.target.files[0]))}
                                            className="flex-1 px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                                        />

                                        {
                                            video && (
                                                <video src={video} alt={`preview-${index}`} className="w-16 h-16 rounded-full object-cover" controls />
                                            )
                                        }

                                        <button
                                            type="button"
                                            onClick={() => {
                                                const updatedVideos = form.videos.filter((_, i) => i !== index);
                                                setForm({ ...form, videos: updatedVideos });
                                            }}
                                            className="p-1 bg-red-500 text-white rounded transition duration-200 hover:bg-red-600 active:bg-red-800"

                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))
                            }
                            <button
                                type="button"
                                onClick={() => setForm({ ...form, videos: [...form.videos, ""] })}
                                className="mt-2 px-4 py-2 bg-green-500 text-white rounded transition duration-200 hover:bg-green-600 active:bg-green-700"
                                disabled={form.videos.length >= 10}
                            >
                                Add Video
                            </button>

                        </div>

                        <div className="md:col-span-2">
                            <label className="block mb-1">Features</label>
                            <div className="space-y-2">
                                {
                                    form.features.map((feature, index) => (
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
                                                    setForm({ ...form, features: updatedFeatures });
                                                }}
                                                className="p-1 bg-red-500 text-white rounded transition duration-200 hover:bg-red-600 active:bg-red-800"

                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))
                                }
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





                        {/* <div className="md:col-span-2">
                            <label className="block mb-4 text-center  font-semibold text-2xl text-green-500">Company Information</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block mb-1 text-orange-500">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-orange-500">Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-orange-500">Street</label>
                                    <input
                                        type="text"
                                        name="street"
                                        value={form.street}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-orange-500">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={form.city}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-orange-500">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={form.state}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-orange-500">ZIP</label>
                                    <input
                                        type="text"
                                        name="zip"
                                        value={form.zip}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                    />
                                </div>

                                <div className="md:col-span-2 ">
                                    <label className="block mb-1 text-orange-500">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={form.country}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"

                                    />
                                </div>
                            </div>
                        </div> */}

                        <div className="flex flex-col items-center justify-center md:col-span-2 *:mb-4">
                            <label className="block  mb-2 text-center w-full text-2xl text-green-500" htmlFor="specifications">specifications *</label>
                            <div className="grid grid-cols-2 gap-4 w-full ">
                                {
                                    Object.keys(form.specifications).map((key) => (
                                        <div key={key} className="relative *:mb-4">
                                            <label className="block mb-2 text-white">{key}</label>
                                            <input
                                                type="text"
                                                name={`specifications.${key}`}
                                                value={form.specifications[key]}
                                                onChange={handleChange}
                                                // placeholder={key}
                                                placeholder={`ex, ${key === 'EngineType' ? '4-stroke' : key === 'Displacement' ? '159.7cc' : key === 'Power' ? '15.1hp @ 8000rpm' : key === 'Condition' ? 'New' : ''}`}
                                                className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                                required
                                            />
                                        </div>
                                    ))
                                }

                            <div className="grid grid-cols-1 gap-4 w-full ">
                                <label htmlFor="stock">stock *  </label>
                                <div className="relative">
                                    <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" required />
                                </div>
                            </div>

                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            {/* <label className="block mb-2 text-center w-full" htmlFor="stock">stock *</label> */}
                            
                        </div>

                        <button
                            type="submit"
                            className="md:col-span-2 bg-green-600 hover:bg-green-700 py-2 px-6 rounded text-white font-semibold shadow mt-4 mx-auto w-4/5"
                        >
                        Create Company
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