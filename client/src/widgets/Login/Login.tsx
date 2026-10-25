import Logo from "@/shared/ui/Logo/Logo";
import LoginForm from "@/features/Auth/login/ui/LoginForm/LoginForm";
import styles from "./Login.module.scss";
import Link from "next/link";

export default function Login() {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <Logo noMargin/>
                <h1 className={styles.title}>Welcome Back!</h1>
                <p className={styles.subtitle}>Log in to continue the conversation.</p>
                <p className={styles.switchText}>
                    Don't have an account?{" "}
                    <Link href="/register" className={styles.link}>
                        Create one
                    </Link>
                </p>
            </div>
            <LoginForm />
        </div>
    );
}