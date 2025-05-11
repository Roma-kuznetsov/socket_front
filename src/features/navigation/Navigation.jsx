import { memo } from "react";
import ContactLink from "../../entity/contactItem/ContactLink";

const Navigation = ({ users, privateMessages, handlePrivateMessage }) => {
    return (
        <>
            <p>USERS IN ROOM</p>
            {users.map((user) => <ContactLink
                key={user.userId}
                name={user.username}
                isPrivate={false}
                onClick={() => { handlePrivateMessage(user.userId, true) }}
            />)}

            <p>NEW MESSAGES:</p>
            {Object.keys(privateMessages).map((dialogId) => <ContactLink
                key={dialogId}
                name={`User:${dialogId}`}
                isPrivate={true}
                lastMessage={privateMessages[dialogId].at(-1).text}
                onClick={() => { handlePrivateMessage(dialogId, true) }}
            />)}
        </>
    );
};


export default memo(Navigation);