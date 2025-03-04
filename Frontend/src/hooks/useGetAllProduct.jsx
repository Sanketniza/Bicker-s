import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllProduct = () => {

    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.product);

    useEffect(() => {

       const fetchAllProduct = async () => {
            try {

                const res = await fetch('http://localhost:5000/api/product/getAllProduct');
                 const data = await res.json();

                    dispatch({type:'SET_ALL_PRODUCT',payload:data});
            

            }catch (e) {
                console.log(e);
            }
        }

        fetchAllProduct();

      


        

    }, [searchedQuery]);
}

export default useGetAllProduct;