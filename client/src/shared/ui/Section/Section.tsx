import styles from "./Section.module.scss"
import {ReactNode} from "react";

interface Props{
    children: ReactNode;
    small?: boolean;
    className?: string;
}

export default function Section({children, small, className}: Props) {
    return (
        <section className={`${small ? styles.small : styles.section} ${className}`}>
            {children}
        </section>
    )
}