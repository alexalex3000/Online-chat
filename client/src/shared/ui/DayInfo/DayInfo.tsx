import getDayStr from "@/shared/utils/date";
import styles from "./DayInfo.module.scss"

interface Props{
    date: Date
}

export default function DayInfo({date}: Props){
    const dateStr = getDayStr(date)
    const now = getDayStr(new Date())
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);

    const yesterday = getDayStr(yesterdayDate)

    return (
        <div className={styles.dayInfo}>
            {dateStr == now ? "Today" : dateStr == yesterday ? "Yesterday" : dateStr}
        </div>
    )
}