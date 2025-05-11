import style from "./ContactLink.module.css"

const ContactLink = ({ name, isPrivate, lastMessage, className, ...props }) => {
    return (
        <div className={style.container + " " + className} {...props}>
            <div className={style.nameBlock}>
                <div>{name}</div>
            </div>

            {lastMessage && isPrivate &&
                <div>Last: {lastMessage}</div>
            }
            {/* <div>фффф</div> */}
        </div>
    );
};

export default ContactLink;