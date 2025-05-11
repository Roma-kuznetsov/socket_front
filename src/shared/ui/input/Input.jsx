import { memo } from "react";
import style from "./Input.module.css";

const Input = ({className, ...props}) => {
    return <input {...props} className={className + " " + style.default}  />
};

export default memo(Input);