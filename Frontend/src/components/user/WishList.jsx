import { useEffect, useState } from 'react';
import { CompanyCard } from '../Home/Bikes/CompanyCard';
import { Button } from '../ui/button';
import { ShoppingBag, X } from 'lucide-react';
import Navbar from '../shared/Navbar';
import { toast } from 'sonner';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addToWishList, clearWishList, removeFromWishList } from '@/store/wishListSlice';
import { WISHLIST_API_END_POINT } from '@/utils/api';
import Footer from '../shared/footer';


export default function WishlistPage() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { wishlist = [] } = useSelector(state => state.wishlist); // ✅ Fallback to empty array

    // console.log("Wishlist sdf :", wishlist); // ✅ Log to verify state
    // remove accidental dispatch on render that could duplicate items
    // addToWishList(wishlist);
    // console.log("Wishlist sdf :", wishlist); // ✅ Log to verify state
    // console.log("Wishlist  :",addToWishList); // ✅ Log to verify state

    
    const [totalPrice, setTotalPrice] = useState(0);

    // ✅ Calculate total price
    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = wishlist.reduce((acc, item) => acc + (item.price || 0), 0);
            setTotalPrice(total);
        };

        calculateTotalPrice();
    }, [wishlist]);

  


      // ✅ Fetch all products from the wishlist only if user is logged in
      useEffect(() => {
        const fetchWishList = async () => {
            if (!user) {
                // Ensure local wishlist is cleared for guests
                dispatch(clearWishList());
                return;
            }
            try {
                const response = await axios.get(`${WISHLIST_API_END_POINT}/`, {
                    withCredentials: true
                });

                if (response.data.success) {
                    const items = response.data.wishlist?.products || [];
                    // reset first then add
                    dispatch(clearWishList());
                    const products = items.map(product => ({
                        _id: product._id,
                        title: product.title,
                        price: product.price,
                        images: product.images || [],
                        description: product.description || '',
                    }));
                    products.forEach(product => dispatch(addToWishList(product)));
                }
            } catch (error) {
                console.error('Error fetching wishlist:', error.response || error);
                // Don't show error to guests; only notify logged-in users
                if (user) {
                    toast.error("Failed to load wishlist", {
                        style: {
                            color: '#ef4444',
                            backgroundColor: '#09090B',
                            fontSize: '20px',
                            borderColor: '#ef4444',
                            padding: '10px 20px'
                        }
                    });
                }
            }
        };

        fetchWishList();
    }, [dispatch, user]);

    // useEffect(() => {
    //     console.log("Updated Wishlist State:", wishlist);
    //     console.log(`Total Products in State: ${wishlist?.length || 0}`);
    // }, [wishlist]);
    
    

    console.log("Wishlist:", wishlist?.products);

  

    // ✅ Remove single product from wishlist
    const handleRemove = async (productId) => {
        try {
            const res = await axios.delete(`${WISHLIST_API_END_POINT}/remove/${productId}`, {
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(removeFromWishList(productId));
                toast.success("Removed from wishlist", {
                    style: {
                        color: '#10B981',
                        backgroundColor: '#09090B',
                        fontSize: '20px',
                        borderColor: '#10B981',
                        padding: '10px 20px'
                    }
                });
            }
        } catch (error) {
            console.error("Remove failed:", error);
            toast.error("Failed to remove item", {
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

    // ✅ Clear all wishlist items
    const handleClearWishlist = async () => {
        try {
            const res = await axios.delete(`${WISHLIST_API_END_POINT}/clear`, {
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(clearWishList());
                toast.success("Wishlist cleared!", {
                    style: {
                        color: '#10B981',
                        backgroundColor: '#09090B',
                        fontSize: '20px',
                        borderColor: '#10B981',
                        padding: '10px 20px'
                    }
                });
            }
        } catch (error) {
            console.error('Clear failed:', error);
            toast.error("Failed to clear wishlist", {
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

    return (
        <>
            <Navbar />            <div className="py-1 bg-[#09090B]">
                        <div className="mx-3 sm:mx-10">
            
                            
            
                            <div className="relative p-4 sm:p-10 mx-auto my-10 sm:my-20 border rounded-lg shadow-2xl border-emerald-500/30 max-w-7xl bg-black/20 backdrop-blur-sm">
                            {/* Glow effect */}
                            
                            <div
                                className="absolute inset-0 rounded-lg opacity-30 blur-xl"
                                style={{
                                background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3), transparent 80%)`,
                                }}
                            />
            
                            

                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                                <h1 className="text-2xl sm:text-3xl font-bold text-emerald-500 relative mb-2 sm:mb-4">
                                    Your Wishlist
                                    <span className="block w-full h-1 bg-orange-500 rounded-full absolute bottom--1"></span>
                                </h1>
                                <Button 
                                    onClick={handleClearWishlist}
                                    variant="destructive"
                                    className="w-full sm:w-auto hover:bg-rose-600"
                                >
                                    Clear Wishlist
                                </Button>
                            </div>                    {/* ✅ Total Price */}
                    {
                        user && wishlist.length > 0 && (
                            <div className="mb-6 sm:mb-8 text-lg sm:text-xl text-gray-300">
                                Total Price: <span className="text-emerald-500 font-bold">₹{totalPrice.toLocaleString()}</span>
                            </div>
                        )
                    }
                                  {
                                    wishlist.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                                            {wishlist.map(item => (
                                                <div key={item._id} className="relative p-2 sm:p-6">
                                                    <CompanyCard 
                                                        id={item._id}
                                                        name={item.title}
                                                        price={item.price}
                                                        images={item.images || []}
                                                        description={item.description}
                                                    />
                                                    <Button
                                                        onClick={() => handleRemove(item._id)}
                                                        className="w-8 h-8 absolute top-7 right-0 sm:right-0 bg-rose-500/10 rounded-full text-rose-500 hover:bg-rose-500/30"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : ( 
                                        <div>
                                            <ShoppingBag className="mx-auto text-orange-500 w-16 h-16 mb-4" />
                                            <p className="text-gray-400 text-center py-10"> 
                                                {user ? 'No items in wishlist' : 'Please login to use wishlist'}
                                            </p>
                                        </div>
                                    )
                                }

            
                            </div>
                        </div>
                    </div>
                                
               <Footer />                 
        </>
    );
}
