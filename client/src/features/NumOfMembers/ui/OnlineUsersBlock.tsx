"use client"

import styles from "@/features/NumOfMembers/NumOfMembers.module.scss";
import {useWebsocket} from "@/shared/api/ws/useWebsocket";

export default function OnlineUsersBlock(){
    const onlineUsers = useWebsocket((state) => state.onlineUsers)

    return (
        <div className={styles.item}>
            <div className={styles.dot}></div>
            <p className={styles.text}>{onlineUsers.length.toLocaleString("en-US")} online</p>
        </div>
    )
}