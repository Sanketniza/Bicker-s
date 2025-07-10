
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const usePostAllWishlist = () => {
    
    const dispatch = useDispatch();
    const { addToWishList } = useSelector(store => store.wishlist);


        useEffect(() => {

            const postallwishlist = async () => {
                try {
                    const response = await axios.post('http://localhost:8000/api/v1/wishlist/add', {
                        withCredentials: true
                    });
    
                    // console.log("Response Data:", response.data);
    
                    if(response.data.success){
                        dispatch(addToWishList(response.data.success));
                    }
    
                } catch (error) {
                    console.error('Error fetching wishlist:', error);
                    toast.error("Failed to load wishlist", {
                        style: {
                            color: '#ef4444',
                            backgroundColor: '#09090B',
                            fontSize: '20px',
                            borderColor: '#ef4444',
                            padding: '10px 20px'
                        }
                    });
                }
            };
    
            postallwishlist();
        }, [dispatch]);
}


export default usePostAllWishlist;