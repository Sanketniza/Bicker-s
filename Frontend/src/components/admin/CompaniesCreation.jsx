import AdminNavbar from "../shared/AdminNavbar"
import Footer from "../shared/footer"

function CompaniesCreation() {
    return (
        <>
            <AdminNavbar />

            <div className="mx-5">
                <div className="relative p-10 mx-auto my-20 border rounded-lg shadow-2xl border-emerald-500/30 max-w-4xl bg-black/20 backdrop-blur-sm">

                {/* Glow effect */}
                <div
                    className="absolute inset-0 rounded-lg opacity-30 blur-xl"
                    style={{
                    background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3), transparent 80%)`,
                    }}
                />

                <h1>Companies Creation Page</h1>

                </div>
            </div>

            <Footer />
        
        </>
    )
}

export default CompaniesCreation