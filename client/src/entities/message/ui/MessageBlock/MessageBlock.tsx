"use client"

import {User} from "@/entities/user/model/types";
import {MessageStatusType} from "@/entities/message/model/types";
import Avatar from "@/entities/user/ui/Avatar/Avatar";
import styles from "./MessageBlock.module.scss"
import MessageText from "@/entities/message/ui/MessageText/MessageText";
import {useUserStore} from "@/entities/user/model/user-store";

interface Props {
    text: string;
    date: Date;
    status: MessageStatusType;
    owner: User;
}

export default function MessageBlock({text, date, status, owner}: Props) {
    const user = useUserStore(state => state.user)

    if (user?.id !== owner.id) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.otherContainer}>
                    <Avatar name={`${owner.name} ${owner.surname}`} clickable/>
                    <MessageText text={text} date={date} status={status} owner={owner} />
                </div>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <MessageText text={text} date={date} status={status} owner={owner} />
        </div>
    );
}