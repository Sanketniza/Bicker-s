import { setAllProducts, setLoading } from "@/store/productSlice";
import { Product_API_END_POINT } from "@/utils/api";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const useGetUserProducts = () => {
    
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.product);
    const { user } = useSelector(store => store.auth);

    useEffect(() => {
        const fetchUserProducts = async () => {
            try {
                // Set loading state to true at the start of fetching
                dispatch(setLoading(true));
                
                if (!user || (!user.id && !user._id)) {
                    // console.log("User not logged in or ID not available");
                    // Even if user is not available, set products to empty array and loading to false
                    dispatch(setAllProducts([]));
                    dispatch(setLoading(false));
                    return;
                }

                // Use the dedicated endpoint for getting the current user's products
                const res = await axios.get(`${Product_API_END_POINT}/my-products`, {
                    withCredentials: true
                });

                if (res.data.success) {                    const products = res.data.products;
                    
                    // Log a product to check company data structure
                    if (products.length > 0) {
                        // console.log("Sample product with company data:", products[0]);
                    }
                    
                    // Apply search filtering if needed
                    const filteredProducts = searchedQuery 
                        ? products.filter(product => 
                            product.title && product.title.toLowerCase().includes(searchedQuery.toLowerCase())
                          )
                        : products;
                    
                    // console.log(`Found ${filteredProducts.length} products for the current user`);
                    dispatch(setAllProducts(filteredProducts));
                } else {
                    throw new Error(res.data.message || "Failed to fetch products");
                }
            } catch (e) {
                console.error("Error fetching user products:", e);
                toast.error("Failed to fetch your products");
                // Dispatch empty array to clear any previous products
                dispatch(setAllProducts([]));
            } finally {
                // Always set loading to false when done, whether successful or not
                dispatch(setLoading(false));
            }
        };

        fetchUserProducts();
    }, [dispatch, searchedQuery, user]);
};

export default useGetUserProducts;
