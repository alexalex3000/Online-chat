"use client"

import styles from "./LastTImeOnline.module.scss"
import {useSettingsStore} from "@/entities/settings/model/settings-store";
import {useUserStore} from "@/entities/user/model/user-store";
import {getFullDate} from "@/shared/utils/date";

interface Props{
    timeVisible: boolean
}

export default function LastTimeOnline({timeVisible}: Props){
    const user = useUserStore(state => state.user)

    if(!user){
        return null
    }

    return (
        <span className={styles.status}>{
            timeVisible ? (
                <>{getFullDate(user.lastTimeOnline)}</>
            ) : (
                <>last time recently</>
            )
        }</span>
    )
}