import { CompanyCardGrid } from '../Home/Bikes/CompanyCardGrid';
import { useSelector } from 'react-redux';
import useGetAllProduct from '@/hooks/useGetAllProduct';
import { Bike } from 'lucide-react';

export default function CompaniesPage() {
 useGetAllProduct(); // Fetch all products


  const { allProducts } = useSelector(state => state.product);
  
  // Filter products with category "bike"
  const bikeProducts = allProducts.filter(product => product.category === 'bike' || product.category === 'other');
  console.log("Bike products:", bikeProducts.length);

  return (
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

                <h1 className="relative text-4xl font-bold mb-12 text-white">
                    <span className="text-[#6A38C2]">Sport & Normal Bikes </span>
                </h1>
                    
                {
                    bikeProducts.length > 0 ? (
                        <div className="relative">
                        <CompanyCardGrid product={bikeProducts} />
                        </div>                    ) : (
                        <div className="text-center py-10">
                            <Bike className="mx-auto text-gray-400 w-20 h-20 mb-4" />
                            <span className="text-xl text-gray-400">No Bikes Found</span>
                        </div>
                    )
                }
                </div>
            </div>
        </div>
    );
}