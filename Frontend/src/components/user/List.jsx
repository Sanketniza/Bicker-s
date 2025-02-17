import { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { CompanyCard } from '../Home/Bikes/CompanyCard';
import { Label } from '../ui/label';
import { SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { sampleCompanies } from '../../JavaScript/bike'; // Import bike data
import "../../css/list.css";
import Navbar from '../shared/Navbar';
import SearchBar from './Search'; // Import SearchBar component

export function List() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Fetch bike data from bike.js
    setProducts(sampleCompanies);
  }, []);

  useEffect(() => {
    console.log('Current search query:', searchQuery);
  }, [searchQuery]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shopOwner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shopOwner.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPrice = 
      product.price >= priceRange.min && product.price <= priceRange.max;

    return matchesSearch && matchesPrice;
  });

  return (
    <>
      <Navbar />

      <div className="space-y-6 p-6 max-w-7xl mx-auto">
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-20 z-10 pb-4 mb-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <SearchBar
                placeholder="Search by name, shop, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 p-4 border rounded-lg bg-card shadow-lg"
            >
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium">Min Price</Label>
                  <Input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                    className="w-32"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium">Max Price</Label>
                  <Input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-32"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id} 
              className="relative group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <CompanyCard
                id={product.id}
                name={product.name}
                images={product.images}
                price={product.price}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

export default List;