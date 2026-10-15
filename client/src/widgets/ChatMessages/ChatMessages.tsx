import MessageBlock from "@/entities/message/ui/MessageBlock/MessageBlock";

export const dynamic = "force-dynamic";

export default function ChatMessages() {
    return (
        <div>
            <MessageBlock text="Hello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello world" date={new Date()} status="success" user={"other"}/>
            <MessageBlock text="Hello world" date={new Date()} status="success" user={"other"}/>
            <MessageBlock text="Hello world" date={new Date()} status="success" user={"user"}/>
        </div>
    )
}