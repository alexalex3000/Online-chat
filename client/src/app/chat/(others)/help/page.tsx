import OtherHeader from "@/widgets/header/OtherHeader/OtherHeader";
import styles from "@/app/chat/page.module.scss";
import Questions from "@/widgets/Questions/Questions";
import SearchQuestion from "@/features/SearchQuestion/SearchQuestion";
import AskQuestion from "@/features/AskQuestion/AskQuestion";

export default function HelpPage() {
    return (
        <div className={styles.wrapperNoPoint}>
            <OtherHeader text="Help & FAQ"/>
            <div className={styles.miniMain}>
                <SearchQuestion/>
                <AskQuestion/>
            </div>
        </div>
    )
}