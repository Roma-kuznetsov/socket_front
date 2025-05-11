import { memo } from "react";
import style from "./Button.module.css";

const Button = ({ className, children, ...props }) => {
    return <button className={className || style.default} {...props}>{children}</button>
};


export default memo(Button);