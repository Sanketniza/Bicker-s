import useGetAllProduct from '@/hooks/useGetAllProduct';
import { CompanyCardGrid } from '../Home/Bikes/CompanyCardGrid';
import { useSelector } from 'react-redux';


export default function CompaniesPage() {
    
 useGetAllProduct();
 

  const { allProducts } = useSelector(state => state.product);
  
  // Filter products with category "Electric bike"
  const electricProducts = allProducts.filter(product => product.category === 'Electric Bike');
  console.log("Electric products:", electricProducts.length);

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
            <span className="text-[#6A38C2]">Electric Bikes </span>
          </h1>
            
          {electricProducts.length > 0 ? (
            <div className="relative">
              <CompanyCardGrid product={electricProducts} />
            </div>
          ) : (
            <span className="text-xl text-gray-400">No Electric Bikes Found</span>
          )}
        </div>
      </div>
    </div>
  );
}