
import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { CompanyCard } from '../Home/Bikes/CompanyCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Star } from 'lucide-react';
import { toast } from 'react-toastify';
import {  Search, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';



export function List({ products }) {
    
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shopOwner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shopOwner.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPrice = 
      product.price >= priceRange.min && product.price <= priceRange.max;

    return matchesSearch && matchesPrice;
  });

  const handleSubmitReview = () => {
    // Here you would typically make an API call to save the review
    toast.success({
      title: "Review Submitted",
      description: `Thank you for rating ${selectedProduct.name}!`,
    });
    setRating(0);
    setReview('');
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
    <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-20 z-10 pb-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, shop, or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 h-10 rounded-full border-2 focus:border-primary"
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
      {filteredProducts?.map((product) => (
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
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setSelectedProduct(product)}
              >
                Rate & Review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center">Rate & Review - {product.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 p-4">
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`cursor-pointer w-8 h-8 transition-colors ${
                        star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
                <Textarea
                  placeholder="Write your review..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
                <Button 
                  onClick={handleSubmitReview}
                  className="w-full"
                >
                  Submit Review
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      ))}
    </div>
  </div>
  );
}

export default List;


