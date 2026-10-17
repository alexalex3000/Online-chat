import Avatar from "@/entities/user/ui/Avatar/Avatar";
import Name from "@/entities/user/ui/Name/Name";
import Username from "@/entities/user/ui/Username/Username";
import {
    Info,
    ShieldAlert,
} from "lucide-react";
import styles from "./UserPage.module.scss";

interface Props {
    logoUrl: string | null;
    name: string | null;
    username: string | null;
    status: string | null;
    about: string | null;
}

export default function UserPage() {
    return (
        <>
            <div className={styles.headerCard}>
                <div className={styles.userMain}>
                    <div className={styles.avatarWrapper}>
                        <Avatar large/>
                    </div>
                    <div className={styles.titleInfo}>
                        <Name large/>
                        <Username large/>
                        <span className={styles.status}>last time recently</span>
                    </div>
                </div>
            </div>

            <div className={styles.infoSection}>
                <h3 className={styles.sectionTitle}>Information</h3>

                <div className={styles.infoItem}>
                    <Info size={18} className={styles.itemIcon}/>
                    <div className={styles.itemContent}>
                        <span className={styles.itemValue}>Frontend Developer • Building Telegram Web UI</span>
                        <span className={styles.itemLabel}>About</span>
                    </div>
                </div>

                <div className={styles.infoItem}>
                    <span className={styles.itemIconText}>@</span>
                    <div className={styles.itemContent}>
                        <span className={styles.itemValue}>username</span>
                        <span className={styles.itemLabel}>User Name</span>
                    </div>
                </div>
            </div>

            <div className={styles.dangerSection}>
                <button className={styles.dangerBtn}>
                    <ShieldAlert size={18}/>
                    <span>Block user</span>
                </button>
            </div>
        </>
    );
}