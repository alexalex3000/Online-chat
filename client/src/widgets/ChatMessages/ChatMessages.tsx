"use client";

import MessageBlock from "@/entities/message/ui/MessageBlock/MessageBlock";
import { useMessagesStore } from "@/entities/message/model/messages-store";
import EmptyChat from "@/shared/ui/EmptyChat/EmptyChat";
import {Fragment, useEffect, useLayoutEffect, useRef} from "react";
import ChatTimeSection from "@/shared/ui/ChatTimeSection/ChatTimeSection";
import {isDifferentDay} from "@/shared/utils/date";

export default function ChatMessages() {
    const messages = useMessagesStore((state) => state.messages);
    const anchorMessage = useMessagesStore((state) => state.anchorMessage);
    const isFetchLoading = useMessagesStore((state) => state.isFetchLoading);
    const fetchMessages = useMessagesStore((state) => state.fetchMessages);
    const isWritedMessage = useMessagesStore((state) => state.isWritedMessage);

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const anchorRef = useRef<HTMLDivElement>(null);

    const isFirstScroll = useRef(true);
    const prevScrollHeightRef = useRef<number>(0);
    const prevMessagesLengthRef = useRef<number>(0);

    useLayoutEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const currentLength = messages.length;
        const prevLength = prevMessagesLengthRef.current;

        if (!isFirstScroll.current && currentLength > prevLength && !isWritedMessage) {
            const heightDifference = container.scrollHeight - prevScrollHeightRef.current;
            container.scrollTop += heightDifference;
        }

        prevScrollHeightRef.current = container.scrollHeight;
        prevMessagesLengthRef.current = currentLength;
    }, [messages, isWritedMessage]);

    useEffect(() => {
        if (!bottomRef.current || messages.length === 0) return;

        if (isFirstScroll.current) {
            bottomRef.current.scrollIntoView({ behavior: "instant" });
            isFirstScroll.current = false;

            if (scrollContainerRef.current) {
                prevScrollHeightRef.current = scrollContainerRef.current.scrollHeight;
            }
            return;
        }

        if (isWritedMessage) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isWritedMessage]);

    useEffect(() => {
        const target = anchorRef.current;
        const container = scrollContainerRef.current;
        if (!target || !anchorMessage || !container) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && !isFetchLoading && anchorMessage) {
                    observer.unobserve(entry.target);
                    fetchMessages(anchorMessage);
                }
            },
            {
                root: container,
                rootMargin: "0px",
                threshold: 0,
            }
        );

        observer.observe(target);

        return () => {
            observer.disconnect();
        };
    }, [anchorMessage, isFetchLoading, fetchMessages]);

    if (messages.length === 0) {
        return <EmptyChat />;
    }

    return (
        <div
            ref={scrollContainerRef}
            className="flex-1 w-full overflow-y-auto overflow-x-hidden min-h-0 [overflow-anchor:none] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
            <div className="flex flex-col gap-1 w-full pb-6">

                {messages.map((message, index) => {
                    const prevMessage = messages[index - 1];
                    const showDateSeparator = isDifferentDay(message.date, prevMessage?.date);

                    const isSameAuthor = message?.owner?.id === prevMessage?.owner?.id

                    const isCleared = isSameAuthor && !showDateSeparator;

                    return (
                        <Fragment key={message.id}>
                            {showDateSeparator && (
                                <ChatTimeSection date={message.date} />
                            )}
                            <MessageBlock
                                cleared={isCleared}
                                ref={anchorMessage === message.id ? anchorRef : null}
                                message={message}
                            />
                        </Fragment>
                    );
                })}

                <div ref={bottomRef} className="w-full h-8 shrink-0" aria-hidden="true" />
            </div>
        </div>
    );
}