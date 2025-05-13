import Footer from "../shared/footer"
import Navbar from "../shared/Navbar"



function OrderDetails() {

    return (

        <>
             <Navbar />
            <div className="mx-10">
                <div className="relative p-10 mx-auto my-20 border rounded-lg shadow-2xl border-emerald-500/30 max-w-4xl bg-black/20 backdrop-blur-sm">
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

                    <div className="mt-8">
                        <p className=" text-orange-500">Order details will be displayed here.</p>
                    </div>

                </div>
            </div>

            <Footer />
        </>
    )
}

export default OrderDetails