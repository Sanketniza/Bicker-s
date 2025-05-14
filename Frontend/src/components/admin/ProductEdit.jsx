
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../shared/AdminNavbar";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import Footer from "../shared/footer";
import { removeProduct } from "../../store/productSlice";

function ProductEdit() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [isDeleting, setIsDeleting] = useState(false);
    const [product, setProduct] = useState(null);
    
    // Get product from Redux or fetch it
    const { allProducts, singleProduct } = useSelector(state => state.product);
    
    // Fetch product data on component mount
    useEffect(() => {
        const fetchProduct = async () => {
            // First check if we already have it in Redux
            const existingProduct = allProducts.find(p => p._id === id) || singleProduct;
            
            if (existingProduct) {
                setProduct(existingProduct);
                return;
            }
            
            // If not in Redux, fetch it
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/product/${id}`, {
                    withCredentials: true
                });
                
                if (response.data.success) {
                    setProduct(response.data.product);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                toast.error("Failed to load product information");
            }
        };
        
        if (id) {
            fetchProduct();
        }
    }, [id, allProducts, singleProduct]);

    const handleDelete = async () => {
        // Confirm deletion with the user
        if (!window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
            return;
        }
        
        if (!product || !product.companyId) {
            toast.error("Product information incomplete. Cannot delete.");
            return;
        }
        
        // Get companyId - either string or object with _id property
        const companyId = typeof product.companyId === 'object' ? 
            product.companyId._id : product.companyId;
        
        setIsDeleting(true);
        
        try {
            console.log(`Deleting product: ${id} from company: ${companyId}`);
            
            // Fixed URL format without extra braces
            const response = await axios.delete(`http://localhost:8000/api/v1/product/${id}/${companyId}`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            // console.log("Delete response:", response.data);
            
            if (response.data?.success) {
                // Show success message
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
                
                // Update Redux store with the correct action
                dispatch(removeProduct(id));
                
                // Navigate back to product list
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
                    {/* Background effect */}
                    <div
                        className="absolute inset-0 rounded-lg opacity-30 blur-xl"
                        style={{
                            background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3), transparent 80%)`,
                        }}
                    />

                    <div className="relative z-10">
                        <h1 className="text-4xl font-bold text-white">
                            <span className="text-emerald-500">Edit</span> Product
                        </h1>

                        {/* Divider */}
                        <div className="my-10 border-t border-gray-700"></div>
                        
                        {product && (
                            <div className="mt-4 mb-8">
                                <h2 className="text-xl text-white"><span className="text-yellow-500"> Name :- </span>{product.title}</h2>
                                {/* <p className="text-gray-400">ID: {id}</p> */}
                            </div>
                        )}

                        <div className="mt-4 flex justify-between items-center">
                            <h3 className="text-2xl font-bold text-white">
                                <span className="text-orange-500">Would you like to Delete</span> this product?
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

                            {/* Divider */}
                        </div>
                        <div className="my-10 border-t border-gray-700"></div>



                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default ProductEdit;