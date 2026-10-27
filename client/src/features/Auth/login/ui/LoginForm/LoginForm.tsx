"use client";

import Input from "@/shared/ui/Input/Input";
import FullButton from "@/shared/ui/FullButton/FullButton";
import { ChevronRight } from "lucide-react";
import styles from "./LoginForm.module.scss";
import {useActionState} from "react";
import {loginDrop} from "@/entities/user/api/login";
import ErrorMessage from "@/shared/ui/ErrorMessage/ErrorMessage";
import {redirect} from "next/navigation";

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
    const [state, formAction, isPending] = useActionState<StateType, FormData>(
        async (previousState, formData) => {
            const email = (formData.get("email") as string) || "";
            const password = (formData.get("password") as string) || "";

            const fields = {email, password};

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
                                : "Registration failed. Please try again.",
                    },
                    fields
                };
            }

            if (result?.validationErrors) {
                return {
                    success: false,
                    error: {
                        email: result.validationErrors.email?._errors?.[0],
                        password: result.validationErrors.password?._errors?.[0],
                    },
                    fields
                };
            }

            return {
                success: true,
            };
        },
        { success: false }
    );

    if(state.success){
        redirect("/chat")
    }

    return (
        <div className={styles.wrap}>
            <ErrorMessage message={state?.error?.server}/>
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
                <FullButton>
                <span className={styles.buttonContent}>
                    Log In <ChevronRight size={18} strokeWidth={2} />
                </span>
                </FullButton>
            </form>
        </div>
    );
}