import OtherHeader from "@/widgets/header/OtherHeader/OtherHeader";
import ChatInterfaceSettings from "@/widgets/ChatInterfaceSettings/ChatInterfaceSettings";
import styles from "../../page.module.scss"
import settingStyles from "./settingPage.module.scss"

export default function SettingsPage() {
    return (
        <div className={styles.wrapperNoPoint}>
            <OtherHeader text="Settings"/>
            <div className={styles.miniMain}>
                <div className={settingStyles.columns}>
                    <div>
                        <ChatInterfaceSettings/>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    )
}