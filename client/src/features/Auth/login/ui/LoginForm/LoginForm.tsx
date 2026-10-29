"use client";

import { useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/shared/ui/Input/Input";
import FullButton from "@/shared/ui/FullButton/FullButton";
import { ChevronRight } from "lucide-react";
import styles from "./LoginForm.module.scss";
import { loginDrop } from "@/entities/user/api/login";
import ErrorMessage from "@/shared/ui/ErrorMessage/ErrorMessage";

interface FormErrors {
    server?: string;
    email?: string;
    password?: string;
}

interface StateType {
    success: boolean;
    error?: FormErrors;
    fields?: FormErrors;
}

export default function LoginForm() {
    const router = useRouter();

    const [state, formAction, isPending] = useActionState<StateType, FormData>(
        async (previousState, formData) => {
            const email = (formData.get("email") as string) || "";
            const password = (formData.get("password") as string) || "";

            const fields = { email, password };

            const result = await loginDrop({
                email,
                password,
            });

            if (result?.serverError) {
                return {
                    success: false,
                    error: {
                        server:
                            typeof result.serverError === "string"
                                ? result.serverError
                                : "Login failed. Please try again.",
                    },
                    fields,
                };
            }

            if (result?.validationErrors) {
                return {
                    success: false,
                    error: {
                        email: result.validationErrors.email?._errors?.[0],
                        password: result.validationErrors.password?._errors?.[0],
                    },
                    fields,
                };
            }

            return {
                success: true,
            };
        },
        { success: false }
    );

    useEffect(() => {
        if (state.success) {
            router.push("/chat");
        }
    }, [state.success, router]);

    return (
        <div className={styles.wrap}>
            <ErrorMessage message={state?.error?.server} />
            <form className={styles.form} action={formAction}>
                <Input
                    type="email"
                    label="Email address"
                    name="email"
                    defaultValue={state?.fields?.email}
                    errorMessage={state.error?.email}
                    placeholder="you@example.com"
                />
                <Input
                    type="password"
                    label="Password"
                    placeholder="••••••••"
                    name="password"
                    defaultValue={state?.fields?.password}
                    errorMessage={state.error?.password}
                />
                <FullButton disabled={isPending}>
                    <span className={styles.buttonContent}>
                        {isPending ? "Logging in..." : "Log In"}{" "}
                        <ChevronRight size={18} strokeWidth={2} />
                    </span>
                </FullButton>
            </form>
        </div>
    );
}