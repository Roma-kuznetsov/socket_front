import { configureStore } from '@reduxjs/toolkit'
import chatSlice from './chatSlice/chatSlice'
import authSlice from './authSlice/authSlice'


export default configureStore({
    reducer: {
        chat: chatSlice,
        auth: authSlice
    },
})