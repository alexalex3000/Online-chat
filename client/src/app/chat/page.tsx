import ChatHeader from "@/widgets/header/ChatHeader/ChatHeader";
import MessageBlock from "@/entities/message/ui/MessageBlock/MessageBlock";
import styles from "./page.module.scss"

export default function ChatPage(){
    return (
        <div className={styles.wrapper}>
            <ChatHeader/>
            <div className={styles.main}>
                <MessageBlock text="Hello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello worldHello world" date={new Date()} status="success" user={"other"}/>
                <MessageBlock text="Hello world" date={new Date()} status="success" user={"other"}/>
                <MessageBlock text="Hello world" date={new Date()} status="success" user={"user"}/>

            </div>
        </div>
    )
}