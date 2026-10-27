import styles from "./NumOfMembers.module.scss";
import {serverFetch} from "@/shared/api/serverFetch";
import {GetUserCountResponse} from "@/entities/user/model/types";

export default async function NumOfMembers() {
    const userCount = await serverFetch("/user") as GetUserCountResponse

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.separator}></div>
                <p className={styles.text}>{userCount?.total?.total.toLocaleString("en-US")} members</p>
            </div>
            <div className={styles.item}>
                <div className={styles.dot}></div>
                <p className={styles.text}>{userCount?.total?.onlineTotal.toLocaleString("en-US")} online</p>
            </div>
        </div>
    );
}