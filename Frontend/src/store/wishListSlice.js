
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishList: [],
  loading: false,
  error: null
};

const wishListSlice = createSlice({
    name: "wishlist",
    initialState,

    reducers: {
        
        addToWishList: (state, action) => {
            state.wishList.push(action.payload);
        },

        removeFromWishList: (state, action) => {
            state.wishList = state.wishList.filter(
                (item) => item.id !== action.payload
            );
        },

        clearWishList: (state) => {
            state.wishList = [];
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },

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
