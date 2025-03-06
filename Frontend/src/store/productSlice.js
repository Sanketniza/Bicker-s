import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        singleProduct: null,
        allProducts: [],
        searchProductByText: "",
        searchedQuery: "",
        loading: false,
        error: null
    },
    reducers: {
        setSingleProduct: (state, action) => {
            state.singleProduct = action.payload;
        },
        setAllProducts: (state, action) => {
            state.allProducts = action.payload || []; // Ensure allProducts is always an array
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
        }
    },
});

export const {
    setLoading,
    setProducts,
    setError,
    setSingleProduct,
    setAllProducts,
    setSearchProductByText,
    setSearchedQuery
} = productSlice.actions;

export default productSlice.reducer;