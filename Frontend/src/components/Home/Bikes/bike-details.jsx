import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Ensure useParams is imported from react-router-dom
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
import Like from '../../user/my-ui/Like';
import Ratting from '../../user/my-ui/Ratting';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setSingleProduct } from '@/store/productSlice';
import { Product_API_END_POINT } from '@/utils/api';

export default function BikeDetails() {
  const dispatch = useDispatch();
  const productId  = useParams(); // Destructure the id parameter from useParams
  console.log("Product ID:", productId);

  const { singleProduct } = useSelector(state => state.product);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [showShareModal, setShowShareModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const [reviews, setReviews] = useState([
    {
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      rating: 5,
      date: "2024-02-20",
      comment: "Amazing bike, excellent performance!"
    },
    {
      name: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      rating: 2,
      date: "2024-02-19",
      comment: "Great value for money, but could improve the seat comfort."
    }
  ]);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link Copied!✔️✔️", {
        duration: 2000,
        style: {
          color: '#10B981',
          backgroundColor: '#09090B',          
          fontSize: '20px',
          borderColor: '#10B981',
          padding: '10px 20px'
        }
      });
    } catch (err) {
      console.error('Failed to copy:', err);
      toast("Failed to copy link");
    }
  };

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const updatedFavorites = favorites.filter(id => id !== productId);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      toast.success("The bike has been Removed from your wishlist.🥲🥲", {
        position: "top-right",
        style: {
          color: '#10B981',
          backgroundColor: '#09090B',          
          fontSize: '20px',
          borderColor: '#10B981',
          padding: '10px 20px'
        }
      });
    } else {
      if (!favorites.includes(productId)) {
        favorites.push(productId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        toast.success("The bike has been added to your wishlist! ❤️❤️", {
          style: {
            color: '#10B981',
            backgroundColor: '#09090B',          
            fontSize: '20px',
            borderColor: '#10B981',
            padding: '10px 20px'
          }
        });
      }
    }
    setIsFavorite(!isFavorite);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("FormSubmission Successfully!❤️❤️ ", {
      style: {
        color: '#10B981',
        backgroundColor: '#09090B',          
        fontSize: '20px',
        borderColor: '#10B981',
        padding: '10px 20px'
      }
    });
    setShowForm(false);
  };

  const handleRating = (rating) => {
    setUserRating(rating);
    toast.success(`Thank you for rating ${rating} stars!`, {
      style: {
        color: '#10B981',
        backgroundColor: '#09090B',
        fontSize: '20px',
        borderColor: '#10B981',
        padding: '10px 20px'
      }
    });
  };

  const handleLikeDislike = (type) => { 
    if (type === 'like' && dislikes === 0) {
      setDislikes(prev => prev - 1);
    } else if (type === 'dislike' && likes === 0) {
      setLikes(prev => prev - 1);
    } else {
      if (type === 'like') {
        setLikes(prev => prev + 1);
      } else {
        setDislikes(prev => prev + 1);
      }
    }
  };

//   useEffect(() => {
//         const fetchSingleBike = async () => {
//                  try {

//                     const response = await axios.get(`${Product_API_END_POINT}/${productId}`, {
//                         withCredentials: true
//                     });
                    
//                     const data = await response.json(); 
//                     console.log("Single Bike Data:", data);

//                     if (response.data.success) {
//                         dispatch(setSingleProduct(response.data.product));
//                     } 
                    
//                     else {
//                         throw new Error(response.data.message || "Failed to fetch bike details!");
//                     }

//                 } catch (e) {
//                     console.log(e);
//                     toast.error("Failed to fetch bike details!", {
//                         style: {
//                         color: '#10B981',
//                         backgroundColor: '#09090B',
//                         fontSize: '20px',
//                         borderColor: '#10B981',
//                         padding: '10px 20px'
//                         }
//                     });
//                 }
//             };
            
//         fetchSingleBike(); 
//     }, [productId, dispatch]);

//   console.log("Single Product:", singleProduct);

  return (
    <>  
      <Navbar />
      <div className="min-h-screen py-12 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#246FAC] mb-10 text-start" style={{ textDecoration: "underline solid #FFB903 0.1em" }}>Bike Details Page :-</h1>
          <div className="bg-black/20 backdrop-blur-sm border border-emerald-500/30 rounded-lg shadow-2xl p-6 md:p-8">
            {/* Main Info Section */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Images */}
              <div className="h-[730px] rounded-lg overflow-hidden">
                <ImageSlider images={singleProduct?.images || []} interval={5000} className="h-full" />

              </div>

              {/* Right Column - Basic Info */}
              <div className="space-y-6">
                <div className="flex justify-center items-start">
                  <h1 className="text-4xl font-bold text-white">{productId?.title}</h1> 
                </div>

                <div className="flex justify-between items-start">
                  <h5 className="text-3xl font-bold text-emerald-500">
                    ${productId?.price?.toLocaleString()}
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
                    <span className="font-semibold">{handleRating}</span>
                    <span className="text-yellow-400">★</span>
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-300">
                    {(singleProduct?.reviewCount / 1000).toFixed(2)}k Reviews
                  </span>
                </div>

                {/* Shop Owner Info */}
                <div className="space-y-4 bg-white/5 p-4 rounded-lg">
                  <h2 className="text-xl font-semibold text-white">{singleProduct?.shopOwner?.name}</h2>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-gray-300">
                      <MapPin className="h-5 w-5 text-emerald-500" />
                      {productId?.shopOwner?.address}
                    </p>
                    <p className="flex items-center gap-2 text-gray-300">
                      <Phone className="h-5 w-5 text-emerald-500" />
                      {productId?.shopOwner?.phone}
                    </p>
                    <p className="flex items-center gap-2 text-gray-300">
                      <MessageSquare className="h-5 w-5 text-emerald-500" />
                      {productId?.shopOwner?.whatsapp}
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

                <div className="flex items-center justify-between mx-2 px-4 py-2 bg-white/5 ">
                  <Like className="md:order-2" />

                  <div>
                    <div className="flex items-center mt-6 mr-4 ">
                      <Ratting />
                    </div>

                    <textarea
                      name="Your Feedback"
                      id=""
                      className="w-full border border-[#10B981] rounded-md p-2 mt-4 mb-2 outline-none"
                      placeholder="Write your feedback here..."
                    >
                    </textarea>
                    <motion.button
                      type="submit"
                      className="w-full bg-emerald-500 text-white rounded-md font-medium text-[13px] my-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Submit Feedback
                    </motion.button>
                  </div>
                </div>
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
                      <p className="text-white">{productId?.bikeDetails?.engineType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg">
                    <Timer className="h-5 w-5 text-emerald-500" />
                    <div>
                      <p className="text-sm text-gray-400">Displacement</p>
                      <p className="text-white">{productId?.bikeDetails?.displacement}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg">
                    <Power className="h-5 w-5 text-emerald-500" />
                    <div>
                      <p className="text-sm text-gray-400">Power</p>
                      <p className="text-white">{productId?.bikeDetails?.power}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    <div>
                      <p className="text-sm text-gray-400">Condition</p>
                        <ul className="list-disc pl-4">
                            {
                                productId?.bikeDetails?.condition.map((condition, index) => (
                                <li key={index} className="text-white">{condition}</li>
                                ))
                            }
                        </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Key Features</h2>
                <ul className="space-y-2">
                  {productId?.bikeDetails?.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            {showForm && (
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
            )}
          </div>
        </div>
        </div>
      
    </>
  );
}
