"use client";

import Label from "@/shared/ui/Label/Label";
import {LogIn, Trash2} from "lucide-react";
import styles from "./LogoutBlock.module.scss";
import Button from "@/shared/ui/Button/Button";
import {logOut} from "@/entities/user/api/log-out";
import {useWebsocket} from "@/shared/api/ws/useWebsocket";
import {useUserStore} from "@/entities/user/model/user-store";
import {useAlertStore} from "@/features/AlertWindow/model/alert-store";

export default function LogoutBlock() {
    const disconnect = useWebsocket(state => state.disconnect);
    const setUser = useUserStore(state => state.setUser);
    const setMessage = useAlertStore(state => state.setValue)
    const setType = useAlertStore(state => state.setType)

    const handleLogout = async () => {
        try{
            await logOut();

            disconnect()

            setUser(null)

            setMessage("Successfully logged out")
            setType("success")
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