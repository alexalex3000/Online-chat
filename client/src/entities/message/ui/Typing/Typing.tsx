"use client"

import styles from "./Typing.module.scss"
import {useWebsocket} from "@/shared/api/ws/useWebsocket";
import {useUserStore} from "@/entities/user/model/user-store";

export default function Typing() {
    const userTyping = useWebsocket(state => state.usersTyping);
    const userIds = userTyping.map(user => user.id);
    const userNames  = userTyping.map(user => user.fullname);

    const user = useUserStore(state => state.user);

    if(userTyping.length === 0 || userIds.includes(user?.id ?? "")) {
        return null
    }

    return (
        <div className={styles.wrapper} aria-live="polite">
            <span className={styles.text}>{userNames.join(", ")}</span>
            <div className={styles.dots} aria-hidden="true">
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
            </div>
        </div>
    )
}

//TODO пофиксить отобрадение, чистить массив