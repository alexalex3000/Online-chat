"use client";

import Label from "@/shared/ui/Label/Label";
import {LogIn, Trash2} from "lucide-react";
import styles from "./LogoutBlock.module.scss";
import Button from "@/shared/ui/Button/Button";

interface Props {
    onLogout?: () => void;
    onDeleteAccount?: () => void;
}

export default function LogoutBlock({onLogout, onDeleteAccount}: Props) {
    return (
        <div className={styles.container}>
            <Label label="DANGER ZONE" red/>
            <div className={styles.actions}>
                <Button red onClick={() => {}}>
                    <LogIn/>
                    <p>Log out</p>
                </Button>
                <Button red onClick={() => {}}>
                    <Trash2/>
                    <p>Delete Account</p>
                </Button>
            </div>
        </div>
    );
}