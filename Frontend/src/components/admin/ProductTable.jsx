import { useState, useRef } from "react";
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
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import useGetUserProducts from "@/hooks/useGetUserProducts";
import { useSelector } from "react-redux";

function ProductTable() {
  useGetUserProducts();

    const { companies } = useSelector((store) => store.company);
  const { allProducts, loading } = useSelector((store) => store.product);
  const products = allProducts || [];
  
  const [search, setSearch] = useState("");
  const printRef = useRef();
  const navigate = useNavigate();

  // Filtering based on title instead of name
  const filteredProducts = products.filter((product) => 
    product.title && product.title.toLowerCase().includes(search.toLowerCase())
  );

  const data = { nodes: filteredProducts };

  // Sorting logic - update to use title instead of name
  const sort = useSort(
    data,
    {
      state: { sortKey: "CREATED_AT", reverse: false },
      onChange: (action, state) => console.log("Sort changed:", state),
    },
    {
      sortFns: {
        TITLE: (array) => array.sort((a, b) => a.title.localeCompare(b.title)),
        CREATED_AT: (array) => array.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      },
    }
  );

  // Pagination
  const pagination = usePagination(data, {
    state: { page: 0, size: 5 },
  });

  // Apply sorting
  const sortedData = sort.state.sortKey
    ? [...filteredProducts].sort(
        sort.state.sortKey === "TITLE"
          ? (a, b) =>
              sort.state.reverse
                ? b.title.localeCompare(a.title)
                : a.title.localeCompare(b.title)
          : (a, b) =>
              sort.state.reverse
                ? new Date(a.createdAt) - new Date(b.createdAt)
                : new Date(b.createdAt) - new Date(a.createdAt)
      )
    : filteredProducts;

  // Paginate sorted data
  const paginatedData = sortedData.slice(
    pagination.state.page * pagination.state.size,
    (pagination.state.page + 1) * pagination.state.size
  );

  const theme = useTheme([
    getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns: 100px 1fr 1fr 80px 80px;
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

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("products.pdf");
  };

  const handleOrderClick = (item) => {
    navigate("/admin-order", {
      state: { productName: item.title },
    });
  };

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

  //* getting company name (another way to do it)
//     const [companies, setCompanies] = useState({});
  
//   // Fetch companies data
//   useEffect(() => {
//     async function fetchCompanies() {
//       try {
//         const response = await axios.get('http://localhost:8000/api/v1/company', {
//           withCredentials: true
//         });
        
//         if (response.data.success) {
//           // Create a mapping of company ID to company name
//           const companyMap = {};
//           response.data.companies.forEach(company => {
//             companyMap[company._id] = company.name || company.title;
//           });
//           setCompanies(companyMap);
//         }
//       } catch (error) {
//         console.error("Error fetching companies:", error);
//       }
//     }
    
//     fetchCompanies();
//   }, []);

// Function to handle company edit
  const handleEdit = (companyId) => {
    navigate(`/admin/product-edit/${companyId}`);
  };

  return (
        <div className="mx-10">
            <div className="relative p-10 mx-auto my-10 border rounded-lg shadow-2xl border-orange-500/30 max-w-7xl bg-black/20 backdrop-blur-sm overflow-auto">
                <div
                    className="absolute inset-0 rounded-lg opacity-30 blur-xl"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3), transparent 80%)`,
                    }}
                />
                
                <div className="relative z-10 text-white">
                <h1 className="text-3xl font-bold text-center text-green-500">
                    My Products
                </h1>
                <p className="mt-2 text-lg text-start mb-4">Manage your Products here.</p>

                <div className="flex items-center justify-between mb-4">
                    <input
                    type="text"
                    placeholder="Search by product name..."
                    className="px-4 py-2 rounded bg-black/50 text-white border border-white/20 w-1/2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                    onClick={handleDownloadPdf}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
                    >
                    Download as PDF
                    </button>                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-10">
                    <p className="text-xl text-gray-400">No products found</p>
                    <button 
                        onClick={() => navigate('/admin-products/products-creation')} 
                        className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                        Create Your First Product
                    </button>
                    </div>
                ) : (
                    <div ref={printRef}>
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex gap-2">
                        <button
                            className="px-3 py-1 bg-white/10 border border-white/20 text-emerald-600 text-sm rounded hover:bg-white/20"
                            onClick={() => sort.fns.onSortChange("TITLE")}
                        >
                            Sort: Name {sort.state.sortKey === "TITLE" && (sort.state.reverse ? "↓" : "↑")}
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
                            {[2, 5, 10, 20].map((size) => (
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
                                <HeaderCell>Product Image</HeaderCell>
                                <HeaderCell>Company Name</HeaderCell>
                                <HeaderCell>Product Name</HeaderCell>
                                <HeaderCell>Created At</HeaderCell>
                                <HeaderCell>Action</HeaderCell>
                                <HeaderCell>Order</HeaderCell>
                            </HeaderRow>
                            </Header>

                            <Body>
                            {tableList.map((product, index) => (
                                <Row key={`${product._id}-${index}`} item={product}>
                                <Cell>
                                    {product.images && product.images.length > 0 ? (
                                    <img
                                        src={product.images[0]}
                                        alt={product.title}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    ) : (
                                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs">
                                        {product.title ? product.title.charAt(0).toUpperCase() : "N/A"}
                                        </span>
                                    </div>
                                    )}
                                </Cell>
                                
                                {/* <Cell>
                                    {companies[product?.companyId] || "Unknown Company"}
                                </Cell> */}

                                <Cell>
                                    {companies.find(c => c._id === product.companyId)?.name || "Untitled"}
                                </Cell>

                                <Cell>{product.title || "Untitled"}</Cell>

                                <Cell>
                                    {formatDate(product.createdAt)}
                                </Cell>

                                <Cell>
                                    <button 
                                        className="text-green-400 hover:underline"
                                        onClick={() => handleEdit(product._id)}
                                    >
                                    Edit
                                    </button>
                                </Cell>

                                <Cell>
                                    <button 
                                        className="text-green-400 hover:underline"
                                        onClick={() => handleOrderClick(product)}
                                    >
                                    View
                                    </button>
                                </Cell>
                                </Row>
                            ))}
                            </Body>
                        </>
                        )}
                    </Table>
                    </div>                )}

                {!loading && products.length > 0 && (
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
                )}
                </div>
            </div>
        </div>
    );
}

export default ProductTable;