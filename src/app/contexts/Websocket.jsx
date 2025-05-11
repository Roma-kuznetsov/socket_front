import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { logout, updateAuth } from "../store/authSlice/authSlice";
import { setHistoryMessages, setNewMessages, setPrivatMessage, setUsers } from "../store/chatSlice/chatSlice";
import { readCookie } from "../../shared/source/readCookie";
const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL;

export const WebsocketContext = createContext(null);
let socket;

export const WebsocketProvider = ({ children }) => {
    const [isSocketReady, setIsSocketReady] = useState(false);
    const token = useSelector(state => state.auth.token);
    const myId = useSelector(state => state.auth.id);
    const dispatch = useDispatch();

    useEffect(() => {
        const username = localStorage.getItem("username");
        const id = localStorage.getItem("id");
        const token = readCookie('token=');
        dispatch(updateAuth({ username, id, token }));
    }, [isSocketReady]);

    useEffect(() => {
        if (!token) return;

        const connectSocket = () => {
            socket = io(WS_BASE_URL, {
                extraHeaders: {
                    Authorization: `Bearer ${token}`
                },
                reconnection: true,
                reconnectionAttempts: Infinity,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                randomizationFactor: 0.5
            });

            socket.on('connect', () => {
                setIsSocketReady(true);
                console.log('WebSocket connected');
            });

            socket.on('disconnect', (reason) => {
                setIsSocketReady(false);
                console.log('WebSocket disconnected:', reason);
                if (reason === 'io server disconnect') {
                    socket.connect();
                }
            });

            socket.on('reconnect_attempt', (attempt) => {
                console.log(`Attempting to reconnect (${attempt})`);
            });

            socket.on('reconnect_failed', () => {
                console.log('Reconnection failed');
            });
        };

        connectSocket();

        return () => {
            if (socket) {
                socket.disconnect();
                socket = null;
            }
        };
    }, [token, dispatch]);

    // listeners
    const getAllRoomUsers = (payload) => {
        dispatch(setUsers(payload));
    };
    const getHistoryMessages = (payload) => {
        dispatch(setHistoryMessages(payload))
    };
    const getNewMessage = (payload) => {
        dispatch(setNewMessages(payload))
    };
    const getPrivateMessage = (payload) => {
        dispatch(setPrivatMessage({ ...payload, myId }))
    };
    const handleErrorSocket = () => {
        dispatch(logout())
    };

    // client senders
    const createRoom = (room) => {
        socket.emit("join_room", { room })
    };
    const sendMessage = (payload) => {
        socket.emit("message", { ...payload })
    };

    useEffect(() => {
        if (!socket) return
        socket.on("user_list", getAllRoomUsers);
        socket.on("room_message", getNewMessage);
        socket.on("private_message", getPrivateMessage);
        socket.on("message_history", getHistoryMessages);
        socket.on("typing", (payload) => { console.log(payload) });
        socket.on("error", (payload) => { console.log(payload) });
        socket.on("auth_error", handleErrorSocket); //relog
        return () => {
            if (socket) {
                socket.off("user_list")
                socket.off("room_message")
                socket.off("private_message")
                socket.off("message_history")
                socket.off("typing")
                socket.off("error")
                socket.off("auth_error")
            }
        }
    }, [socket, token]);

    return (
        <WebsocketContext.Provider value={{ createRoom, sendMessage, isSocketReady }}>
            {children}
        </WebsocketContext.Provider>
    );
};