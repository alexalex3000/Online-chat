import { X } from "lucide-react";
import styles from "./XButton.module.scss";

interface Props{
    size?: number;
    onClick?: () => void;
    className?: string;
}

export default function XButton({size = 20, onClick, className}: Props) {
    return (
        <button
            type={"button"}
            onClick={onClick}
            className={`${styles.closeButton} ${className}`}
        >
            <X size={size} strokeWidth={2.2} />
        </button>
    );
}