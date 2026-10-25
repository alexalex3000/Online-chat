"use client";

import styles from "./RegisterForm.module.scss";
import Input from "@/shared/ui/Input/Input";
import FullButton from "@/shared/ui/FullButton/FullButton";
import {ChevronRight} from "lucide-react";
import {useActionState} from "react";
import {registerDrop} from "@/entities/user/api/register";
import ErrorMessage from "@/shared/ui/ErrorMessage/ErrorMessage";

interface FormErrors {
    server?: string;
    name?: string;
    surname?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

interface StateType {
    success: boolean;
    error?: FormErrors;
    fields?: FormErrors;
}

export default function RegisterForm() {
    const [state, formAction, isPending] = useActionState<StateType, FormData>(
        async (previousState, formData) => {
            const name = (formData.get("name") as string) || "";
            const surname = (formData.get("surname") as string) || "";
            const username = (formData.get("username") as string) || "";
            const email = (formData.get("email") as string) || "";
            const password = (formData.get("password") as string) || "";
            const confirmPassword = (formData.get("confirm_password") as string) || "";

            const fields = {name, surname, username, email, password, confirmPassword};

            const result = await registerDrop({
                name,
                surname,
                username,
                email,
                password,
                confirmPassword,
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
                        name: result.validationErrors.name?._errors?.[0],
                        surname: result.validationErrors.surname?._errors?.[0],
                        username: result.validationErrors.username?._errors?.[0],
                        email: result.validationErrors.email?._errors?.[0],
                        password: result.validationErrors.password?._errors?.[0],
                        confirmPassword: result.validationErrors.confirmPassword?._errors?.[0],
                    },
                    fields
                };
            }

            return {
                success: true,
            };
        },
        {success: false}
    );

    return (
        <div className={styles.wrap}>
            <ErrorMessage message={state?.error?.server}/>
            <form className={styles.form} action={formAction}>
                <div className={styles.nameGroup}>
                    <div className={styles.row}>
                        <Input
                            label="Name"
                            name="name"
                            value={state?.fields?.name}
                            placeholder="John"
                            errorMessage={state.error?.name}
                        />
                        <Input
                            label="Surname"
                            name="surname"
                            placeholder="Doe"
                            value={state?.fields?.surname}
                            errorMessage={state.error?.surname}
                        />
                    </div>
                    <Input
                        before="@"
                        name="username"
                        label="Username"
                        placeholder="johndoe"
                        value={state?.fields?.username}
                        errorMessage={state.error?.username}
                    />
                </div>

                <Input
                    type="email"
                    name="email"
                    label="Email address"
                    placeholder="you@example.com"
                    value={state?.fields?.email}
                    errorMessage={state.error?.email}
                />

                <Input
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="••••••••"
                    value={state?.fields?.password}
                    errorMessage={state.error?.password}
                />

                <Input
                    type="password"
                    name="confirm_password"
                    label="Confirm Password"
                    placeholder="••••••••"
                    value={state?.fields?.confirmPassword}
                    errorMessage={state.error?.confirmPassword}
                />

                <FullButton disabled={isPending}>
                <span className={styles.buttonContent}>
                    {isPending ? "Registering..." : "Register"}
                    <ChevronRight size={18} strokeWidth={2}/>
                </span>
                </FullButton>
            </form>
        </div>
    );
}