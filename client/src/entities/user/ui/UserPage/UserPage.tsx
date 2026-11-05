import Avatar from "@/entities/user/ui/Avatar/Avatar";
import Name from "@/entities/user/ui/Name/Name";
import Username from "@/entities/user/ui/Username/Username";
import {
    Info,
    ShieldAlert,
} from "lucide-react";
import styles from "./UserPage.module.scss";
import {User} from "@/entities/user/model/types";
import {userApi} from "@/entities/user/api/user.api";

interface Props{
    id: string;
}

export default async function UserPage({id}: Props) {
    if(!id){
        return null;
    }

    const {user} = await userApi.getUserById(id);

    if(!user){
        return null;
    }

    return (
        <>
            <div className={styles.headerCard}>
                <div className={styles.userMain}>
                    <div className={styles.avatarWrapper}>
                        <Avatar large name={`${user.name} ${user.surname}`} url={user.logoUrl ?? ""}/>
                    </div>
                    <div className={styles.titleInfo}>
                        <Name large name={`${user.name} ${user.surname}`}/>
                        <span className={styles.status}>last time recently</span>
                    </div>
                </div>
            </div>

            <div className={styles.infoSection}>
                <h3 className={styles.sectionTitle}>Information</h3>

                {
                    user.about && (
                        <div className={styles.infoItem}>
                            <Info size={18} className={styles.itemIcon}/>
                            <div className={styles.itemContent}>
                                <span className={styles.itemValue}>{user.about}</span>
                                <span className={styles.itemLabel}>About</span>
                            </div>
                        </div>
                    )
                }

                <div className={styles.infoItem}>
                    <span className={styles.itemIconText}>@</span>
                    <div className={styles.itemContent}>
                        <span className={styles.itemValue}>{user.username}</span>
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