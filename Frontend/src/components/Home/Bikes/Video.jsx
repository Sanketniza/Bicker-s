import Navbar from "@/components/shared/Navbar"


function Video() {

    return (

        <>

            <Navbar />

            <div className="py-1 bg-[#09090B]">

                <div className="mx-10">

                    <div className="relative p-10 mx-auto my-20 border rounded-lg shadow-2xl border-emerald-500/30 max-w-7xl bg-black/20 backdrop-blur-sm">
                    {/* Glow effect */}

                    <div
                        className="absolute inset-0 rounded-lg opacity-30 blur-xl"
                        style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3), transparent 80%)`,
                        }}
                    />

                        <h1 className="relative text-4xl font-bold mb-12 text-white">Videos</h1>
                        <div>


                        </div>    

                    </div>
                </div>
          </div>
        
        </>
    )
}

export default Video

                            // {
                            //     singleProduct?.videos?.length > 0 ? (
                            //         <div className="h-[730px] rounded-lg overflow-hidden">
                            //             <iframe 
                            //                 src={singleProduct.videos} 
                            //                 title="Bike Video" 
                            //                 className="w-full h-full rounded-lg"
                            //                 allowFullScreen
                            //             ></iframe>
                            //         </div>
                            //     ) : (
                            //         <div className="flex items-center justify-center h-full text-white">
                            //             No Video Is Available
                            //         </div>
                            //     )
                            // }   