"use client"

import MessageBlock from "@/entities/message/ui/MessageBlock/MessageBlock";
import {useMessagesStore} from "@/entities/message/model/messages-store";
import {useUserStore} from "@/entities/user/model/user-store";
import EmptyChat from "@/shared/ui/EmptyChat/EmptyChat";
import {useEffect, useRef} from "react";

export default function ChatMessages() {
    const messages = useMessagesStore(state => state.messages);
    const user = useUserStore(state => state.user);

    const bottomRef = useRef<HTMLDivElement>(null);
    const isFirstScroll = useRef(true);

    useEffect(() => {
        if(!bottomRef.current || messages.length === 0) return;

        if(isFirstScroll.current) {
            bottomRef.current.scrollIntoView({
                behavior: "instant",
            })
            isFirstScroll.current = false
        }

        bottomRef.current.scrollIntoView({
            behavior: "smooth",
        })
    }, [messages]);

    if (messages.length === 0) {
        return <EmptyChat />;
    }

    return (
        <div className={"flex gap-1 flex-col"}>
            {
                messages.map((message) => (
                    <MessageBlock key={message.id} text={message.message} date={message.date} status={message.status} owner={message.owner} />
                ))
            }

            <div ref={bottomRef} className="h-[48px] shrink-0" aria-hidden="true" />
        </div>
    )
}