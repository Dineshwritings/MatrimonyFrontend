import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching profiles
const token = localStorage.getItem('token');
export const fetchProfiles = createAsyncThunk('profiles/fetchProfiles', async ({ page, limit }) => {
  const response = await axios.get(`http://localhost:5000/api/allprofiles?page=${page}&limit=${limit}`,{
    headers:{
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data; // Adjust as necessary based on your API response structure
});

const profileSlice = createSlice({
  name: 'profiles',
  initialState: {
    profiles: [],
    totalProfiles: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
  },
  reducers: {
    createProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createProfileSuccess: (state, action) => {
      state.loading = false;
      state.profiles.push(action.payload);
    },
    createProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload.profiles;
        state.totalProfiles = action.payload.totalProfiles;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  createProfileStart,
  createProfileSuccess,
  createProfileFailure,
} = profileSlice.actions;

export default profileSlice.reducer;
