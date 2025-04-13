/* 
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    likes: [],
    dislikes: [],
    totalLikes: 0,
    totalDislikes: 0,
    loading: false,
    error: null,
};

const likeSlice = createSlice({

    name: 'like',
    initialState,

    reducers: {
        setLikes: (state, action) => {
            state.likes = action.payload;
        },
        setDislikes: (state, action) => {
            state.dislikes = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setLikes, setDislikes, setLoading, setError } = likeSlice.actions;
export default likeSlice.reducer;   

     */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    likes: [],             // Stores liked product IDs
    dislikes: [],          // Stores disliked product IDs
    totalLikes: 0,         // Optional: Can be shown on UI
    totalDislikes: 0,
    loading: false,
    error: null,
};

const likeSlice = createSlice({
    
    name: 'like',
    initialState,

    reducers: {
        setLikes: (state, action) => {
            state.likes = action.payload;
            state.totalLikes = action.payload.length;
        },
        setDislikes: (state, action) => {
            state.dislikes = action.payload;
            state.totalDislikes = action.payload.length;
        },
        addLike: (state, action) => {
            if (!state.likes.includes(action.payload)) {
                state.likes.push(action.payload);
                state.totalLikes++;
            }
        },
        removeLike: (state, action) => {
            state.likes = state.likes.filter(id => id !== action.payload);
            state.totalLikes--;
        },
        addDislike: (state, action) => {
            if (!state.dislikes.includes(action.payload)) {
                state.dislikes.push(action.payload);
                state.totalDislikes++;
            }
        },
        removeDislike: (state, action) => {
            state.dislikes = state.dislikes.filter(id => id !== action.payload);
            state.totalDislikes--;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        toggleLoading: (state) => {
            state.loading = !state.loading;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        resetLikes: (state) => {
            state.likes = [];
            state.totalLikes = 0;
        },
        resetDislikes: (state) => {
            state.dislikes = [];
            state.totalDislikes = 0;
        },
    },
});

export const {
    setLikes,
    setDislikes,
    addLike,
    removeLike,
    addDislike,
    removeDislike,
    setLoading,
    toggleLoading,
    setError,
    resetLikes,
    resetDislikes,
} = likeSlice.actions;

export default likeSlice.reducer;
