



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

// Sample static company data
const companies = [
    {
      id: 1,
      name: "GreenTech Ltd.",
      logo: "https://www.pexels.com/photo/portrait-photo-of-smiling-man-with-his-arms-crossed-standing-in-front-of-a-wall-2379004/",
      createdAt: new Date("2024-02-01"),
    },
    {
      id: 2,
      name: "BlueOcean Corp.",
      logo: "https://via.placeholder.com/50",
      createdAt: new Date("2024-03-15"),
    },
    {
      id: 3,
      name: "SolarSmart Inc.",
      logo: "https://via.placeholder.com/50",
      createdAt: new Date("2023-12-22"),
    },
    {
      id: 4,
      name: "EcoWave Solutions",
      logo: "https://via.placeholder.com/50",
      createdAt: new Date("2024-01-10"),
    },
    {
      id: 5,
      name: "Renewable Innovations",
      logo: "https://via.placeholder.com/50",
      createdAt: new Date("2023-11-30"),
    },
    {
      id: 6,
      name: "WindPower Technologies",
      logo: "https://via.placeholder.com/50",
      createdAt: new Date("2024-05-18"),
    },
    {
      id: 7,
      name: "HydroGen Enterprises",
      logo: "https://via.placeholder.com/50",
      createdAt: new Date("2023-09-12"),
    },
    {
      id: 8,
      name: "BioFuel Innovations",
      logo: "https://via.placeholder.com/50",
      createdAt: new Date("2024-07-22"),
    },
    {
      id: 9,
      name: "CleanTech Ventures",
      logo: "https://via.placeholder.com/50",
      createdAt: new Date("2023-08-15"),
    },
    {
      id: 10,
      name: "SunEnergy Corp.",
      logo: "https://via.placeholder.com/50",
      createdAt: new Date("2024-06-01"),
    },
  ];

  function ProductTable() {
  const [search, setSearch] = useState("");
  const printRef = useRef();

  // Filtering first
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  const data = { nodes: filteredCompanies };

  // Sorting logic
  const sort = useSort(
    data,
    {
      state: { sortKey: "CREATED_AT", reverse: false },
      onChange: (action, state) => console.log("Sort changed:", state),
    },
    {
      sortFns: {
        NAME: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        CREATED_AT: (array) => array.sort((a, b) => b.createdAt - a.createdAt),
      },
    }
  );

  // Pagination
  const pagination = usePagination(data, {
    state: { page: 0, size: 5 },
  });

  // Apply sorting
  const sortedData = sort.state.sortKey
    ? [...filteredCompanies].sort(
        sort.state.sortKey === "NAME"
          ? (a, b) =>
              sort.state.reverse
                ? b.name.localeCompare(a.name)
                : a.name.localeCompare(b.name)
          : (a, b) =>
              sort.state.reverse
                ? a.createdAt - b.createdAt
                : b.createdAt - a.createdAt
      )
    : filteredCompanies;

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
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("companies.pdf");
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
            My Product&apos;s
          </h1>
          <p className="mt-2 text-lg text-start mb-4">Manage your Products here.</p>

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

          <div ref={printRef}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 bg-white/10 border border-white/20 text-emerald-600 text-sm rounded hover:bg-white/20"
                  onClick={() => sort.fns.onSortChange("NAME")}
                >
                  Sort: Name (A-Z)
                </button>
                <button
                  className="px-3 py-1 bg-white/10 border border-white/20 text-emerald-600 text-sm rounded hover:bg-white/20"
                  onClick={() => sort.fns.onSortChange("CREATED_AT")}
                >
                  Sort: Date (Newest)
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
                      <HeaderCell> Company Logo</HeaderCell>
                      <HeaderCell> Product Name</HeaderCell>
                      <HeaderCell> Created At</HeaderCell>
                      <HeaderCell> Action</HeaderCell>
                      <HeaderCell> Order</HeaderCell>
                    </HeaderRow>
                  </Header>

                  <Body>
                    {tableList.map((item, index) => (
                      <Row key={`${item.id}-${index}`} item={item}>
                        <Cell>
                          <img
                            src={item.logo}
                            alt={item.name}
                            className="w-10 h-10 rounded-full"
                          />
                        </Cell>
                        <Cell>{item.name}</Cell>
                        <Cell>
                          {item.createdAt.toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </Cell>
                        <Cell>
                          <button className="text-green-400 hover:underline">
                            Edit
                          </button>
                        </Cell>
                        <Cell>
                          <button className="text-green-400 hover:underline">
                            View
                          </button>
                        </Cell>
                      </Row>
                    ))}
                  </Body>
                </>
              )}
            </Table>
          </div>

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

export default ProductTable
