import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = createAsyncThunk(
    'authSlice/register',
    async (payload, thunkAPI) => {
        try {
            return await axios.post(`${API_BASE_URL}/api/auth/register`, { ...payload });
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const login = createAsyncThunk(
    'authSlice/login',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { ...payload });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        name: null,
        id: null,
        token: null,
        isLoading: false,
        errorMessage: "",
    },
    reducers: {
        logout: (state) => {
            document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            state.token = null;
            localStorage.removeItem('username');
            localStorage.removeItem('id');
            state.name = null
            state.id = null
        },
        updateAuth: (state, action) => {
            state.name = action.payload.username
            state.id = action.payload.id
            state.token = action.payload.token
        },
    },

    extraReducers: (builder) => {
        builder
            //login
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem('username', action.payload.username);
                localStorage.setItem('id', action.payload.id);
                state.token = action.payload.access_token;
                state.isLoading = false;
                document.cookie = `token=${action.payload.access_token}; path=/; Secure; max-age=${24 * 60 * 60}; SameSite=Strict`;
            })
            .addCase(login.rejected, (state, action) => {
                state.errorMessage = action.payload
                state.isLoading = false;
            })
            // register
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.errorMessage = action.payload
                state.isLoading = false;
            })
    },
})

export const { logout, updateAuth } = authSlice.actions

export default authSlice.reducer