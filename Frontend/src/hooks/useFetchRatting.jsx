import { setRatings } from "@/store/ratingSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner";



const useFetchRatting = () => {

    const dispatch = useDispatch()
    const { rating } = useSelector(state => state.rating)    

    useEffect(() => {
        const fetchRatting = async () => {
            try {

                const response = await axios.get(`http://localhost:8000/api/v1/ratting/${rating.productId}`, {
                    withCredentials: true
                });

                console.log("Response Data:", response.data);

                if(response.data.success){
                    dispatch(setRatings(response.data.ratting));
                } else {
                    throw new Error(response.data.message || "Failed to fetch ratting");
                }

            } catch (error) {
                console.error("Error fetching ratting:", error);
                toast.error("Failed to fetch ratting", {
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

        fetchRatting();

    }, [dispatch]);
   
}

export default useFetchRatting

