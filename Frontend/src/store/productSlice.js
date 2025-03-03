import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({

    name: 'product',
    
     initialState : {
        products: [],
        loading: false,
        error: null
    },

    reducers: {
        
        setLoading:(state , action) => {
            state.loading = action.payload;
        },

        setProducts:(state , action) => {
            state.products = action.payload;
        },

        setError:(state , action) => {
            state.error = action.payload;
        }
    },

})

// Action creators are generated for each case reducer function
export const { setLoading , setProducts , setError } = productSlice.actions

export default productSlice.reducer;