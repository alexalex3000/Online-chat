import {getTime} from "@/shared/utils/date";
import styles from "./TimeInfo.module.scss"

interface Props{
    date: Date
}

export default function TimeInfo({date}:Props){
    const time = getTime(date);

    return (
        <p className={styles.time}>{time}</p>
    )
}