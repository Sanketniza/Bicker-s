import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({

    name: 'product',
    
     initialState : {

        singleProduct: null,
        allProducts: [],
        searchProductByText:"",

        allAdminJobs: [],
        searchedQuery:"",
        loading: false,
        error: null
    },

    reducers: {
        
        setSingleProduct:(state , action) => {
            state.singleProduct = action.payload;
        },

        setAllProducts:(state , action) => {
            state.allProducts = action.payload;
        },

        setSearchProductByText:(state , action) => {
            state.searchProductByText = action.payload;
        },

        setSearchedQuery:(state , action) => {
            state.searchedQuery = action.payload;
        },

        setAllAdminJobs:(state , action) => {
            state.allAdminJobs = action.payload;
        },
       

        setLoading:(state , action) => {
            state.loading = action.payload;
        },

        setError:(state , action) => {
            state.error = action.payload;
        }
    },

})

// Action creators are generated for each case reducer function
export const {  
                setLoading , 
                setProducts , 
                setError , 
                setSingleProduct , 
                setAllProducts , 
                setSearchProductByText , 
                setSearchedQuery , 
                setAllAdminJobs 
            } = productSlice.actions

export default productSlice.reducer;