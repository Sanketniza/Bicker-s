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
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useSelector } from "react-redux";
import useGetUserCompanies from "@/hooks/useGetSIngleComapany";
// import useGetUserCompanies from "@/hooks/useGetUserCompanies";


const CompanyTable = () => {
  const { loading } = useGetUserCompanies(); // Use our new hook to fetch user's companies
  const [search, setSearch] = useState("");
  const printRef = useRef();
  const navigate = useNavigate();

  // Get companies from Redux store (now filtered by owner in the API)
  const { companies } = useSelector(store => store.company);

  // Filtering based on search
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  const data = { nodes: filteredCompanies };

  // Sorting logic
  const sort = useSort(
    data,
    {
      state: { sortKey: "NAME", reverse: false },
      onChange: (action, state) => console.log("Sort changed:", state),
    },
    {
      sortFns: {
        NAME: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        CREATED_AT: (array) => array.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        ),
      },
    }
  );

  // Pagination
  const pagination = usePagination(data, {
    state: { page: 0, size: 5 },
  });

  // Apply sorting
  const sortedData = [...filteredCompanies].sort((a, b) => {
    if (!sort.state.sortKey) return 0;

    if (sort.state.sortKey === "NAME") {
      return sort.state.reverse
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name);
    }

    if (sort.state.sortKey === "CREATED_AT") {
      return sort.state.reverse
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    }

    return 0;
  });

  // Paginate sorted data
  const paginatedData = sortedData.slice(
    pagination.state.page * pagination.state.size,
    (pagination.state.page + 1) * pagination.state.size
  );

  const theme = useTheme([
    getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns: 100px 1fr 1fr 80px;
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
    const canvas = await html2canvas(element, { backgroundColor: '#000' });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.setTextColor(0, 0, 0);
    pdf.save("companies.pdf");
  };

  // Function to handle company edit
  const handleEdit = (companyId) => {
    navigate(`/admin/companies-edit/${companyId}`);
  };

  return (
    <div className="mx-10">
      <div className="relative p-10 mx-auto my-10 border rounded-lg shadow-2xl border-orange-500/30 max-w-5xl bg-black/20 backdrop-blur-sm overflow-auto">
        <div
          className="absolute inset-0 rounded-lg opacity-30 blur-xl"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3), transparent 80%)`,
          }}
        />

        <div className="relative z-10 text-white">
          <h1 className="text-3xl font-bold text-center text-green-500">
            My Companies
          </h1>
          <p className="mt-2 text-lg text-start mb-4">Manage your companies here...</p>

          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              placeholder="Search by name..."
              className="px-4 py-2 rounded bg-black/50 text-white border border-white/20 w-1/2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={handleDownloadPdf}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
            >
              Download as PDF
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : companies.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl text-gray-400">No companies found</p>
              <button 
                onClick={() => navigate('/admin/companies-creation')} 
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Create Your First Company
              </button>
            </div>
          ) : (
            <div ref={printRef}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 bg-white/10 border border-white/20 text-emerald-600 text-sm rounded hover:bg-white/20"
                    onClick={() => sort.fns.onSortChange("NAME")}
                  >
                    Sort: Name {sort.state.sortKey === "NAME" && (sort.state.reverse ? "↓" : "↑")}
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
                        <HeaderCell>Logo</HeaderCell>
                        <HeaderCell>Company Name</HeaderCell>
                        <HeaderCell>Created At</HeaderCell>
                        <HeaderCell>Action</HeaderCell>
                      </HeaderRow>
                    </Header>

                    <Body>
                      {tableList.map((company, index) => (
                        <Row key={`${company._id}-${index}`} item={company}>
                          <Cell>
                            {company.logo ? (
                              <img
                                src={company.logo}
                                alt={company.name}
                                className="w-10 h-10 rounded-full object-cover flex items-center justify-center"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-center">
                                <span className="text-white text-xs">
                                  {company.name ? company.name.charAt(0).toUpperCase() : "N/A"}
                                </span>
                              </div>
                            )}
                          </Cell>

                          <Cell>{company.name}</Cell>

                          <Cell>
                            {new Date(company.createdAt).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </Cell>

                          <Cell>
                            <button 
                              className="text-green-400 hover:underline"
                              onClick={() => handleEdit(company._id)}
                            >
                              Edit
                            </button>
                          </Cell>
                        </Row>
                      ))}
                    </Body>
                  </>
                )}
              </Table>
            </div>
          )}

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
      </div>
    </div>
  );
};

export default CompanyTable;