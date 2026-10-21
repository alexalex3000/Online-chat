import Logo from "@/shared/ui/Logo/Logo";
import styles from "./Register.module.scss";
import RegisterForm from "@/features/Auth/register/ui/RegisterForm/RegisterForm";

export default function Register() {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <Logo noMargin/>
                <h1 className={styles.title}>Create Account!</h1>
                <p className={styles.subtitle}>Set up your profile and start connecting.</p>
            </div>
            <RegisterForm/>
        </div>
    );
}