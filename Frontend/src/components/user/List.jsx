import { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { CompanyCard } from '../Home/Bikes/CompanyCard';
import { Label } from '../ui/label';
import { SlidersHorizontal, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
// import { sampleCompanies } from '../../JavaScript/bike'; // Import bike data
import Navbar from '../shared/Navbar';
import SearchBar from './Search'; // Import SearchBar component
import { useSelector } from 'react-redux';
import { CompanyCardGrid } from '../Home/Bikes/CompanyCardGrid';
import Footer from '../shared/footer';

export function List() {

  const { allProducts } = useSelector(state => state.product);
    // console.log("list allProducts : " , allProducts);
    // allProducts.forEach(product => {
    //     console.log("hello" , `${product._id}, 
    //                             ${product.title}, 
    //                             ${product.description}`, 
    //                             `${product.price}`, 
    //                             `${product.shopOwnerId}`);
    // });



    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 900000000 });
    const [showFilters, setShowFilters] = useState(false);

// 1. First, fix the useEffect dependency
useEffect(() => {
    // Update products whenever allProducts changes
    setProducts(allProducts);
}, [allProducts]); // Add allProducts as dependency

    useEffect(() => {
        // console.log('Current search query:', searchQuery);
    }, [searchQuery]);

  const filteredProducts = products.filter((product) => {
        const matchesSearch = 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        //   product.shopOwner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesPrice = 
        product.price >= priceRange.min && product.price <= priceRange.max;

        return matchesSearch && matchesPrice;
    });

    // console.log("Filtered Products: ", filteredProducts);

   

  return (
        <>
            <Navbar />             
               <div className="space-y-6 p-3 sm:p-6 max-w-7xl mx-auto mt-10 sm:mt-14">
                    <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-20 z-10 pb-4 mb-6 sm:mb-10">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="relative flex-1 w-full md:max-w-md">
                            <SearchBar
                                placeholder="Search by name, shop, or address..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full"
                            />
                            </div>
                            
                            <Button
                                variant="outline"
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center justify-center gap-2 w-full md:w-auto"
                            >
                            <SlidersHorizontal className="h-4 w-4" />
                                  Filters
                            </Button>
                        </div>

                    {
                        showFilters && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="mt-4 p-4 border rounded-lg bg-card shadow-lg"
                            >    
                               <div className="flex flex-wrap gap-4">
                                    <div className="flex flex-col gap-2 w-full sm:w-auto">
                                        <Label className="text-sm font-medium">Min Price</Label>
                                        <Input
                                            type="number"
                                            value={priceRange.min}
                                            onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                                            className="w-full sm:w-32"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 w-full sm:w-auto">
                                        <Label className="text-sm font-medium">Max Price</Label>
                                        <Input
                                            type="number"
                                            value={priceRange.max}
                                            onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                                            className="w-full sm:w-32"
                                        />
                                    </div>

                                </div>
                            </motion.div>
                        )
                    }
                    </div>                      {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mx-auto">                                {filteredProducts.map((product) => (
                                    <div className="relative flex justify-center w-full" key={product._id}>
                                        <CompanyCard
                                            id={product._id}
                                            name={product.title || "Unknown Product"}
                                            price={product.price || 0}
                                            images={product.images || []}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-6 sm:py-10">
                                <ShoppingBag className="mx-auto text-gray-400 w-16 h-16 sm:w-20 sm:h-20 mb-4" />
                                <span className="text-lg sm:text-xl text-gray-400">No Products Found</span>
                            </div>
                        )}
                    </div>       
                        
            
           

            <Footer />
        </>
    );
}

export default List;
