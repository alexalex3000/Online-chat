"use client"

import MessageBlock from "@/entities/message/ui/MessageBlock/MessageBlock";
import {useMessagesStore} from "@/entities/message/model/messages-store";

export default function ChatMessages() {
    const messages = useMessagesStore(state => state.messages);

    console.log(messages);

    return (
        <div>
            <MessageBlock text="Hello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello world" date={new Date()} status="success" user={"other"}/>
            <MessageBlock text="Hello world" date={new Date()} status="success" user={"other"}/>
            <MessageBlock text="Hello world" date={new Date()} status="success" user={"user"}/>
        </div>
    )
}