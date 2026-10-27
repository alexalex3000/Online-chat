import Logo from "@/shared/ui/Logo/Logo";
import styles from "./Register.module.scss";
import RegisterForm from "@/features/Auth/register/ui/RegisterForm/RegisterForm";
import Link from "next/link";

export default function Register() {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <Logo noMargin/>
                <h1 className={styles.title}>Create Account!</h1>
                <p className={styles.subtitle}>Set up your profile and start connecting.</p>
                <p className={styles.switchText}>
                    Already have an account?{" "}
                    <Link href="/login" className={styles.link}>
                        Sign in
                    </Link>
                </p>
            </div>
            <RegisterForm/>
        </div>
    );
}