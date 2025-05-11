import style from "./Message.module.css";

const Message = ({ time, text, fromMe, sender }) => {
    return (
        <div className={`${style.message} ${fromMe ? style.currentUser : style.otherUser}`}>
            <div className={`${style.messageInfo} ${fromMe ? style.currentUserInfo : style.otherUserInfo}`}>
                {!fromMe && sender}
                {time}
            </div>
            {text}
        </div>
    );
};

export default Message;