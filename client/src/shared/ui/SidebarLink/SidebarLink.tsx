import { ReactNode } from "react";
import styles from "./SidebarLink.module.scss";

interface Props {
    children: ReactNode;
    selected?: boolean;
    onClick?: () => void;
}

export default function SidebarLink({children, selected = false, onClick}: Props) {
    return (
        <div
            onClick={onClick}
            className={`${styles.link} ${selected ? styles.selected : ""}`}
        >
            {children}
        </div>
    );
}