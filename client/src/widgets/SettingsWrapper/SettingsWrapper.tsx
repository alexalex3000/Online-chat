import ChatInterfaceSettings from "@/widgets/ChatInterfaceSettings/ChatInterfaceSettings";
import Notifications from "@/widgets/Notifications/Notifications";
import {settingsApi} from "@/entities/settings/api/settings-api";
import Privacy from "@/widgets/Privacy/Privacy";
import styles from "./SettingsWrapper.module.scss"
import SettingsInit from "@/entities/settings/ui/SettingsInit/SettingsInit";

export default async function SettingsWrapper(){
    const settings = await settingsApi.getSettings();

    if(!settings || !("data" in settings) || !settings.data){
        return (
            <>
                <div>
                    <ChatInterfaceSettings/>
                </div>
            </>
        )
    }

    return (
        <>
            <SettingsInit settings={settings.data} />
            <div>
                <ChatInterfaceSettings/>
            </div>
            <div className={styles.col}>
                <Notifications/>
                <Privacy/>
            </div>
        </>
    )
}