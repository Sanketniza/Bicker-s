
import { useState, useEffect } from 'react';
import { sampleCompanies } from '../../JavaScript/bike';
import { CompanyCard } from '../Home/Bikes/CompanyCard';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Navbar from '../shared/Navbar';
import { toast } from 'react-toastify';

export default function WishlistPage() {
  const [favorites, setFavorites] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoriteBikes = sampleCompanies.filter(bike => savedFavorites.includes(bike.id));
    setFavorites(favoriteBikes);
    calculateTotal(favoriteBikes);
  };

  const calculateTotal = (bikes) => {
    const total = bikes.reduce((sum, bike) => sum + bike.price, 0);
    setTotalPrice(total);
  };

  const handleRemove = (bikeId) => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = savedFavorites.filter(id => id !== bikeId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    loadFavorites();
    toast({
      title: "Removed from wishlist",
      description: "The bike has been removed from your wishlist.",
    });
  };

  return (
        <>
            <Navbar />
       
            <div className="min-h-screen py-12 bg-[#09090B]">
                <div className="mx-4 md:mx-10">
                    <div className="relative p-6 md:p-10 mx-auto my-20 border rounded-lg shadow-2xl border-emerald-500/30 max-w-7xl bg-black/20 backdrop-blur-sm">
                    {/* Glow effect */}
                    <div 
                        className="absolute inset-0 rounded-lg opacity-30 blur-xl"
                        style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(1, 151, 57, 0.3), transparent 80%)`
                        }}
                    />

                    <div className="relative">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-0">
                            Your Wishlist
                        </h1>
                        <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                            <p className="text-lg md:text-xl text-white">
                            Total: <span className="font-bold">${totalPrice.toLocaleString()}</span>
                            </p>
                        </div>
                        </div>

                        {favorites.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                            {favorites.map((bike) => (
                            <motion.div
                                key={bike.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="relative"
                            >
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="relative left-60 top-10 z-10 text-yellow-500 hover:text-red-600" 
                                    onClick={() => handleRemove(bike.id)}
                                >
                                <X className="h-4 w-4" />
                                </Button>
                                <CompanyCard
                                    id={bike.id}
                                    name={bike.name}
                                    images={bike.images}
                                    price={bike.price}
                                />
                            </motion.div>
                            ))}
                        </div>
                        ) : (
                        <div className="text-center py-12">
                            <p className="text-xl text-gray-400">
                            Your wishlist is empty. Start adding some bikes!
                            </p>
                        </div>
                        )}
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}
