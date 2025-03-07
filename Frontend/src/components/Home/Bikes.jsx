import { CompanyCardGrid } from '../Home/Bikes/CompanyCardGrid';
import { useSelector } from 'react-redux';
import useGetAllProduct from '@/hooks/useGetAllProduct';


export default function CompaniesPage() {
  useGetAllProduct(); // Fetch all products

  const { allProducts } = useSelector(state => state.product);
  // console.log("allProducts", allProducts);



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
                    <span className="text-[#6A38C2]">Bikes in Spotlight </span>
                </h1>
                    
                {
                    allProducts && allProducts.length > 0 ? (
                        <div className="relative" key={allProducts.id}>
                        <CompanyCardGrid product={allProducts} />
                        </div>
                    ) : (
                        <span className="text">No Products Found</span>
                    )
                }

                {/* {
                    allProducts && allProducts.length > 0 ? (

                         <span className="text">No Products Found</span>
                       
                    ) : (
                            <div>
                                {
                                    allProducts.map((product) => (
                                        <CompanyCardGrid key={product?.id} product={product} />
                                    ))
                                }
                            </div>
                    )
                } */}

                </div>
            </div>
        </div>
    );
}
