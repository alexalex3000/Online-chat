import ChatHeader from "@/widgets/header/ChatHeader/ChatHeader";
import styles from "./page.module.scss"
import ChatMessages from "@/widgets/ChatMessages/ChatMessages";

export default function ChatPage(){
    return (
        <div className={styles.wrapper}>
            <ChatHeader/>
            <div className={styles.main}>
                <ChatMessages/>
            </div>
        </div>
    )
}