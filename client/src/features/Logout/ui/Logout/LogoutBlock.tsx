"use client";

import Label from "@/shared/ui/Label/Label";
import {LogIn, Trash2} from "lucide-react";
import styles from "./LogoutBlock.module.scss";
import Button from "@/shared/ui/Button/Button";
import {logOut} from "@/entities/user/api/log-out";
import {useWebsocket} from "@/shared/api/ws/useWebsocket";
import {useUserStore} from "@/entities/user/model/user-store";

interface Props {
    onLogout?: () => void;
    onDeleteAccount?: () => void;
}

export default function LogoutBlock({onLogout, onDeleteAccount}: Props) {
    const disconnect = useWebsocket(state => state.disconnect);
    const setUser = useUserStore(state => state.setUser);

    const handleLogout = async () => {
        try{
            await logOut();

            disconnect()

            setUser(null)
        } catch (e){
            console.error(e);
        }
    }

    return (
        <div className={styles.container}>
            <Label label="DANGER ZONE" red/>
            <div className={styles.actions}>
                <Button red onClick={handleLogout}>
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