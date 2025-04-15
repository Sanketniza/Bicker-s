import AdminNavbar from "../shared/AdminNavbar"
import { useNavigate } from "react-router-dom"
import Footer from "../shared/footer"


function ProductsCreation() {

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
                    <h1 className=" font-bold text-zinc-500">Products Creation Page</h1>
                </div>

                </div>
            </div>

            <Footer />

        </>
    )
}

export default ProductsCreation