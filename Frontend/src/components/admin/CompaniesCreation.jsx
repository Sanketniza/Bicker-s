import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import AdminNavbar from "../shared/AdminNavbar";
import Footer from "../shared/footer";

const CompaniesCreation = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        phone: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
    });
    
    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogoFile(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const {
            name,
            description,
            phone,
            email,
            street,
            city,
            state,
            zip,
            country,
        } = formData;

        if (!name || !description) {
            toast.error("Company name and description are required.");
            setIsLoading(false);
            return;
        }

        try {
            // Create form data for multipart/form-data submission
            const formDataToSubmit = new FormData();
            formDataToSubmit.append("name", name);
            formDataToSubmit.append("description", description);
            
            // Add contact details
            formDataToSubmit.append("contactDetails[phone]", phone);
            formDataToSubmit.append("contactDetails[email]", email);
            
            // Add address
            formDataToSubmit.append("contactDetails[address][street]", street);
            formDataToSubmit.append("contactDetails[address][city]", city);
            formDataToSubmit.append("contactDetails[address][state]", state);
            formDataToSubmit.append("contactDetails[address][zip]", zip);
            formDataToSubmit.append("contactDetails[address][country]", country);
            
            // Add logo file if exists
            if (logoFile) {
                formDataToSubmit.append("file", logoFile);
            }

            // Send request to create company
            const response = await axios.post(
                "http://localhost:8000/api/v1/company/create",
                formDataToSubmit,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                toast.success(
                    <div className="flex items-center ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span className="font-bold text-green-500 mx-1">Company created successfully</span>
                        
                    </div>

                    , {
                        style: {
                            color: '#10B981',
                            backgroundColor: '#09090B',
                            fontSize: '20px',
                            borderColor: '#10B981',
                            padding: '10px 20px'
                        }
                    }
                );
                navigate("/admin-companies");
            }
        } catch (error) {
            console.error("Error creating company:", error);
            const errorMsg = error.response?.data?.message || "Failed to create company";
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
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
                            Create New Company
                        </h1>

                        <div className="flex justify-end">
                            <Link to="/admin-companies" className="flex items-center px-4 py-2 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition duration-200 ease-in-out">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                <span className="text-white font-semibold text-lg">Back</span>
                            </Link>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-1">Company Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter company name"
                                    className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1">Logo</label>
                                <input
                                    type="file"
                                    name="logo"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                                />
                                {logoPreview && (
                                    <img
                                        src={logoPreview}
                                        alt="Logo preview"
                                        className="mt-2 w-16 h-16 rounded-full object-cover"
                                    />
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block mb-1">Description *</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Enter description (max 1000 characters)"
                                    maxLength={1000}
                                    className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20 h-28"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                                />
                            </div>

                            <div>
                                <label className="block mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                                />
                            </div>

                            <div>
                                <label className="block mb-1">Street</label>
                                <input
                                    type="text"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                                />
                            </div>

                            <div>
                                <label className="block mb-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                                />
                            </div>

                            <div>
                                <label className="block mb-1">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                                />
                            </div>

                            <div>
                                <label className="block mb-1">ZIP</label>
                                <input
                                    type="text"
                                    name="zip"
                                    value={formData.zip}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block mb-1">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`md:col-span-2 ${
                                    isLoading ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
                                } py-2 px-6 rounded text-white font-semibold shadow mt-4 mx-auto w-4/5 flex items-center justify-center`}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    "Create Company"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default CompaniesCreation;