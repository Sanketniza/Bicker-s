import { useEffect, useState } from 'react';
import { CompanyCard } from '../Home/Bikes/CompanyCard';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import Navbar from '../shared/Navbar';
import { toast } from 'sonner';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addToWishList, clearWishList, removeFromWishList } from '@/store/wishListSlice';


export default function WishlistPage() {
    const dispatch = useDispatch();
    const { wishlist = [] } = useSelector(state => state.wishlist); // ✅ Fallback to empty array

    // console.log("Wishlist sdf :", wishlist); // ✅ Log to verify state
    addToWishList(wishlist);
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

  


      // ✅ Fetch all products from the wishlist
      useEffect(() => {
        const fetchWishList = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/wishlist/', {
                    withCredentials: true
                });
        
                // console.log("Raw Response Data:", response);
        
                if (response.data.success && response.data.wishlist?.products?.length) {
                    const products = response.data.wishlist.products.map(product => ({
                        _id: product._id,
                        title: product.title,
                        price: product.price,
                        images: product.images || [],
                        description: product.description || '',
                    }));
        
                    products.forEach(product => {
                        dispatch(addToWishList(product));
                    });
        
                    // console.log("All Products in Wishlist:", products);
                    // console.log(`Total Products in Wishlist: ${products.length}`);
                }
            } catch (error) {
                console.error('Error fetching wishlist:', error.response || error);
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
        };

        fetchWishList();
        
    }, [dispatch]);

    // useEffect(() => {
    //     console.log("Updated Wishlist State:", wishlist);
    //     console.log(`Total Products in State: ${wishlist?.length || 0}`);
    // }, [wishlist]);
    
    

    console.log("Wishlist:", wishlist?.products);

  

    // ✅ Remove single product from wishlist
    const handleRemove = async (productId) => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/v1/wishlist/remove/${productId}`, {
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
            const res = await axios.delete('http://localhost:8000/api/v1/wishlist/clear', {
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
            
                            

                            <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-emerald-500">Your Wishlist</h1>
                        <Button 
                            onClick={handleClearWishlist}
                            variant="destructive"
                            className="hover:bg-rose-600"
                        >
                            Clear Wishlist
                        </Button>
                    </div>

                    {/* ✅ Total Price */}
                    {
                        wishlist.length > 0 && (
                            <div className="mb-8 text-xl text-gray-300">
                                Total Price: <span className="text-emerald-500 font-bold">₹{totalPrice.toLocaleString()}</span>
                            </div>
                        )
                    }
                                
                                {
                                    wishlist.length > 0 ? (
                                        <div className="flex flex-wrap gap-6">
                                            {wishlist.map(item => (
                                                <div key={item._id} className="relative p-6">
                                                    <CompanyCard 
                                                        id={item._id}
                                                        name={item.title}
                                                        price={item.price}
                                                        images={item.images || []}
                                                        description={item.description}
                                                    />
                                                    <Button
                                                        onClick={() => handleRemove(item._id)}
                                                        className="w-8 h-8 absolute top-7 left-64 bg-rose-500/10 rounded-full text-rose-500 hover:bg-rose-500/30"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-400">No items in wishlist</p>
                                    )
                                }

            
                            </div>
                        </div>
                    </div>
            
        </>
    );
}
