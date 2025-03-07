import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setSingleProduct } from '@/store/productSlice';
import { toast } from 'sonner';
import { Product_API_END_POINT } from '@/utils/api';

const useGetSingleProduct = (productId) => {
  const dispatch = useDispatch();
  const { singleProduct } = useSelector(state => state.product);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await axios.get(`${Product_API_END_POINT}/all/${productId}`, {
          withCredentials: true
        });

        if (response.data.success) {
          dispatch(setSingleProduct(response.data.product));
        } else {
          throw new Error(response.data.message || "Failed to fetch product details!");
        }
      } catch (e) {
        console.error(e);
        toast.error("Failed to fetch product details!", {
          style: {
            color: '#10B981',
            backgroundColor: '#09090B',
            fontSize: '20px',
            borderColor: '#10B981',
            padding: '10px 20px'
          }
        });
      }
    };

    fetchSingleProduct();
  }, [productId, dispatch]);

  return singleProduct;
};

export default useGetSingleProduct;
