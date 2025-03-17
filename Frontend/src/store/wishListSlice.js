import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
    name: 'wishlist',

    initialState: {
        wishlist: [], // ✅ Ensure initial state is defined as an array
        loading: false,
        error: null
    },

    reducers: {
        
        addToWishList: (state, action) => {
            const newItems = Array.isArray(action.payload) ? action.payload : [action.payload];
            newItems.forEach((item) => {
                if (!state.wishlist.some(existingItem => existingItem._id === item._id)) {
                    state.wishlist.push(item);
                }
            });
        },

        removeFromWishList: (state, action) => {
            state.wishlist = state.wishlist.filter(item => item._id !== action.payload);
        },
        
        clearWishList: (state) => {
            state.wishlist = [];
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },

        // ✅ Handle hydration event to avoid undefined state
        _persisted: (state, action) => {
            state.wishlist = action.payload?.wishlist || [];
        }
    },
});

export const {
    addToWishList,
    removeFromWishList,
    clearWishList,
    setLoading,
    setError,
} = wishListSlice.actions;

export default wishListSlice.reducer;
