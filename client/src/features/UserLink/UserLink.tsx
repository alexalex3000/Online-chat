import Avatar from "@/entities/user/ui/Avatar/Avatar";
import Name from "@/entities/user/ui/Name/Name";
import Username from "@/entities/user/ui/Username/Username";
import { ChevronRight } from "lucide-react";
import Section from "@/shared/ui/Section/Section";
import styles from "./UserLink.module.scss";

export default function UserLink() {
    return (
        <Section small>
            <div className={styles.container}>
                <Avatar />
                <div className={styles.userInfo}>
                    <Name />
                    <Username />
                </div>
                <ChevronRight className={styles.arrow} />
            </div>
        </Section>
    );
}