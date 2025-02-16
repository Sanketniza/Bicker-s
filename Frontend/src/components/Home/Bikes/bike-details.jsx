import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { sampleCompanies } from '../../../JavaScript/bike';
import { ImageSlider } from './ImageSlider';
import { 
  Phone, 
  MapPin, 
  MessageSquare, 
  Timer, 
  Power, 
  CheckCircle2,
  Share2,
  Heart,
  Gauge, 
  
} from 'lucide-react';
import Navbar from '@/components/shared/Navbar';
import { toast } from 'sonner';

export default function BikeDetails() {

    const [location] = useLocation();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

  const [showShareModal, setShowShareModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Get bike ID from URL
  const bikeId = location.split('/')[2];
  const bike = sampleCompanies.find(b => b.id === bikeId);

  if (!bike) {
    return <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl text-white">Bike not found</h1>
    </div>;
  }

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast("Link Copied! The link has been copied to your clipboard.");
    } catch (err) {
      console.error('Failed to copy:', err);
      toast("Failed to copy link. Please try again.");
    }
  };

     const handleFavorite = () => {

        // Get existing favorites from localStorage
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

                if (isFavorite) {
                    // Remove from favorites
                    const updatedFavorites = favorites.filter(id => id !== bike.id);
                    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

                    toast.warning("Removed from favorites. The bike has been removed from your wishlist.", {
                            style: {
                                color: '#10B981',
                                backgroundColor: '#09090B',          
                                fontSize: '20px',
                                borderColor: '#10B981',
                                padding: '10px 20px'
                            }
                        });
                } 
            
                else {
                    // Add to favorites
                    if (!favorites.includes(bike.id)) {
                        favorites.push(bike.id);
                        localStorage.setItem('favorites', JSON.stringify(favorites));
                        toast.success("Added to favorites. The bike has been added to your wishlist.", {
                        style: {
                            color: '#10B981',
                            backgroundColor: '#09090B',
                            borderColor: '#10B981',
                            fontSize: '20px'

                        }
                        });
                    }
                }

        setIsFavorite(!isFavorite);
    };

    const handleSubmit = (e) => {

            e.preventDefault();
            // Here you would typically send the form data to your backend

            console.log('Form submitted:', formData);

            toast.success("Message Sent! The shop owner will contact you soon.", {
                style: {
                    color: '#10B981',
                    backgroundColor: '#09090B',
                    borderColor: '#10B981',
                    fontSize: '20px'
                }
            });
            setShowForm(false);
    };

  return (

        <>  

        <Navbar />
        
        <div className="min-h-screen py-12 bg-[#09090B]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-black/20 backdrop-blur-sm border border-emerald-500/30 rounded-lg shadow-2xl p-6 md:p-8">
                
                    {/* Main Info Section */}
                    <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column - Images */}
                        <div className="h-[600px] rounded-lg overflow-hidden">
                            <ImageSlider images={bike.images} interval={5000} className="h-full" />
                        </div>

                        {/* Right Column - Basic Info */}
                        <div className="space-y-6">
                                <div className="flex justify-center items-start">
                                <h1 className="text-4xl font-bold text-white">{bike.name}</h1> 
                                </div>

                                <div className="flex justify-between items-start">
                                <h5 className="text-3xl font-bold text-emerald-500">
                                    ${bike.price.toLocaleString()}
                                </h5>

                                <div className="flex gap-2 items-center">

                                    <motion.button
                                        onClick={handleShare}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors border border-emerald-500/30"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                    <Share2 className="h-5 w-5 text-emerald-500" />
                                    <span className="text-emerald-500 font-medium">Share</span>
                                    </motion.button>

                                    <motion.button
                                        onClick={handleFavorite}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 transition-colors border border-rose-500/30"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Heart 
                                            className={`h-5 w-5 ${isFavorite ? 'text-rose-500 fill-rose-500' : 'text-rose-500'}`}
                                        />
                                        <span className="text-rose-500 font-medium">Favorite</span>
                                    </motion.button>
                                    
                                </div>
                            </div>    

                            {/* Rating and Reviews */}
                            <div className="flex items-center gap-2 text-lg">
                            <span className="flex items-center gap-1">
                                <span className="font-semibold">{bike.rating}</span>
                                <span className="text-yellow-400">★</span>
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-300">
                                {(bike.reviewCount / 1000).toFixed(2)}k Reviews
                            </span>
                            </div>

                            {/* Shop Owner Info */}
                            <div className="space-y-4 bg-white/5 p-4 rounded-lg">
                            <h2 className="text-xl font-semibold text-white">{bike.shopOwner.name}</h2>
                            <div className="space-y-2">
                                <p className="flex items-center gap-2 text-gray-300">
                                <MapPin className="h-5 w-5 text-emerald-500" />
                                {bike.shopOwner.address}
                                </p>
                                <p className="flex items-center gap-2 text-gray-300">
                                <Phone className="h-5 w-5 text-emerald-500" />
                                {bike.shopOwner.phone}
                                </p>
                                <p className="flex items-center gap-2 text-gray-300">
                                <MessageSquare className="h-5 w-5 text-emerald-500" />
                                {bike.shopOwner.whatsapp}
                                </p>
                            </div>
                            </div>

                            <motion.button
                            className="w-full bg-emerald-500 text-white rounded-md font-medium text-[22px]"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowForm(!showForm)}
                            >
                            Contact Seller
                            </motion.button>
                        </div>
                    </div>

                    {/* Bike Details Section */}
                    <div className="mt-12 grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white">Specifications</h2>
                            <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg">
                                <Gauge className="h-5 w-5 text-emerald-500" />
                                <div>
                                <p className="text-sm text-gray-400">Engine Type</p>
                                <p className="text-white">{bike.bikeDetails.engineType}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg">
                                <Timer className="h-5 w-5 text-emerald-500" />
                                <div>
                                <p className="text-sm text-gray-400">Displacement</p>
                                <p className="text-white">{bike.bikeDetails.displacement}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg">
                                <Power className="h-5 w-5 text-emerald-500" />
                                <div>
                                <p className="text-sm text-gray-400">Power</p>
                                <p className="text-white">{bike.bikeDetails.power}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                <div>
                                <p className="text-sm text-gray-400">Condition</p>
                                <p className="text-white">{bike.bikeDetails.condition}</p>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white">Key Features</h2>
                            <ul className="space-y-2">
                            {bike.bikeDetails.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2 text-gray-300">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                {feature}
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact Form */}
                        {
                            showForm && (
                                <motion.div 
                                    className="mt-8 bg-white/5 p-6 rounded-lg"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <h2 className="text-2xl font-bold text-white mb-6">Contact Seller</h2>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-white/10 border border-gray-600 rounded-md px-4 py-2 text-white"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                        </div>
                                        <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full bg-white/10 border border-gray-600 rounded-md px-4 py-2 text-white"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        />
                                        </div>
                                        <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            className="w-full bg-white/10 border border-gray-600 rounded-md px-4 py-2 text-white"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Message
                                        </label>
                                        <textarea
                                        required
                                        rows={4}
                                        className="w-full bg-white/10 border border-gray-600 rounded-md px-4 py-2 text-white"
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        />
                                    </div>
                                    <motion.button
                                        type="submit"
                                        className="w-full py-2 bg-orange-500 text-white rounded-md font-bold text-[20px]"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Send Message
                                    </motion.button>
                                    </form>
                                </motion.div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
