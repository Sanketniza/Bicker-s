import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/footer"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { Loader2, Film, PlayCircle } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

function Video() {
    const { id } = useParams() // Get product ID from URL params
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(0)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProductWithVideos = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`http://localhost:8000/api/v1/product/${id}`, {
                    withCredentials: true
                })
                
                if (response.data.success) {
                    setProduct(response.data.product)
                } else {
                    setError("Failed to fetch product details")
                    toast.error("Failed to fetch product details")
                }
            } catch (error) {
                console.error("Error fetching product videos:", error)
                setError("Error loading videos. Please try again.")
                toast.error("Error loading videos")
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchProductWithVideos()
        }
    }, [id])

    // Handle video selection
    const handleVideoSelect = (index) => {
        setSelectedVideoIndex(index)
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen py-12 bg-[#09090B]">
                <div className="mx-10">
                    <div className="relative p-10 mx-auto my-10 border rounded-lg shadow-2xl border-emerald-500/30 max-w-7xl bg-black/20 backdrop-blur-sm">
                        {/* Glow effect */}
                        <div
                            className="absolute inset-0 rounded-lg opacity-30 blur-xl"
                            style={{
                            background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3), transparent 80%)`,
                            }}
                        />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-8">
                                <Film className="text-emerald-500 h-8 w-8" />
                                <h1 className="text-4xl font-bold text-white">
                                    <span className="text-emerald-500">Video</span> Gallery
                                </h1>
                            </div>

                            {loading ? (
                                <div className="flex justify-center items-center py-20">
                                    <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                                </div>
                            ) : error ? (
                                <div className="text-center py-10">
                                    <p className="text-red-500">{error}</p>
                                </div>                            ) : !product?.videos || product.videos.length === 0 ? (
                                <div className="text-center py-10">
                                    <Film className="mx-auto text-gray-400 text-8xl mb-4" />
                                    <p className="text-xl text-gray-400">No videos available for this product</p>
                                </div>
                            ) : (
                                <div>
                                    {/* Main selected video */}
                                    <div className="mb-8">
                                        <div className="bg-black rounded-lg overflow-hidden aspect-video">
                                            <video 
                                                key={selectedVideoIndex}
                                                src={product.videos[selectedVideoIndex]}
                                                className="w-full h-full object-contain"
                                                controls
                                                autoPlay
                                                controlsList="nodownload"
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <h2 className="text-2xl font-bold text-white">{product.title}</h2>
                                            <p className="text-gray-400 mt-2">{`Video ${selectedVideoIndex + 1} of ${product.videos.length}`}</p>
                                        </div>
                                    </div>

                                    {/* Thumbnails gallery */}
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-4">All Videos</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {product.videos.map((videoUrl, index) => (
                                                <motion.div 
                                                    key={index}
                                                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                                                        selectedVideoIndex === index 
                                                            ? 'border-emerald-500' 
                                                            : 'border-transparent'
                                                    }`}
                                                    onClick={() => handleVideoSelect(index)}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <div className="aspect-video bg-black/50">
                                                        <video 
                                                            src={videoUrl}
                                                            className="w-full h-full object-cover"
                                                            muted 
                                                            preload="metadata"
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-all duration-300">
                                                            <PlayCircle className="h-12 w-12 text-emerald-500" />
                                                        </div>
                                                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs py-1 px-2">
                                                            Video {index + 1}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </>
    )
}

export default Video