"use client"

import {User} from "@/entities/user/model/types";
import {MessageStatusType} from "@/entities/message/model/types";
import Avatar from "@/entities/user/ui/Avatar/Avatar";
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
                <Avatar clickable/>
                <MessageText text={text} date={date} status={status} user={"other"}/>
            </div>
        );
    }

    return (
        <MessageText text={text} date={date} status={status} user={"user"}/>
    );
}