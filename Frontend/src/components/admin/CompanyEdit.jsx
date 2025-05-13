/* import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../shared/AdminNavbar"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";


function CompanyEdit() {

    const { companies } = useSelector((state) => state.company);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const param = useParams();
    const id = param.id;
    console.log("id is  : " , id);

    const handleDelete = async () => {



        // Logic to delete the company
        // For example, you can make an API call to delete the company
        // After successful deletion, navigate to the desired page
        // alert("Company Deleted");

        try {
             const response = await axios(`http://localhost:8000/api/v1/company/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete company");
            }

            const data = await response.json();
            console.log("data : " , data);

            // Handle success or error based on the response
            if (data?.success) {
                // Optionally, you can dispatch an action to update the Redux store
                dispatch(companies(id)); // Assuming you have a deleteCompany action
                alert("Company deleted successfully");

            } else {
                alert("Failed to delete company");
            }


        }catch (e) {
            console.log(e);
        }

        navigate("/admin");
    }

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

                    <div className="relative z-10">
                        <h1 className="text-4xl font-bold text-white">
                            <span className="text-emerald-500">Edit</span> Company
                        </h1>

                        <div className="mt-4 flex justify-between items-center">
                            <h3 className="text-2xl font-bold text-white">
                                <span className="text-orange-500">Would you want to Delete</span> Company ?
                            </h3>

                            <button 
                                className="bg-emerald-500 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg"
                                
                                onClick={() => {
                                    handleDelete();
                                }}
                            >
                                Delete
                            </button>
                        </div>

                      
                        
                    </div>

                </div>
          </div>
        </>
    )
}

export default CompanyEdit */

import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../shared/AdminNavbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useState } from "react";
import Footer from "../shared/footer";

// First, add a new action in your companySlice.js
// import { setCompanies, removeCompany } from "../store/companySlice"; 

function CompanyEdit() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const param = useParams();
    const id = param.id;
    const [isDeleting, setIsDeleting] = useState(false);
    
    console.log("Company ID for deletion:", id);

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
                
                // Dispatch action to update Redux store (you need to create this action)
                // dispatch(removeCompany(id));
                
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
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default CompanyEdit;