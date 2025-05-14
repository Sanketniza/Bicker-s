import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../shared/AdminNavbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import Footer from "../shared/footer";
import { setSingleCompany, removeCompany } from "../../store/companySlice";

function CompanyEdit() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [company, setCompany] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        contactDetails: {
            phone: "",
            email: "",
            address: ""
        }
    });
    
    // Get company from Redux or fetch it
    const { companies, singleCompany } = useSelector(state => state.company);
    
    useEffect(() => {
        const fetchCompany = async () => {
            // First check if we already have it in Redux
            const existingCompany = companies.find(c => c._id === id) || 
                                   (singleCompany?._id === id ? singleCompany : null);
            
            if (existingCompany) {
                setCompany(existingCompany);
                populateFormData(existingCompany);
                if (existingCompany.logo) {
                    setPreviewUrl(existingCompany.logo);
                }
                return;
            }
            
            // If not in Redux, fetch it
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/company/${id}`, {
                    withCredentials: true
                });
                
                if (response.data.success) {
                    const fetchedCompany = response.data.company;
                    setCompany(fetchedCompany);
                    dispatch(setSingleCompany(fetchedCompany));
                    populateFormData(fetchedCompany);
                    if (fetchedCompany.logo) {
                        setPreviewUrl(fetchedCompany.logo);
                    }
                }
            } catch (error) {
                console.error("Error fetching company:", error);
                toast.error("Failed to load company information");
            }
        };
        
        if (id) {
            fetchCompany();
        }
    }, [id, companies, singleCompany, dispatch]);
    
    const populateFormData = (company) => {
        setFormData({
            name: company.name || "",
            description: company.description || "",
            contactDetails: {
                phone: company.contactDetails?.phone || "",
                email: company.contactDetails?.email || "",
                address: company.contactDetails?.address || ""
            }
        });
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Handle nested contactDetails fields
        if (name.startsWith("contactDetails.")) {
            const field = name.split(".")[1];
            setFormData({
                ...formData,
                contactDetails: {
                    ...formData.contactDetails,
                    [field]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            
            // Create a preview URL for the selected image
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setPreviewUrl(fileReader.result);
            };
            fileReader.readAsDataURL(file);
        }
    };
    
   const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description) {
        toast.error("Company name and description are required");
        return;
    }
    
    setIsSubmitting(true);
    
    try {
        // Create FormData object for multipart/form-data (for file upload)
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("description", formData.description);
        
        // Create contact details as a JSON string
        const contactDetailsJSON = JSON.stringify({
            phone: formData.contactDetails.phone || "",
            email: formData.contactDetails.email || "",
            address: formData.contactDetails.address || ""
        });
        
        // Send as a single JSON field
        formDataToSend.append("contactDetails", contactDetailsJSON);
        
        // Add file if selected
        if (selectedFile) {
            formDataToSend.append("logo", selectedFile);
        }
        
        // Rest of your code remains the same
        const response = await axios.put(
            `http://localhost:8000/api/v1/company/${id}`,
            formDataToSend,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        
        // Success handling...
        if (response.data.success) {
            toast.success("Company updated successfully");
            
            // Update the company in Redux store
            const updatedCompany = response.data.company;
            dispatch(setSingleCompany(updatedCompany));
            
            // Navigate back to admin page
            navigate("/admin");
        }

    } catch (error) {
        console.error("Error updating company:", error);
        
        // Handle error message from response if available
        const errorMessage = error.response?.data?.message || 
                            "Failed to update company. Please try again.";
        
        toast.error(errorMessage);
    } finally {
        setIsSubmitting(false);
    }
};

    const handleDelete = async () => {
        // Confirm deletion with the user
        if (!window.confirm("Are you sure you want to delete this company? This action cannot be undone.")) {
            return;
        }
        
        setIsDeleting(true);
        
        try {
            // Use axios correctly with withCredentials for cookie auth
            const response = await axios.delete(`http://localhost:8000/api/v1/company/${id}`, {
                withCredentials: true, // Use cookie authentication
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            console.log("Delete response:", response.data);
            
            // Check the response data
            if (response.data?.success) {
                // Show success message
                toast.success("Company deleted successfully");
                
                // Dispatch action to update Redux store
                dispatch(removeCompany(id));
                
                // Navigate back to admin page
                navigate("/admin");
            } else {
                toast.error(response.data?.message || "Failed to delete company");
            }
        } catch (error) {
            console.error("Error deleting company:", error);
            
            // Handle error message from response if available
            const errorMessage = error.response?.data?.message || 
                                "Failed to delete company. Please try again.";
            
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
                    {/* Background effect */}
                    <div
                        className="absolute inset-0 rounded-lg opacity-30 blur-xl"
                        style={{
                            background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3), transparent 80%)`,
                        }}
                    />

                    <div className="relative z-10">
                        <h1 className="text-4xl font-bold text-white">
                            <span className="text-emerald-500">Edit</span> Company
                        </h1>

                        {/* Divider */}
                        <div className="my-10 border-t border-gray-700"></div>

                        {/* Delete Section */}
                        <div className="mt-4 flex justify-between items-center">
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
                                ) : "Delete Company"}
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="my-10 border-t border-gray-700"></div>

                        {company ? (
                            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                                {/* Company Logo */}
                                <div className="flex flex-col items-center mb-6">
                                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-700 flex items-center justify-center">
                                        {previewUrl ? (
                                            <img 
                                                src={previewUrl} 
                                                alt="Company Logo" 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-4xl text-gray-400">
                                                {formData.name ? formData.name.charAt(0).toUpperCase() : "C"}
                                            </span>
                                        )}
                                    </div>
                                    <label className="cursor-pointer px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition">
                                        Choose Logo
                                        <input 
                                            type="file" 
                                            className="hidden" 
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>

                                {/* Company Name */}
                                <div>
                                    <label className="block text-white text-sm font-semibold mb-2">
                                        Company Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-emerald-500/40 text-white focus:outline-none focus:border-emerald-500"
                                        placeholder="Enter company name"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-white text-sm font-semibold mb-2">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-emerald-500/40 text-white focus:outline-none focus:border-emerald-500"
                                        placeholder="Describe your company"
                                    ></textarea>
                                </div>

                                {/* Contact Details */}
                                <div className="space-y-4">
                                    <h3 className="text-white text-lg font-semibold">Contact Details</h3>
                                    
                                    {/* Phone */}
                                    <div>
                                        <label className="block text-white text-sm font-semibold mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="contactDetails.phone"
                                            value={formData.contactDetails.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-emerald-500/40 text-white focus:outline-none focus:border-emerald-500"
                                            placeholder="Enter phone number"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-white text-sm font-semibold mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="contactDetails.email"
                                            value={formData.contactDetails.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-emerald-500/40 text-white focus:outline-none focus:border-emerald-500"
                                            placeholder="Enter email address"
                                        />
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <label className="block text-white text-sm font-semibold mb-2">
                                            Address
                                        </label>
                                        <textarea
                                            name="contactDetails.address"
                                            value={formData.contactDetails.address}
                                            onChange={handleChange}
                                            rows="3"
                                            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-emerald-500/40 text-white focus:outline-none focus:border-emerald-500"
                                            placeholder="Enter company address"
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-center w-full">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full px-6 py-3 rounded-lg text-white font-medium ${
                                            isSubmitting
                                                ? "bg-gray-500 cursor-not-allowed"
                                                : "bg-emerald-600 hover:bg-emerald-700"
                                        }`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Updating...
                                            </>
                                        ) : (
                                            "Update Company"
                                        )}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                            </div>
                        )}

                        
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default CompanyEdit;