import styles from "./Section.module.scss"
import {ReactNode} from "react";

interface Props{
    children: ReactNode;
    small?: boolean;
}

export default function Section({children, small}: Props) {
    return (
        <section className={small ? styles.small : styles.section}>
            {children}
        </section>
    )
}