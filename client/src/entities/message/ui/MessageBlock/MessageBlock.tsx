"use client"

import Avatar from "@/entities/user/ui/Avatar/Avatar";
import styles from "./MessageBlock.module.scss"
import MessageText from "@/entities/message/ui/MessageText/MessageText";
import {useUserStore} from "@/entities/user/model/user-store";
import {type Message} from "@/entities/message/model/types";

interface Props {
    ref: null | React.Ref<HTMLDivElement>;
    message: Message;
}

export default function MessageBlock({message, ref}: Props) {
    const user = useUserStore(state => state.user)

    if (user?.id !== message.owner?.id) {
        return (
            <div className={styles.wrapper} ref={ref}>
                <div className={styles.otherContainer}>
                    <Avatar name={`${message.owner?.name} ${message.owner?.surname}`} user={message.owner ?? undefined} clickable/>
                    <MessageText message={message} />
                </div>
            </div>
        );
    }

    return (
        <div className={styles.wrapper} ref={ref}>
            <MessageText message={message} />
        </div>
    );
}