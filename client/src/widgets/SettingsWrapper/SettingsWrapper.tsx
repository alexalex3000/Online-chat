import ChatInterfaceSettings from "@/widgets/ChatInterfaceSettings/ChatInterfaceSettings";
import Notifications from "@/widgets/Notifications/Notifications";
import {settingsApi} from "@/entities/settings/api/settings-api";
import Privacy from "@/widgets/Privacy/Privacy";
import styles from "./SettingsWrapper.module.scss"

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
            <div>
                <ChatInterfaceSettings/>
            </div>
            <div className={styles.col}>
                <Notifications userSettings={settings.data}/>
                <Privacy userSettings={settings.data}/>
            </div>
        </>
    )
}