"use client"

import MessageBlock from "@/entities/message/ui/MessageBlock/MessageBlock";
import {useMessagesStore} from "@/entities/message/model/messages-store";
import {useUserStore} from "@/entities/user/model/user-store";
import EmptyChat from "@/shared/ui/EmptyChat/EmptyChat";

export default function ChatMessages() {
    const messages = useMessagesStore(state => state.messages);
    const user = useUserStore(state => state.user);

    if (messages.length === 0) {
        return <EmptyChat />;
    }

    return (
        <>
            {
                messages.map((message) => (
                    <MessageBlock key={message.id} text={message.message} date={message.date} status={message.status} user={message.owner.id === user?.id ? "user" : "other"}/>
                ))
            }
        </>
    )
}