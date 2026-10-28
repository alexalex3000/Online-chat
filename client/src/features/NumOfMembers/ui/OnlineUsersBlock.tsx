"use client"

import styles from "@/features/NumOfMembers/NumOfMembers.module.scss";
import {useWebsocket} from "@/shared/api/ws/useWebsocket";
import {useEffect} from "react";

export default function OnlineUsersBlock(){
    const onlineUsers = useWebsocket((state) => state.onlineUsers)
    const open = useWebsocket(state => state.connect);
    const close = useWebsocket(state => state.disconnect)

    useEffect(() => {
        open()
        return () => {
            close()
        }
    }, [])

    return (
        <div className={styles.item}>
            <div className={styles.dot}></div>
            <p className={styles.text}>{onlineUsers.length.toLocaleString("en-US")} online</p>
        </div>
    )
}