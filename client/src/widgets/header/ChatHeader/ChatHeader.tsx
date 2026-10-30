import NumOfMembers from "@/features/NumOfMembers/NumOfMembers";
import styles from "../header.module.scss";
import Link from "next/link";
import UploadAvatar from "@/features/UploadAvatar/UploadAvatar";
import Typing from "@/entities/message/ui/Typing/Typing";

export default function ChatHeader() {
    return (
        <header className={styles.header}>
            <div>
                <h1>Chat</h1>
                <div className={styles.userInfo}>
                    <NumOfMembers/>
                    <Typing/>
                </div>
            </div>
            <Link href="/chat/profile">
                <UploadAvatar/>
            </Link>
        </header>
    );
}