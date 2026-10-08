import NumOfMembers from "@/shared/ui/NumOfMembers/NumOfMembers";
import Avatar from "@/entities/user/ui/Avatar/Avatar";
import styles from "../header.module.scss";
import Link from "next/link";

export default function ChatHeader() {
    return (
        <header className={styles.header}>
            <div>
                <h1>Chat</h1>
                <NumOfMembers online={21} total={12341} />
            </div>
            <Link href="/chat/profile">
                <Avatar />
            </Link>
        </header>
    );
}