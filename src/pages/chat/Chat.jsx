import { useCallback, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { WebsocketContext } from "../../app/contexts/Websocket";
import { logout } from "../../app/store/authSlice/authSlice";
import Navigation from "../../features/navigation/Navigation";
import RoomsManager from "../../features/roomsManager/RoomsManager";
import Button from "../../shared/ui/button/Button";
import ChatComponent from "../../widgets/chatComponent/chatComponent";
import AuthModal from "../../widgets/modal/authModal";
import style from "./Chat.module.css";


const Chat = () => {
    const { createRoom, sendMessage, isSocketReady } = useContext(WebsocketContext);

    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();

    const token = useSelector(state => state.auth.token);
    const users = useSelector(state => state.chat.users);
    const privateMessages = useSelector(state => state.chat.privateMessages);

    useEffect(() => {
        if (!isSocketReady) return;
        createRoom(params.roomId);
    }, [params.roomId, isSocketReady]);

    const handleJoinRoom = useCallback((room, isPrivate) => {
        history.push(`/chat/${isPrivate ? "private/" : ""}${room}`);
    });

    if (!token) {
        return <AuthModal />
    };

    if (!isSocketReady) {
        return <div>Нет соединения, скоро всё востановим</div>
    };

    return (
        <main className={style.container}>
            <RoomsManager handleJoinRoom={handleJoinRoom} />
            <ChatComponent sendMessage={sendMessage} urlParams={params} />
            <div className={style.users}>
                <Navigation users={users} privateMessages={privateMessages} handlePrivateMessage={handleJoinRoom} />
                <Button onClick={() => { dispatch(logout()) }}>logout</Button>
            </div>
        </main>
    );
};


export default Chat;