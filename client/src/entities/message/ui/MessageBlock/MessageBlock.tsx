import TimeInfo from "@/entities/message/ui/TimeInfo/TimeInfo";
import Status from "@/entities/message/ui/Status/Status";
import {User} from "@/entities/user/model/types";
import {MessageStatusType} from "@/entities/message/model/types";
import Avatar from "@/entities/user/ui/Avatar/Avatar";
import Name from "@/entities/user/ui/Name/Name";
import Username from "@/entities/user/ui/Username/Username";
import styles from "./MessageBlock.module.scss"

interface Props {
    text: string;
    date: Date;
    status: MessageStatusType;
    user: "other" | "user"
    otherUser?: User
}

export default function MessageBlock({text, date, status, user, otherUser}: Props) {
    if (user === "other") {
        return (
            <div className={styles.otherContainer}>
                <Avatar/>
                <div className={styles.contentWrapper}>
                    <div className={styles.authorRow}>
                        <Name/>
                        <Username/>
                    </div>
                    <div className={styles.otherBubble}>
                        {text}
                        <div className={styles.meta}>
                            <TimeInfo date={new Date()} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.userContainer}>
            <div className={styles.userBubble}>
                {text}
                <div className={styles.meta}>
                    <TimeInfo date={new Date()} />
                    <Status status={status} />
                </div>
            </div>
        </div>
    );
}