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
    ref: null | React.Ref<HTMLDivElement>;
}

export default function MessageBlock({text, date, status, owner, ref}: Props) {
    const user = useUserStore(state => state.user)

    if (user?.id !== owner.id) {
        return (
            <div className={styles.wrapper} ref={ref}>
                <div className={styles.otherContainer}>
                    <Avatar name={`${owner.name} ${owner.surname}`} clickable/>
                    <MessageText text={text} date={date} status={status} owner={owner} />
                </div>
            </div>
        );
    }

    return (
        <div className={styles.wrapper} ref={ref}>
            <MessageText text={text} date={date} status={status} owner={owner} />
        </div>
    );
}