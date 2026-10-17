import {getTime} from "@/shared/utils/date";
import styles from "./TimeInfo.module.scss"

interface Props{
    date: Date
    user: "user" | "other"
}

export default function TimeInfo({date, user}:Props){
    const time = getTime(date);

    return (
        <p className={user == "user" ? styles.time : styles.otherTime}>{time}</p>
    )
}