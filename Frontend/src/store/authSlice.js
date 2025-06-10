import { createSlice } from '@reduxjs/toolkit';



export const counterSlice = createSlice({

    name: 'auth',
       initialState : {
        loading: false,
        user: {
            _id: null, // Frontend uses _id
            id: null,  // Backend returns id
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
        },        setUser:(state , action) => {
            if (action.payload) {
                // Normalize the user object to have both id and _id fields
                const normalizedUser = {
                    ...action.payload,
                    _id: action.payload._id || action.payload.id,
                    id: action.payload.id || action.payload._id
                };
                state.user = normalizedUser;
            } else {
                state.user = null;
            }
        },

        setError:(state , action) => {
            state.error = action.payload;
        }
    },

})

// Action creators are generated for each case reducer function
export const { setLoading , setUser , setError } = counterSlice.actions

export default counterSlice.reducer;