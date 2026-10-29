import Login from "@/widgets/Login/Login";
import styles from "../page.module.scss"

export default async function LoginPage() {
    return (
        <div className={styles.wrapper}>
            <Login />
        </div>
    );
}