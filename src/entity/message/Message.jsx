import { formatTime } from "../../shared/source/formatTime";
import style from "./Message.module.css";


const Message = ({ time, text, fromMe, sender }) => {
    return (
        <div className={`${style.message} ${fromMe ? style.currentUser : style.otherUser}`}>
            <div className={`${style.messageInfo} ${fromMe ? style.currentUserInfo : style.otherUserInfo}`}>
                {/* {from !== currentUser && nameMap[from] && `${nameMap[from]}, `}
                {!nameMap[from] && "Deleted user"} */}
                {!fromMe && sender}
                {time}
            </div>
            {text}
        </div>
    );
};

export default Message;