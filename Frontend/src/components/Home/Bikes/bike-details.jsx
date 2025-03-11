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
import { clearSingleProduct, setLoading, setSingleProduct } from '@/store/productSlice';
import { Product_API_END_POINT } from '@/utils/api';
import { EventAvailable, Policy } from '@mui/icons-material';

export default function BikeDetails() {
  
  const dispatch = useDispatch();
  const params = useParams();
  const productId = params.id;
  console.log("Product ID:", productId);

  const { singleProduct , loading } = useSelector(state => state.product);


  useEffect(() => {
		const fetchSingleBike = async () => {
			try {

                dispatch(setLoading(true));
				dispatch(clearSingleProduct());

				const response = await axios.get(`http://localhost:8000/api/v1/product/${productId}`, {
					withCredentials: true
				});

				console.log("Response Data:", response.data);

				if(response.data.success) {
					dispatch(setSingleProduct(response.data.product));
				}

			}catch (error) {
				console.error('Failed to fetch bike details:', error);
				toast.error("Failed to fetch bike details!", {
					style: {
						color: '#10B981',
						backgroundColor: '#09090B',
						fontSize: '20px',
						borderColor: '#10B981',
						padding: '10px 20px'
					}
				});
			} finally {
                 dispatch(setLoading(false));
            }
		};

		fetchSingleBike();

    }, [productId, dispatch]);

//   console.log("Single Product:", singleProduct);
//   console.log("Single Product title :", singleProduct?.title);

//   console.log("Single info ID:", singleProduct?.specifications[0]?.EngineType);



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
		const targetId = singleProduct?._id || productId;
		
		if (isFavorite) {
			const updatedFavorites = favorites.filter(id => id !== targetId);
			localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
		} 

		else {
			localStorage.setItem('favorites', [...favorites, targetId]);
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

  const op = [
    'https://cdn.pixabay.com/photo/2016/04/07/06/53/bmw-1313343_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/03/27/17/59/vintage-1283299_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/03/27/17/59/vintage-1283299_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/04/07/06/53/bmw-1313343_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/03/27/17/59/vintage-1283299_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/03/27/17/59/vintage-1283299_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/04/07/06/53/bmw-1313343_1280.jpg',
]


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
                        {/* <ImageSlider images={singleProduct?.images || []} interval={5000} className="h-full" /> */}
                        <ImageSlider images={op} interval={5000} className="h-full" />

                    </div>

                    {/* Right Column - Basic Info */}
                    <div className="space-y-6">
                        <div className="flex justify-center items-start">
                        <h1 className="text-4xl font-bold text-white">{singleProduct?.title}</h1> 
                        </div>

                        <div className="flex justify-between items-start">
                        <h5 className="text-3xl font-bold text-emerald-500">
                            Rs {singleProduct?.price?.toLocaleString()}
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
                            {(singleProduct?.views / 1000).toFixed(2)}k Reviews
                        </span>
                        </div>

                        {/* Shop Owner Info */}
                        <div className="space-y-4 bg-white/5 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold text-white">{singleProduct?.shopOwnerId?.fullname}</h2>
                        <div className="space-y-2">
                            <p className="flex items-center gap-2 text-gray-300">
                            <MapPin className="h-5 w-5 text-emerald-500" />
                            {singleProduct?.location}
                            </p>
                            <p className="flex items-center gap-2 text-gray-300">
                            <Phone className="h-5 w-5 text-emerald-500" />
                            {singleProduct?.shopOwnerId?.phone}
                            </p>
                            <p className="flex items-center gap-2 text-gray-300">
                            <MessageSquare className="h-5 w-5 text-emerald-500" />
                            {singleProduct?.description}
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
                            <p className="text-white">{singleProduct?.specifications[0]?.EngineType}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg">
                            <Timer className="h-5 w-5 text-emerald-500" />
                            <div>
                            <p className="text-sm text-gray-400">Displacement</p>
                            <p className="text-white">{singleProduct?.specifications[0]?.Displacement}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg">
                            <Power className="h-5 w-5 text-emerald-500" />
                            <div>
                            <p className="text-sm text-gray-400">Power</p>
                            <p className="text-white">{singleProduct?.specifications[0]?.Power}</p>
                            </div>
                        </div>

                        
                        <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg">
                            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                            <div>
                            <p className="text-sm text-gray-400">Condition</p>
                            <p className="text-white">{singleProduct?.specifications[0]?.Condition}</p>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">Key Features</h2>
                        <ul className="space-y-2">
                            {singleProduct?.features?.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2 text-gray-300">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="flex items-center gap-2 ">
                        
                        <div>
                            <p className="text-gray-300">Stock Status</p>
                        </div>
                        </div>

                        <div className="flex items-center gap-2">
                        <div>
                            <p className="text-gray-300">Status</p>
                        </div>
                        </div>

                        <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg">
                        <EventAvailable className="h-5 w-5 text-emerald-500" />
                        <div className="text-gray-300">{singleProduct?.stock}</div>
                        </div>

                        <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg">
                        <Policy className="h-5 w-5 text-emerald-500" />
                        <div className="text-gray-300">{singleProduct?.status}</div>
                        </div>

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
