
function ProductTable() {
    return (

        <>
            <div className="mx-10">
                <div className="relative p-10 mx-auto my-10 border rounded-lg shadow-2xl border-orange-500/30 max-w-5xl bg-black/20 backdrop-blur-sm overflow-auto">
                    <div
                        className="absolute inset-0 rounded-lg opacity-30 blur-xl"
                        style={{
                            background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3), transparent 80%)`,
                        }}
                    />

                    <h1 className="font-bold text-zinc-500">Product Table</h1>

                    </div>
            </div>
        </>
    )
}

export default ProductTable