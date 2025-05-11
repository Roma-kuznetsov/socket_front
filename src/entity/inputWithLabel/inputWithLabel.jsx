import { memo } from "react";
import style from "./inputWithLabel.module.css"

const InputWithLabel = ({ label, className, children, ...props }) => {
    return (
        <div className={style.default || className} {...props}>
            <label>
                {label}
                {children}
            </label>
        </div>
    )
}

export default memo(InputWithLabel);