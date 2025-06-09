import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'; // Ensure useParams is imported from react-router-dom
import { motion } from 'framer-motion';
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
import { EventAvailable, Policy } from '@mui/icons-material';
import { addToWishList, removeFromWishList } from '@/store/wishListSlice';
import { addRating, fetchAverageRating, fetchRatings, updateRating } from '@/store/ratingSlice';
import HoverRating from '../../user/my-ui/Ratting';
import Footer from '@/components/shared/footer';

export default function BikeDetails() {

    const navigate = useNavigate();
  
    const dispatch = useDispatch();
    const params = useParams();
    const productId = params.id;
//   console.log("Product ID:", productId);

  const { singleProduct  } = useSelector(state => state.product);
//   const { wishlist } = useSelector(state => state.wishlist);
//   console.log("Wishlist:", wishlist);


   useEffect(() => {

		const fetchSingleBike = async () => {

			try {

                dispatch(setLoading(true));
				dispatch(clearSingleProduct());

				const response = await axios.get(`http://localhost:8000/api/v1/product/${productId}`, {
					withCredentials: true
				});

				// console.log("Response Data:", response.data);

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

    const [isLoading, setIsLoading] = useState(false);

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!singleProduct?._id || !singleProduct?.shopOwnerId?._id) {
            toast.error("Product information incomplete. Please try again later.", {
                style: {
                    color: '#ef4444',
                    backgroundColor: '#09090B',
                    fontSize: '18px',
                    borderColor: '#ef4444',
                    padding: '10px 20px'
                }
            });
            return;
        }

        try {
            setIsLoading(true); // Add this state variable to your component

            const response = await axios.post('http://localhost:8000/api/v1/order/', {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                message: formData.message,
                productId: productId,
                shopOwnerId: singleProduct?.shopOwnerId?._id
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                toast.success("Your message has been sent to the seller!", {
                    style: {
                        color: '#10B981',
                        backgroundColor: '#09090B',
                        fontSize: '18px',
                        borderColor: '#10B981',
                        padding: '10px 20px'
                    }
                });
                // Reset form data
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                });
                setShowForm(false);
            }
        } catch (error) {
            console.error("Error sending message:", error);
            
            const errorMsg = error.response?.data?.message || "Failed to send message. Please try again.";
            toast.error(errorMsg, {
                style: {
                    color: '#ef4444',
                    backgroundColor: '#09090B',
                    fontSize: '18px',
                    borderColor: '#ef4444',
                    padding: '10px 20px'
                }
            });
            
            // If it's an authentication error, suggest login
            if (error.response?.status === 401) {
                toast.error("Please login to contact the seller", {
                    style: {
                        color: '#ef4444',
                        backgroundColor: '#09090B',
                        fontSize: '18px',
                        borderColor: '#ef4444',
                        padding: '10px 20px'
                    },
                    action: {
                        label: "Login",
                        onClick: () => navigate("/login")
                    }
                });
            }
        } finally {
            setIsLoading(false); // Add this state variable to your component
        }
    };


    const { wishList } = useSelector(state => state.wishlist);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (singleProduct) {
            const exists = wishList.some(item => item._id === singleProduct._id);
            setIsFavorite(exists);
        }
    }, [wishList, singleProduct]);

    const handleWishlist = async () => {
        if (!singleProduct) {
            toast.error("Product information not available", {
                style: {
                    color: '#ef4444',
                    backgroundColor: '#09090B',
                    fontSize: '20px',
                    borderColor: '#ef4444',
                    padding: '10px 20px'
                }
            });
            return;
        }

        try {
            if (isFavorite) {
                const res = await axios.delete(`http://localhost:8000/api/v1/wishlist/remove/${singleProduct._id}`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (res.data.success) {
                    dispatch(removeFromWishList(singleProduct._id));
                    toast.success("Removed from wishlist!", {
                        style: {
                            color: '#10B981',
                            backgroundColor: '#09090B',
                            fontSize: '20px',
                            borderColor: '#10B981',
                            padding: '10px 20px'
                        }
                    });
                    setIsFavorite(false);
                }
            } 
            
            else {
                const res = await axios.post('http://localhost:8000/api/v1/wishlist/add', {
                    productId: singleProduct._id
                }, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (res.data.success) {
                    const productData = {
                        _id: singleProduct._id,
                        title: singleProduct.title,
                        price: singleProduct.price,
                        images: singleProduct.images
                    };

                    dispatch(addToWishList(productData));
                    toast.success("Added to wishlist!", {
                        style: {
                            color: '#10B981',
                            backgroundColor: '#09090B',
                            fontSize: '20px',
                            borderColor: '#10B981',
                            padding: '10px 20px'
                        }
                    });
                    setIsFavorite(true);
                }
            }
        } catch (error) {
            console.error('Wishlist operation failed:', error);
            const errorMessage = error.response?.data?.message || `Failed to ${isFavorite ? 'remove from' : 'add to'} wishlist!`;
            toast.error(errorMessage, {
                style: {
                    color: '#ef4444',
                    backgroundColor: '#09090B',
                    fontSize: '20px',
                    borderColor: '#ef4444',
                    padding: '10px 20px'
                }
            });
        }
    };


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




  const { ratings = [], averageRating = 0 } = useSelector((state) => state.rating);


  const [userRating, setUserRating] = useState(null);
  const [comment, setComment] = useState('');
  const [ratingId, setRatingId] = useState(null);

  useEffect(() => {
    dispatch(fetchRatings(productId));
    dispatch(fetchAverageRating(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (ratings && ratings.length > 0) {
      const existingRating = ratings.find((r) => r.userId === 'currentUserId');
      if (existingRating) {
        setUserRating(existingRating.rating);
        setComment(existingRating.comment);
        setRatingId(existingRating._id);
      }
    }
  }, [ratings]);

  const handleSubmitRating = async () => {
    if (!userRating) return toast.error("Please provide a rating");

    try {
        await dispatch(addRating({ productId, rating: userRating, comment }));
        toast.success("Rating submitted successfully!");

        // ✅ Update state immediately
        dispatch(fetchRatings(productId));
        dispatch(fetchAverageRating(productId));
    } catch (error) {
        console.error("Failed to submit rating:", error);
        toast.error("Failed to submit rating. Please try again.");
    }
};

// console.log('====================================');
// console.log("video" , singleProduct?.videos);
// console.log('====================================');


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


                    <div>

                        <div className="h-[730px] rounded-lg overflow-hidden">
                            {singleProduct?.images?.length > 0 ? (
                                <ImageSlider images={singleProduct.images} interval={5000} className="h-full" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-white">
                                    No Image Is Available
                                </div>
                            )}
                        </div>


                         {/* // video section     */}
                        <div className="mt-6 h-[30px] border border-[#246FAC] rounded-lg overflow-hidden">
                            {/* <Link to={`/video/${singleProduct?.videos}`} className="flex items-center justify-center h-full text-white"> View Video </Link> */}
                            <Link to={'/video/singleProduct?._id'} className="flex items-center justify-center h-full text-white"> View Video </Link>
                        </div>

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
                                    onClick={handleWishlist}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 transition-colors border border-rose-500/30"
                                >
                                    <Heart 
                                        className={`h-5 w-5 ${isFavorite ? 'text-rose-500 fill-rose-500' : 'text-rose-500'}`}
                                    />

                                    <span className="text-rose-500 font-medium">
                                        {isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                    </span>
                                </motion.button>

                            </div>
                        </div>    

                        {/* //*:Rating and Reviews */}
                        <div className="flex items-center gap-2 text-lg ">
                            <span className="text-yellow-400 text-xl">
                                {averageRating ? `${averageRating} ★` : 'No ratings yet'}
                            </span>

                            <span className="text-gray-400">•</span>

                            <span className="text-gray-300">
                                {(singleProduct?.views / 1000).toFixed(2)}k Reviews
                            </span>

                           
                            <span className="text-gray-400 ml-40">
                                Created on {new Date(singleProduct?.createdAt).toLocaleDateString()}
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

                                <p className="flex items-start gap-2 text-gray-300">
                                    <MessageSquare className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                                    <span className="flex-1">{singleProduct?.description}</span>
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
                        <Like className="md:order-2" productId={singleProduct?._id} />

                        {/* <div>
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
                        </div> */}

                         {/* ✅ Display Average Rating */}
                    {/* <div className="flex items-center gap-2">
                        <span className="text-yellow-400 text-xl">
                        {averageRating ? `${averageRating} ★` : 'No ratings yet'}
                        </span>
                        <span className="text-gray-400">
                        ({ratings.length} reviews)
                        </span>
                    </div> */}

                            {/* //* ✅ Rating Component */}
                            <div className="mt-4">
                                <HoverRating value={userRating} onChange={(newValue) => setUserRating(newValue)} />

                                <textarea
                                placeholder="Write a comment..."
                                className="w-full mt-2 bg-gray-800 text-white p-2 rounded-md border border-gray-700"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                />

                                <button
                                onClick={handleSubmitRating}
                                className="mt-3 px-4 py-2 bg-emerald-500 text-white rounded-md"
                                >
                                Submit Rating
                                </button>
                            </div>

                            {/* ✅ Display User Ratings */}

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
                            whileHover={{ scale: isLoading ? 1 : 1.02 }}
                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </span>
                            ) : "Send Message"}
                        </motion.button>
                        </form>
                    </motion.div>
                    )}

                </div>
                </div>
            </div>
            
            <Footer />
        </>
    );
}
