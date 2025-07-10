import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ➡️ Fetch all ratings for a product
export const fetchRatings = createAsyncThunk(
    'rating/fetchRatings',
    async (productId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/rating/${productId}`);
        return response.data.ratings;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

// ➡️ Fetch average rating for a product
export const fetchAverageRating = createAsyncThunk(
    'rating/fetchAverageRating',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/rating/average/${productId}`, { withCredentials: true });
            return response.data.averageRating;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// ➡️ Add new rating
export const addRating = createAsyncThunk(
    'rating/addRating',
    async ({ productId, rating, comment }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.post(
                `http://localhost:8000/api/v1/rating/add`,
                {
                    productId,
                    rating,
                    comment, // ✅ No need to send userId — backend handles it
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );

            return response.data.rating; // ✅ Ensure consistent key
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Something went wrong');
        }
    }
);

// ➡️ Update existing rating
export const updateRating = createAsyncThunk(
    'rating/updateRating',
    async ({ ratingId, userId, rating, comment }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v1/rating/update`,
                { ratingId, userId, rating, comment },
                { withCredentials: true }
            );
            return response.data.rating;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// ➡️ Delete rating
export const deleteRating = createAsyncThunk(
    'rating/deleteRating',
    async ({ ratingId, userId }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/v1/rating/${ratingId}`,
                { data: { userId }, withCredentials: true }
            );

            console.log(response.data);
            return ratingId;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const ratingSlice = createSlice({
    name: 'rating',
    initialState: {
        ratings: [], // ✅ Initialize as an empty array
        averageRating: 0,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ✅ Fetch Ratings
            .addCase(fetchRatings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRatings.fulfilled, (state, action) => {
                state.loading = false;
                state.ratings = action.payload || [];
            })
            .addCase(fetchRatings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ Fetch Average Rating
            .addCase(fetchAverageRating.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAverageRating.fulfilled, (state, action) => {
                state.loading = false;
                state.averageRating = action.payload || 0;
            })
            .addCase(fetchAverageRating.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ Add Rating
            .addCase(addRating.fulfilled, (state, action) => {
                const existingRating = state.ratings.find(
                    (r) => r.userId === action.payload.userId
                );
                if (existingRating) {
                    // ✅ Update existing rating
                    Object.assign(existingRating, action.payload);
                } else {
                    // ✅ Add new rating
                    state.ratings.push(action.payload);
                }
            })

            // ✅ Update Rating
            .addCase(updateRating.fulfilled, (state, action) => {
                state.ratings = state.ratings.map((rating) =>
                    rating._id === action.payload._id ? action.payload : rating
                );
            })

            // ✅ Delete Rating
            .addCase(deleteRating.fulfilled, (state, action) => {
                state.ratings = state.ratings.filter((rating) => rating._id !== action.payload);
            });
    },
});

export default ratingSlice.reducer;
