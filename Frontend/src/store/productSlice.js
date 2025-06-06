// productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allProducts: [],
  singleProduct: null,
  searchProductByText: "",
  searchedQuery: "",
  loading: false,
  error: null
};

const productSlice = createSlice({

    name: 'product',
    
    initialState,

    reducers: {
        setAllProducts: (state, action) => {
            state.allProducts = action.payload || [];
        },
        setSingleProduct: (state, action) => {
            state.singleProduct = action.payload || null;
        },
        clearSingleProduct: (state) => {
            state.singleProduct = null;
        },
        setSearchProductByText: (state, action) => {
            state.searchProductByText = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },

        removeProduct: (state, action) => {
            state.allProducts = state.allProducts.filter(product => product._id !== action.payload);
                if (state.singleProduct?._id === action.payload) {
                state.singleProduct = null;
            }
        }
    }
});

export const { 
  setAllProducts,
  setSingleProduct,
  clearSingleProduct,
  setSearchProductByText,
  setSearchedQuery,
  setLoading,
  setError,
  clearError,
  removeProduct
} = productSlice.actions;

export default productSlice.reducer;