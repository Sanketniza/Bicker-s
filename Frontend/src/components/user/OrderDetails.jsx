import Footer from "../shared/footer"
import Navbar from "../shared/Navbar"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { toast } from "sonner"
import { Loader2, ShoppingBag, Trash2 } from "lucide-react"
import { format } from "date-fns"



function OrderDetails() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5);
    const { user } = useSelector(state => state.auth);
    
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8000/api/v1/order/${user.id}`, {
                    withCredentials: true
                });
                
                if (response.data.success) {
                    setOrders(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
                toast.error("Failed to fetch orders");
            } finally {
                setLoading(false);
            }
        };
        
        if (user && user.id) {
            fetchOrders();
        } else {
            // Guest: no fetch and no loader; ensure empty state
            setOrders([]);
            setLoading(false);
        }
    }, [user]);
    
    // Function to handle order deletion
    const handleDeleteOrder = async (orderId) => {
        if (!window.confirm("Are you sure you want to delete this order?")) {
            return;
        }
        
        try {
            setLoading(true);
            const response = await axios.delete(`http://localhost:8000/api/v1/order/${orderId}`, {
                withCredentials: true
            });
            
            if (response.data.success) {
                // Remove the deleted order from state
                setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
                toast.success("Order deleted successfully!");
            } else {
                toast.error(response.data.message || "Failed to delete order");
            }
        } catch (error) {
            console.error("Error deleting order:", error);
            const errorMessage = error.response?.data?.message || "Failed to delete order";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    
    // Filter orders based on search
    const filteredOrders = orders.filter(order => 
        order.productId?.title?.toLowerCase().includes(search.toLowerCase()) ||
        order.customerName?.toLowerCase().includes(search.toLowerCase()) ||
        order.status?.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
             <Navbar />
            <div className="mx-10">
                <div className="relative p-10 mx-auto my-20 border rounded-lg shadow-2xl border-emerald-500/30 max-w-5xl bg-black/20 backdrop-blur-sm">
                {/* Glow effect */}
                    <div
                        className="absolute inset-0 rounded-lg opacity-30 blur-xl"
                        style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3), transparent 80%)`,
                        }}
                    />

                    <h1 className="text-4xl font-bold text-white">
                        <span className="text-emerald-500">Order</span> Details
                    </h1>
                    
                    <div className="my-6">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                placeholder="Search orders..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full p-2 pl-4 text-white bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-emerald-500"
                            />
                            <svg 
                                className="absolute right-3 w-5 h-5 text-gray-400" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                ></path>
                            </svg>
                        </div>
                    </div>

                    <div className="mt-8 overflow-x-auto "> 
                        {!user ? (
                            <div className="text-center text-orange-500 py-10">
                                <ShoppingBag className="mx-auto text-orange-500 w-16 h-16 mb-4" />
                                <p>No orders found , please login</p>
                            </div>
                        ) : loading ? (
                            <div className="flex items-center justify-center h-40">
                                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                            </div>
                        ) : filteredOrders.length === 0 ? (
                            <div className="text-center text-orange-500 py-10">
                                <ShoppingBag className="mx-auto text-orange-500 w-16 h-16 mb-4" />
                                <p>No orders found</p>
                            </div>
                        ) : (
                            <table className="min-w-full border-collapse bg-transparent ">
                                <thead>
                                    <tr className="border-b border-gray-700">
                                        <th className="p-3 text-left text-orange-500">Customer Name</th>
                                        <th className="p-3 text-left text-orange-500">Application Date</th>
                                        <th className="p-3 text-left text-orange-500">Product</th>
                                        <th className="p-3 text-left text-orange-500">Status</th>
                                        <th className="p-3 text-left text-orange-500">Type</th>
                                        <th className="p-3 text-left text-orange-500">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentOrders.map((order) => (
                                        <tr key={order._id} className="border-b border-gray-700 hover:bg-black/40">

                                            <td className="p-3 text-white">{order.customerName}</td>

                                            <td className="p-3 text-white">
                                                {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                                            </td>

                                            <td className="p-3 text-white">
                                                {order.productId?.title || "N/A"}
                                            </td>

                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' : 
                                                    order.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                                                    order.status === 'rejected' ? 'bg-red-500/20 text-red-500' :
                                                    order.status === 'completed' ? 'bg-blue-500/20 text-blue-500' :
                                                    'bg-gray-500/20 text-gray-500'
                                                }`}>
                                                    {order.status || "N/A"}
                                                </span>
                                            </td>

                                            <td className="p-3 text-white">
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    order.orderType === 'contact' ? 'bg-purple-500/20 text-purple-500' : 
                                                    'bg-blue-500/20 text-blue-500'
                                                }`}>
                                                    {order.orderType || "N/A"}
                                                </span>
                                            </td> 

                                            <td className="p-3">
                                                <button 
                                                    className="flex items-center gap-1 text-sm font-semibold text-rose-500 hover:text-rose-600 transition-colors"
                                                    onClick={() => handleDeleteOrder(order._id)}
                                                    title="Delete this order"
                                                >
                                                    <Trash2 size={16} />
                                                    Delete
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        
                        {/* Pagination */}
                        {filteredOrders.length > 0 && (
                            <div className="flex justify-center mt-6">
                                <nav className="flex items-center">
                                    <button 
                                        onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                                        disabled={currentPage === 1}
                                        className={`px-3 py-1 rounded-l-md border border-gray-700 ${
                                            currentPage === 1 
                                            ? 'text-gray-600 cursor-not-allowed' 
                                            : 'text-emerald-500 hover:bg-emerald-500/10'
                                        }`}
                                    >
                                        &lt;
                                    </button>
                                    
                                    {[...Array(totalPages).keys()].map(number => (
                                        <button
                                            key={number + 1}
                                            onClick={() => paginate(number + 1)}
                                            className={`px-3 py-1 border-t border-b border-gray-700 ${
                                                currentPage === number + 1
                                                ? 'bg-emerald-500/20 text-emerald-500'
                                                : 'text-white hover:bg-emerald-500/10'
                                            }`}
                                        >
                                            {number + 1}
                                        </button>
                                    ))}
                                    
                                    <button 
                                        onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                                        disabled={currentPage === totalPages}
                                        className={`px-3 py-1 rounded-r-md border border-gray-700 ${
                                            currentPage === totalPages 
                                            ? 'text-gray-600 cursor-not-allowed' 
                                            : 'text-emerald-500 hover:bg-emerald-500/10'
                                        }`}
                                    >
                                        &gt;
                                    </button>
                                </nav>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            <Footer />
        </>
    )
}

export default OrderDetails