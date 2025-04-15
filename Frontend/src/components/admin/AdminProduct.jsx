import { useNavigate } from "react-router-dom"
import AdminNavbar from "../shared/AdminNavbar"
import ProductTable from "./ProductTable"
import Footer from "../shared/footer"

function AdminProduct() {

    const navigate = useNavigate()

    return (
        <>
            <AdminNavbar />

            <div className="mx-10">

                <div className="relative p-10 mx-auto my-10 border rounded-lg shadow-2xl border-orange-500/30 max-w-4xl bg-black/20 backdrop-blur-sm">
                {/* Glow effect */}
                <div
                    className="absolute inset-0 rounded-lg opacity-30 blur-xl"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3), transparent 80%)`,
                    }}
                />

                <div className="relative flex justify-between items-center ">
                    <h2 className=" font-bold text-white">
                        <span className="text-emerald-500">Would Like to Create New</span> Product
                    </h2>

                    <button 
                        onClick={() => navigate('/admin-products/products-creation')} 
                        className="p-2 text-[12px] bg-yellow-500 text-white rounded-lg hover:bg-emerald-600 transition duration-200">
                        create product
                    </button>
                </div>


                </div>
            </div>

            <ProductTable />
            
            <Footer />
        </>
    )
}

export default AdminProduct