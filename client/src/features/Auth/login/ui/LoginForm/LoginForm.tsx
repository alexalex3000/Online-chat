"use client";

import Input from "@/shared/ui/Input/Input";
import FullButton from "@/shared/ui/FullButton/FullButton";
import { ChevronRight } from "lucide-react";
import styles from "./LoginForm.module.scss";

export default function LoginForm() {
    return (
        <form className={styles.form}>
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
            <FullButton>
                <span className={styles.buttonContent}>
                    Log In <ChevronRight size={18} strokeWidth={2} />
                </span>
            </FullButton>
        </form>
    );
}