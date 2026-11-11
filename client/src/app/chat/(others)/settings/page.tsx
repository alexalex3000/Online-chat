import OtherHeader from "@/widgets/header/OtherHeader/OtherHeader";
import ChatInterfaceSettings from "@/widgets/ChatInterfaceSettings/ChatInterfaceSettings";
import styles from "../../page.module.scss"
import settingStyles from "./settingPage.module.scss"
import Notifications from "@/widgets/Notifications/Notifications";
import SettingsWrapper from "@/widgets/SettingsWrapper/SettingsWrapper";

export default function SettingsPage() {
    return (
        <div className={styles.wrapperNoPoint}>
            <OtherHeader text="Settings"/>
            <div className={styles.miniMain}>
                <div className={settingStyles.columns}>
                    <SettingsWrapper/>
                </div>
            </div>
        </div>
    )
}