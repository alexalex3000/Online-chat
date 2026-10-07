import styles from "./NumOfMembers.module.scss";

interface Props {
    online: number;
    total: number;
}

export default function NumOfMembers({ online, total }: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.separator}></div>
                <p className={styles.text}>{total.toLocaleString("en-US")} members</p>
            </div>
            <div className={styles.item}>
                <div className={styles.dot}></div>
                <p className={styles.text}>{online.toLocaleString("en-US")} online</p>
            </div>
        </div>
    );
}