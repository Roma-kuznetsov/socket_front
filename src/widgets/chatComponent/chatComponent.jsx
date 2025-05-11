import { memo, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Message from '../../entity/message/Message';
import { formatTime } from '../../shared/source/formatTime';
import Button from '../../shared/ui/button/Button';
import Input from '../../shared/ui/input/input';
import style from './chatComponent.module.css';


const ChatComponent = ({ sendMessage, urlParams }) => {

    const messages = useSelector(state => state.chat.messages);
    const privateMessages = useSelector(state => state.chat.privateMessages);
    const currentUser = useSelector(state => state.auth.id);
    const users = useSelector(state => state.chat.users);

    const [newMessage, setNewMessage] = useState('');
    const [nameMap, setNameMap] = useState({});
    const messagesEndRef = useRef(null);

    // да это кринж, но мне не приходят имена отправителей в messages по этому будем искать по id юзеров в руме
    useEffect(() => {
        const tableUsers = {};
        users && users.map((user) => {
            tableUsers[user.userId] = user.username
        });
        setNameMap(tableUsers);
    }, [users]);

    const getCurrentMessages = () => {
        if (urlParams.type === "private") {
            return privateMessages[urlParams.roomId] || [];
        };
        return messages;
    };

    useEffect(() => {
        scrollToBottom();
    }, [getCurrentMessages()]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;
        const createMessage = {
            text: newMessage,
            room: urlParams.type === "private" ? undefined : urlParams.roomId,
            to: urlParams.type === "private" ? urlParams.roomId : undefined
        };
        sendMessage(createMessage);
        setNewMessage('');
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className={style.container}>
            <div className={style.chatContainer}>

                <div className={style.messagesContainer}>
                    {getCurrentMessages().map((message, index) => <Message
                        key={index}
                        sender={nameMap[message.from] || "N/A "}
                        time={formatTime(message.timestamp)}
                        text={message.text}
                        fromMe={message.from === currentUser}
                    />)}
                    <div ref={messagesEndRef} />
                </div>

                <form className={style.formContainer} onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        className={style.input}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Напишите сообщение..."
                    />
                    <Button
                        type="submit"
                        className={style.button}
                        disabled={!newMessage.trim()}>
                        Отправить
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default memo(ChatComponent);