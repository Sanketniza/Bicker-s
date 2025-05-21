import { createSlice } from '@reduxjs/toolkit';



export const counterSlice = createSlice({

    name: 'auth',
    
     initialState : {
        loading: false,
        user: {
            _id: null,
            fullname: '',
            email: '',
            phone: '',
            address: {
                street: '',
                city: '',
                state: '',
                zip: '',
                country: ''
            },
            bio: '',
            socialMediaLinks: {
                facebook: '',
                twitter: '',
                instagram: '',
                linkedin: ''
            },
            paymentInfo: {
                bankAccount: '',
                upiId: ''
            },
            profile: '',
            role: 'user'
        },
        error: null
    },

    reducers: {
        
        setLoading:(state , action) => {
            state.loading = action.payload;
        },

        setUser:(state , action) => {
            state.user = action.payload;
        },

        setError:(state , action) => {
            state.error = action.payload;
        }
    },

})

// Action creators are generated for each case reducer function
export const { setLoading , setUser , setError } = counterSlice.actions

export default counterSlice.reducer;