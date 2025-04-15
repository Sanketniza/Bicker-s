import AdminNavbar from "../shared/AdminNavbar"
import Footer from "../shared/footer"
import AdminCompaniesCreation from "./AdminCompaniesCreation"
import CompanyTable from "./CompanyTable"


function AdminCompanies() {
    return (
        <>
            <AdminNavbar />
            <div className="mx-10">
                <div className="relative p-10 mx-auto my-10 border rounded-lg shadow-2xl border-emerald-700/30 max-w-5xl bg-black/20 backdrop-blur-sm overflow-auto">
                    <div
                        className="absolute inset-0 rounded-lg opacity-30 blur-xl"
                        style={{
                            background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3), transparent 80%)`,
                        }}
                    />
                    
                    <AdminCompaniesCreation />
                    <CompanyTable/>

                </div>
            </div>
                    <Footer />
        </>
    )
}

export default AdminCompanies