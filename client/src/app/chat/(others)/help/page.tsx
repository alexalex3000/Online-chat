import OtherHeader from "@/widgets/header/OtherHeader/OtherHeader";
import styles from "@/app/chat/page.module.scss";
import Questions from "@/widgets/Questions/Questions";

export default function HelpPage() {
    return (
        <div className={styles.wrapperNoPoint}>
            <OtherHeader text="Help & FAQ"/>
            <div className={styles.miniMain}>
                <Questions/>
            </div>
        </div>
    )
}