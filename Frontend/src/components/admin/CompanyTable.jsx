
const CompanyTable = () => {

    return (
       
        <>

            <div className="mx-10">
            
                <div className="relative p-10 mx-auto my-10 border rounded-lg shadow-2xl border-orange-500/30 max-w-4xl bg-black/20 backdrop-blur-sm">
                {/* Glow effect */}

            
                    <div
                        className="absolute inset-0 rounded-lg opacity-30 blur-xl"
                        style={{
                            background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3), transparent 80%)`,
                        }}
                    />

                    <div className="relative z-10 text-center text-white">
                        <h1 className="text-3xl font-bold text-green-700">My Companies</h1>
                        <p className="mt-4 text-lg text-start mb-4">Manage your companies here.</p>
                    </div>

                    <div className="relative z-10 mt-8 text-center text-white">
                        
                    </div>    
    
                </div>
            </div>
        
        </>
    )
}   

export default CompanyTable;
