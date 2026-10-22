import styles from "../page.module.scss"
import Register from "@/widgets/Register/Register";

export default function RegisterPage() {
    return (
        <div className={styles.wrapper}>
            <Register/>
        </div>
    )
}