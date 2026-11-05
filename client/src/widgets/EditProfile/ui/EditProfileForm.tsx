"use client"

import styles from "../EditProfile.module.scss"
import Input from "@/shared/ui/Input/Input";
import Textarea from "@/shared/ui/Textarea/Textarea";
import { type User } from "@/entities/user/model/types";
import { useActionState } from "react";
import {changeUserDrop} from "@/entities/user/api/change-user";
import ErrorMessage from "@/shared/ui/ErrorMessage/ErrorMessage";
import {useAlertStore} from "@/features/AlertWindow/model/alert-store";

interface Props {
    user: User;
}

interface FormErrors {
    server?: string;
    name?: string;
    surname?: string;
    username?: string;
    email?: string;
    about?: string;
    phoneNumber?: string;
}

interface StateType {
    success: boolean;
    error?: FormErrors;
    fields?: FormErrors;
}

export default function EditProfileForm({ user }: Props) {
    const setValue = useAlertStore(state => state.setValue)
    const setType = useAlertStore(state => state.setType)

    const initialState: StateType = {
        success: false,
        fields: {
            name: user.name ?? "",
            surname: user.surname ?? "",
            username: user.username ?? "",
            email: user.email ?? "",
            about: user.about ?? "",
            phoneNumber: user.phoneNumber ?? ""
        }
    };

    const [state, formAction, isPending] = useActionState<StateType, FormData>(
        async (previousState, formData) => {
            const fullName = (formData.get("fullName") as string)?.trim() ?? "";
            const username = ((formData.get("username") as string)?.trim()) ?? "";
            const about = ((formData.get("about") as string)?.trim()) ?? "";
            const phoneNumber = ((formData.get("phoneNumber") as string)?.trim()) ?? "";
            const email = ((formData.get("email") as string)?.trim()) ?? "";

            const [name = "", ...surnameParts] = fullName.split(/\s+/);
            const surname = surnameParts.join(" ");

            const fields = {
                name,
                surname,
                username,
                email,
                about,
                phoneNumber,
            };

            const initialFullName = `${user.name ?? ""} ${user.surname ?? ""}`.trim();
            const initialUsername = user.username ?? "";
            const initialAbout = user.about ?? "";
            const initialPhoneNumber = user.phoneNumber ?? "";
            const initialEmail = user.email ?? "";

            const hasChanges =
                fullName !== initialFullName ||
                username !== initialUsername ||
                about !== initialAbout ||
                phoneNumber !== initialPhoneNumber ||
                email !== initialEmail;

            if (!hasChanges) {
                useAlertStore.getState().setValue("No changes detected");
                useAlertStore.getState().setType("info");
                return {
                    success: false,
                    fields,
                };
            }

            const res = await changeUserDrop({
                name: name || undefined,
                surname: surname || undefined,
                username: username || undefined,
                about: about || undefined,
                phoneNumber: phoneNumber || undefined,
                email: email || undefined,
            });

            if (res?.serverError) {
                return {
                    success: false,
                    error: { server: res.serverError },
                    fields,
                };
            }

            if (res?.validationErrors) {
                return {
                    success: false,
                    error: {
                        name: res.validationErrors.name?._errors?.[0],
                        surname: res.validationErrors.surname?._errors?.[0],
                        username: res.validationErrors.username?._errors?.[0],
                        email: res.validationErrors.email?._errors?.[0],
                        about: res.validationErrors.about?._errors?.[0],
                        phoneNumber: res.validationErrors.phoneNumber?._errors?.[0],
                    },
                    fields,
                };
            }

            useAlertStore.getState().setValue("Successfully changed");
            useAlertStore.getState().setType("success");

            return {
                success: true,
                fields,
            };
        },
        initialState
    );

    return (
        <div className={styles.wrap}>
            <ErrorMessage message={state.error?.server}/>
            <form action={formAction} id="change-user">
                <div className={styles.wrapper}>
                    <div className={styles.top}>
                        <Input
                            name="fullName"
                            defaultValue={`${state.fields?.name ?? ""} ${state.fields?.surname ?? ""}`.trim()}
                            label="Full Name"
                            placeholder="John Doe"
                        />
                        <Input
                            name="username"
                            defaultValue={state.fields?.username}
                            label="Username"
                            placeholder="johndoe"
                            before="@"
                        />
                    </div>
                    <div className={styles.mid}>
                        <Textarea
                            name="about"
                            defaultValue={state.fields?.about ?? ""}
                            label="Bio / About"
                            placeholder="Tell about yourself"
                        />
                    </div>
                    <div className={styles.bottom}>
                        <Input
                            name="phoneNumber"
                            defaultValue={state.fields?.phoneNumber ?? ""}
                            label="Phone number"
                            placeholder="123456789"
                            before="+"
                        />
                        <Input
                            name="email"
                            defaultValue={state.fields?.email}
                            label="Email"
                            placeholder="you@example.com"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}