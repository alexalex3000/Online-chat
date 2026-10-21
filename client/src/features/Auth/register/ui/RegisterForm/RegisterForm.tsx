import styles from "./RegisterForm.module.scss";
import Input from "@/shared/ui/Input/Input";
import FullButton from "@/shared/ui/FullButton/FullButton";
import { ChevronRight } from "lucide-react";

export default function RegisterForm() {
    return (
        <form className={styles.form}>
            <div className={styles.nameGroup}>
                <div className={styles.row}>
                    <Input
                        label="Name"
                        placeholder="John"
                    />
                    <Input
                        label="Surname"
                        placeholder="Doe"
                    />
                </div>
                <Input
                    before="@"
                    label="Username"
                    placeholder="johndoe"
                />
            </div>
            <Input
                type="email"
                label="Email address"
                placeholder="you@example.com"
            />
            <Input
                type="password"
                label="Password"
                placeholder="••••••••"
            />
            <Input
                type="password"
                label="Confirm Password"
                placeholder="••••••••"
            />
            <FullButton>
                <span className={styles.buttonContent}>
                    Register <ChevronRight size={18} strokeWidth={2} />
                </span>
            </FullButton>
        </form>
    );
}