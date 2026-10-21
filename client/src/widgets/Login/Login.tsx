import Logo from "@/shared/ui/Logo/Logo";
import LoginForm from "@/features/Auth/login/ui/LoginForm/LoginForm";
import styles from "./Login.module.scss";

export default function Login() {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <Logo noMargin/>
                <h1 className={styles.title}>Welcome Back!</h1>
                <p className={styles.subtitle}>Log in to continue the conversation.</p>
            </div>
            <LoginForm />
        </div>
    );
}