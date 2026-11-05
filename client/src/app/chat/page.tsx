import ChatHeader from "@/widgets/header/ChatHeader/ChatHeader";
import styles from "./page.module.scss";
import ChatMessages from "@/widgets/ChatMessages/ChatMessages";
import UserPageWrapper from "@/entities/user/ui/UserPageWrapper/UserPageWrapper";
import UserPage from "@/entities/user/ui/UserPage/UserPage";
import ChatInput from "@/features/ChatInput/ChatInput";

export default function ChatPage() {
    return (
        <div className={styles.wrapper}>
            <ChatHeader />
            <div className={styles.main}>
                <ChatMessages />
                <UserPageWrapper UserPage={<UserPage />} />
            </div>
            <div className={styles.inputContainer}>
                <ChatInput />
            </div>
        </div>
    );
}