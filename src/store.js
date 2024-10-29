import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '../src/features/profileSlice';
import authReducer from '../src/features/authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        profiles: profileReducer,
    },
});

export default store;
