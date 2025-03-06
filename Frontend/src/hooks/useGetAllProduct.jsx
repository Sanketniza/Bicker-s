
import { setAllProducts } from "@/store/productSlice";
import { Product_API_END_POINT } from "@/utils/api";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const useGetAllProduct = () => {

    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.product);

    useEffect(() => {

       const fetchAllProduct = async () => {

            try {

                const res = await axios.get(`${Product_API_END_POINT}/all?keyword=${searchedQuery}` , {
                    withCredentials: true
                });

                if(res.data.success) {
                    dispatch(setAllProducts(res.data.products));
                }
            

            }catch (e) {
                console.log(e);
                toast.error("Failed to fetch all products");
            }
        }

        fetchAllProduct();

    }, []);
}

export default useGetAllProduct;