import styles from "./ChatTimeSection.module.scss";
import getDayStr, { getFullDate } from "@/shared/utils/date";

interface Props {
    date: Date | string;
}

const isSameCalendarDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

function getDayInfo(dateInput: Date | string): string {
    const date = new Date(dateInput);
    const now = new Date();

    if (isSameCalendarDay(date, now)) {
        return "Today";
    }

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    if (isSameCalendarDay(date, yesterday)) {
        return "Yesterday";
    }

    return getDayStr(date);
}

export default function ChatTimeSection({ date }: Props) {
    return (
        <div className={styles.wrapper}>
            <span className={styles.pill}>{getDayInfo(date)}</span>
        </div>
    );
}