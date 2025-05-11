import { createSlice } from '@reduxjs/toolkit'
import { logout } from '../authSlice/authSlice';

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        users: [],
        messages: [],
        privateMessages: {}
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload
        },
        setHistoryMessages: (state, action) => {
            state.messages = action.payload;
        },
        setNewMessages: (state, action) => {
            state.messages.push(action.payload)
        },
        setPrivatMessage: (state, action) => {
            // privateMessages format
            // {
            //     chatId1:[privateMessage, ...]
            //     chatId2:[privateMessage, ...]
            // }
            if (state.privateMessages.hasOwnProperty(action.payload.from)) {
                state.privateMessages[action.payload.from] = [...state.privateMessages[action.payload.from], action.payload]
            } else if (state.privateMessages.hasOwnProperty(action.payload.to)) {
                state.privateMessages[action.payload.to] = [...state.privateMessages[action.payload.to], action.payload]
            } else {
                if (action.payload.from === action.payload.myId) {
                    state.privateMessages[action.payload.to] = [action.payload]
                } else {
                    state.privateMessages[action.payload.from] = [action.payload]
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logout, (state) => {
            state.messages = [];
            state.users = [];
            state.privateMessages = {};
        });
    }
})

// Action creators are generated for each case reducer function
export const { setUsers, setHistoryMessages, setNewMessages, setPrivatMessage } = chatSlice.actions

export default chatSlice.reducer