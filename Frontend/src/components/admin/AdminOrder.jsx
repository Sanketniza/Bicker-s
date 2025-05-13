import AdminNavbar from "../shared/AdminNavbar"
import Footer from "../shared/footer"


function AdminOrder() {
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
                        </div>
                    </div>

                    

                    </div>
            </div>

            <Footer />
        </>
    )
}

export default AdminOrder