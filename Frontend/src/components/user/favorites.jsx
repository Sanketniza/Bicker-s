import { useState, useEffect } from 'react';
import { sampleCompanies } from '../../JavaScript/bike';
import { CompanyCard } from '../Home/Bikes/CompanyCard';
import Navbar from '../shared/Navbar';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoriteBikes = sampleCompanies.filter(bike => savedFavorites.includes(bike.id));
    setFavorites(favoriteBikes);
  }, []);

  return (

        <>
             <Navbar />
        
            <div className="min-h-screen py-12 bg-[#09090B]">

                <div className="mx-10">
                    <div className="relative p-10 mx-auto my-20 border rounded-lg shadow-2xl border-emerald-500/30 max-w-7xl bg-black/20 backdrop-blur-sm">
                    {/* Glow effect */}
                    <div 
                        className="absolute inset-0 rounded-lg opacity-30 blur-xl"
                        style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3), transparent 80%)`
                        }}
                    />

                    <h1 className="relative text-4xl font-bold mb-12 text-white">
                        Your Favorite Bikes
                    </h1>

                    <div className="relative">
                        {favorites.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                            {favorites.map((bike) => (
                            <CompanyCard
                                key={bike.id}
                                id={bike.id}
                                name={bike.name}
                                images={bike.images}
                                price={bike.price}
                            />
                            ))}
                        </div>
                        ) : (
                        <div className="text-center py-12">
                            <p className="text-xl text-gray-400">
                            No favorite bikes yet. Start adding some bikes to your wishlist!
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
