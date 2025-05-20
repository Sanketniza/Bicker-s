import { useState, useRef, useEffect } from "react";
import AdminNavbar from "../shared/AdminNavbar";
import Footer from "../shared/footer";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
} from "@table-library/react-table-library/table";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useSort } from "@table-library/react-table-library/sort";
import { toast } from "sonner";

function AdminOrder() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusUpdating, setStatusUpdating] = useState({});

    const { companies } = useSelector((store) => store.company);
    const { allProducts } = useSelector((store) => store.product);

    const { user } = useSelector(state => state.auth); // Add this to get the current user

// Add this to your useEffect
// useEffect(() => {
//     console.log("Current user ID:", user?._id);
//     console.log("Expected shop owner ID for orders:", "67c1639fbe847adea03c78f6");
//     fetchOrders();
// }, []);



    // Fetch orders on component mount
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
    setIsLoading(true);
    try {
        console.log("Fetching orders...");
        const response = await axios.get("http://localhost:8000/api/v1/order/shop-owner", {
            withCredentials: true
        });
        
        // console.log("Orders response:", response.data);

        if (response.data.success) {
            setOrders(response.data.data);
            // console.log("Orders count:", response.data.data.length);
            toast.success("Orders fetched successfully!", {
                style: {
                    color: '#10B981',
                    backgroundColor: '#09090B',
                    fontSize: '20px',
                    borderColor: '#10B981',
                    padding: '10px 20px'
                }
            });
        } else {
            toast.error("Failed to fetch orders. Please try again later.", {
                style: {
                    color: '#f44336',
                    backgroundColor: '#fff',
                    fontSize: '18px',
                    borderColor: '#f44336',
                    padding: '10px 20px'
                }
            });
        }
    } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);
        toast.error("Error loading orders. Please try again.");
    } finally {
        setIsLoading(false);
    }
};

    const handleStatusChange = async (orderId, newStatus) => {
        setStatusUpdating(prev => ({ ...prev, [orderId]: true }));
        
        try {
            const response = await axios.patch(
                `http://localhost:8000/api/v1/order/${orderId}/status`,
                { status: newStatus },
                { withCredentials: true }
            );
            
            if (response.data.success) {
                toast.success("Order status updated successfully", {
                    style: {
                        color: '#10B981',
                        backgroundColor: '#09090B',
                        fontSize: '20px',
                        borderColor: '#10B981',
                        padding: '10px 20px'
                    }
                });
                
                // Update local state to reflect the change
                setOrders(prevOrders => 
                    prevOrders.map(order => 
                        order._id === orderId 
                            ? { ...order, status: newStatus } 
                            : order
                    )
                );
            } else {
                toast.error(
                    <span style={{ color: '#f44336' }}>
                        {response.data.message || "Failed to update status"}
                    </span>,
                    {
                        style: {
                            backgroundColor: '#fff',
                            fontSize: '16px',
                            borderColor: '#f44336',
                            padding: '10px 20px'
                        }
                    }
                );
            }
        } catch (error) {
            console.error("Error updating order status:", error);
            toast.error("Error updating status. Please try again.");
        } finally {
            setStatusUpdating(prev => ({ ...prev, [orderId]: false }));
        }
    };

    // Format date function
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Invalid Date";
        return date.toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    // Filter orders based on search term
    const filteredOrders = orders.filter((order) =>
        order.customerName?.toLowerCase().includes(search.toLowerCase()) ||
        order.productId?.title?.toLowerCase().includes(search.toLowerCase())
    );

    // Sort and pagination setup
    const data = { nodes: filteredOrders };

    const sort = useSort(
        data,
        {
            state: { sortKey: "CREATED_AT", reverse: false },
            onChange: (action, state) => console.log("Sort changed:", state),
        },
        {
            sortFns: {
                CUSTOMER: (array) => array.sort((a, b) => a.customerName.localeCompare(b.customerName)),
                PRODUCT: (array) => array.sort((a, b) => a.productId?.title?.localeCompare(b.productId?.title)),
                CREATED_AT: (array) => array.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
            },
        }
    );

    const pagination = usePagination(data, {
        state: { page: 0, size: 5 },
    });

    // Apply sorting
    const sortedData = sort.state.sortKey
        ? [...filteredOrders].sort(
            sort.state.sortKey === "CUSTOMER"
                ? (a, b) =>
                    sort.state.reverse
                        ? b.customerName.localeCompare(a.customerName)
                        : a.customerName.localeCompare(b.customerName)
                : sort.state.sortKey === "PRODUCT"
                    ? (a, b) =>
                        sort.state.reverse
                            ? (b.productId?.title || "").localeCompare(a.productId?.title || "")
                            : (a.productId?.title || "").localeCompare(b.productId?.title || "")
                    : (a, b) =>
                        sort.state.reverse
                            ? new Date(a.createdAt) - new Date(b.createdAt)
                            : new Date(b.createdAt) - new Date(a.createdAt)
            )
        : filteredOrders;

    // Paginate sorted data
    const paginatedData = sortedData.slice(
        pagination.state.page * pagination.state.size,
        (pagination.state.page + 1) * pagination.state.size
    );

    // Table theme
    const theme = useTheme([
        getTheme(),
        {
            Table: `
                --data-table-library_grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
                border-collapse: collapse;
                background-color: transparent;
            `,
            BaseCell: `
                border: 1px solid rgba(255, 255, 255, 0.2);
                padding: 8px;
                color: white;
                background-color: rgba(0, 0, 0, 0.2);
            `,
            HeaderCell: `
                border: 1px solid rgba(255, 255, 255, 0.2);
                padding: 8px;
                color: orange;
                background-color: rgba(0, 0, 0, 0.2);
                text-align: center;
            `,
        },
    ]);

   
   
// Get product name helper
const getProductName = (productIdField) => {
    // If productId is a string (ID only)
    if (typeof productIdField === 'string') {
        const product = allProducts.find(p => p._id === productIdField);
        return product ? product.title : "Product Info Loading...";
    }
    
    // If productId is an object (populated from backend)
    if (productIdField && typeof productIdField === 'object') {
        return productIdField.title || "Unnamed Product";
    }
    
    return "Unknown Product";
};

// Get company name helper
const getCompanyName = (productIdField) => {
    // If productId is a string (ID only)
    if (typeof productIdField === 'string') {
        const product = allProducts.find(p => p._id === productIdField);
        if (!product) return "Unknown";
        
        const company = companies.find(c => c._id === product.companyId);
        return company?.name || "Unknown Company";
    }
    
    // If productId is an object (populated from backend)
    if (productIdField && typeof productIdField === 'object') {
        // If companyId is a string
        if (typeof productIdField.companyId === 'string') {
            const company = companies.find(c => c._id === productIdField.companyId);
            return company?.name || "Unknown Company";
        }
        
        // If companyId is an object (populated)
        if (productIdField.companyId && typeof productIdField.companyId === 'object') {
            return productIdField.companyId.name || "Unknown Company";
        }
    }
    
    return "Unknown";
};
    
    // Status label colors
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'text-yellow-400';
            case 'approved': return 'text-green-400';
            case 'rejected': return 'text-red-400';
            case 'completed': return 'text-blue-400';
            default: return 'text-gray-400';
        }
    };

    return (
        <>
            <AdminNavbar />

            <div className="mx-10">
                <div className="relative p-10 mx-auto my-10 border rounded-lg shadow-2xl border-orange-500/30 max-w-7xl bg-black/20 backdrop-blur-sm overflow-auto">
                    <div
                        className="absolute inset-0 rounded-lg opacity-30 blur-xl"
                        style={{
                            background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3), transparent 80%)`,
                        }}
                    />

                    <div className="relative z-10">
                        <h1 className="text-4xl font-bold text-white">
                            <span className="text-emerald-500">My</span> Orders
                        </h1>

                        <div className="mt-4 flex justify-between items-center">
                            <h3 className="text-2xl font-bold text-white">
                                <span className="text-orange-500">Orders</span> List
                            </h3>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Search by customer or product..."
                                    className="px-4 py-2 rounded bg-black/50 text-white border border-white/20 w-64"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                            </div>
                        ) : filteredOrders.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-xl text-gray-400">No orders found</p>
                            </div>
                        ) : (
                            <div className="mt-6">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex gap-2">
                                        <button
                                            className="px-3 py-1 bg-white/10 border border-white/20 text-emerald-600 text-sm rounded hover:bg-white/20"
                                            onClick={() => sort.fns.onSortChange("CUSTOMER")}
                                        >
                                            Sort: Customer {sort.state.sortKey === "CUSTOMER" && (sort.state.reverse ? "↓" : "↑")}
                                        </button>
                                        <button
                                            className="px-3 py-1 bg-white/10 border border-white/20 text-emerald-600 text-sm rounded hover:bg-white/20"
                                            onClick={() => sort.fns.onSortChange("PRODUCT")}
                                        >
                                            Sort: Product {sort.state.sortKey === "PRODUCT" && (sort.state.reverse ? "↓" : "↑")}
                                        </button>
                                        <button
                                            className="px-3 py-1 bg-white/10 border border-white/20 text-emerald-600 text-sm rounded hover:bg-white/20"
                                            onClick={() => sort.fns.onSortChange("CREATED_AT")}
                                        >
                                            Sort: Date {sort.state.sortKey === "CREATED_AT" && (sort.state.reverse ? "↓" : "↑")}
                                        </button>
                                    </div>

                                    <div>
                                        <label className="text-white text-sm mr-2">Rows per page:</label>
                                        <select
                                            className="bg-black/50 border border-white/20 text-white text-sm rounded px-2 py-1"
                                            value={pagination.state.size}
                                            onChange={(e) => pagination.fns.onSetSize(Number(e.target.value))}
                                        >
                                            {[2, 5, 10, 20, 50].map((size) => (
                                                <option key={size} value={size}>
                                                    {size}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <Table data={{ nodes: paginatedData }} theme={theme}>
                                    {(tableList) => (
                                        <>
                                            <Header>
                                                <HeaderRow theme={theme}>
                                                    <HeaderCell>Customer Name</HeaderCell>
                                                    <HeaderCell>Request Date</HeaderCell>
                                                    <HeaderCell>Product Name</HeaderCell>
                                                    <HeaderCell>Company Name</HeaderCell>
                                                    <HeaderCell>Status</HeaderCell>
                                                </HeaderRow>
                                            </Header>

                                            <Body>
                                                {tableList.map((order) => (
                                                    <Row key={order._id} item={order}>
                                                        <Cell>
                                                            <div>
                                                                <p className="font-medium">{order.customerName || "Unknown"}</p>
                                                                <p className="text-xs text-sky-400 mb-2">{order.customerEmail}</p>
                                                                <p className="text-xs text-red-400">{order.customerPhone}</p>
                                                            </div>
                                                        </Cell>
                                                        
                                                        <Cell>
                                                            {formatDate(order.createdAt)}
                                                        </Cell>
                                                        
                                                        <Cell>
                                                            {order.productId ? getProductName(order.productId) : "Unknown Product"}
                                                        </Cell>
                                                        
                                                        <Cell>
                                                            {order.productId ? getCompanyName(order.productId) : "Unknown Company"}
                                                        </Cell>
                                                        
                                                        <Cell>
                                                            <div className="flex flex-col gap-2">
                                                                <span className={`font-medium ${getStatusColor(order.status)}`}>
                                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                                </span>
                                                                
                                                                <select
                                                                    value={order.status}
                                                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                                    disabled={statusUpdating[order._id]}
                                                                    className="bg-black/50 border border-white/20 text-white text-sm rounded px-2 py-1"
                                                                >
                                                                    <option value="pending">Pending</option>
                                                                    <option value="approved">Approve</option>
                                                                    <option value="rejected">Reject</option>
                                                                    <option value="completed">Complete</option>
                                                                </select>
                                                                
                                                                {order.message && (
                                                                    <button 
                                                                        onClick={() => toast.info(order.message, {
                                                                            description: "Customer message"
                                                                        })}
                                                                        className="text-xs text-blue-400 hover:underline text-left"
                                                                    >
                                                                        View Message
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </Cell>
                                                    </Row>
                                                ))}
                                            </Body>
                                        </>
                                    )}
                                </Table>

                                <div className="flex justify-between items-center mt-4 text-sm text-white/80">
                                    <div>
                                        Page {pagination.state.page + 1} of{" "}
                                        {Math.ceil(sortedData.length / pagination.state.size)}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => pagination.fns.onSetPage(pagination.state.page - 1)}
                                            disabled={pagination.state.page === 0}
                                            className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white hover:bg-white/10 active:bg-white/30 disabled:opacity-30"
                                        >
                                            ← Prev
                                        </button>
                                        <button
                                            onClick={() => pagination.fns.onSetPage(pagination.state.page + 1)}
                                            disabled={
                                                pagination.state.page + 1 >=
                                                Math.ceil(sortedData.length / pagination.state.size)
                                            }
                                            className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white hover:bg-white/10 active:bg-white/30 disabled:opacity-30"
                                        >
                                            Next →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default AdminOrder;