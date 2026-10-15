import TimeInfo from "@/entities/message/ui/TimeInfo/TimeInfo";
import Status from "@/entities/message/ui/Status/Status";
import {User} from "@/entities/user/model/types";
import {MessageStatusType} from "@/entities/message/model/types";
import Avatar from "@/entities/user/ui/Avatar/Avatar";
import Name from "@/entities/user/ui/Name/Name";
import Username from "@/entities/user/ui/Username/Username";
import styles from "./MessageBlock.module.scss"
import MessageText from "@/entities/message/ui/MessageText/MessageText";

interface Props {
    text: string;
    date: Date;
    status: MessageStatusType;
    user: "other" | "user"
    otherUser?: User
}

export default function MessageBlock({text, date, status, user, otherUser}: Props) {
    if (user == "other") {
        return (
            <div className={styles.otherContainer}>
                <Avatar/>
                <MessageText text={text} date={date} status={status} user={"other"}/>
            </div>
        );
    }

    return (
        <MessageText text={text} date={date} status={status} user={"user"}/>
    );
}