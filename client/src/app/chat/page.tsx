import ChatHeader from "@/widgets/header/ChatHeader/ChatHeader";
import styles from "./page.module.scss";
import ChatMessages from "@/widgets/ChatMessages/ChatMessages";
import UserPageWrapper from "@/entities/user/ui/UserPageWrapper/UserPageWrapper";
import UserPage from "@/entities/user/ui/UserPage/UserPage";
import ChatInput from "@/features/ChatInput/ChatInput";

interface Props {
    searchParams: Promise<{
        "user-id": string;
    }>
}

export default async function ChatPage({searchParams}: Props) {
    const params = await searchParams

    const id = params["user-id"]

    return (
        <div className={styles.wrapper}>
            <ChatHeader />
            <div className={styles.main}>
                <ChatMessages />
                <UserPageWrapper UserPage={<UserPage id={id}/>} />
            </div>
            <div className={styles.inputContainer}>
                <ChatInput />
            </div>
        </div>
    );
}