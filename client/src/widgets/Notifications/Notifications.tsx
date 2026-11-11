"use client"

import {delay} from "@/entities/settings/api/delay";
import {Setting, UserSettings} from "@/entities/settings/model/types";
import {useState} from "react";
import styles from "@/widgets/Privacy/Privacy.module.scss";
import Label from "@/shared/ui/Label/Label";
import Section from "@/shared/ui/Section/Section";
import Switch from "@/shared/ui/Switch/Switch";

interface Props{
    userSettings: UserSettings
}

export default function Notifications({userSettings}: Props) {
    const [chatSound, setChatSound] = useState<boolean>(userSettings.chatSounds);
    const [alertsSound, setAlertsSound] = useState<boolean>(userSettings.pinnedMessageAlerts);

    const notification:Setting[] = [
        {
            title: "Chat Sounds",
            value: chatSound,
            toggle: setChatSound,
            action: delay
        },
        {
            title: "Pinned Message Alerts",
            value: alertsSound,
            toggle: setAlertsSound,
            action: delay
        }
    ];

    return (
        <div className={styles.wrapper}>
            <Label label="notifications" />
            <Section>
                <div className={styles.list}>
                    {notification.map((item, i) => (
                        <div key={i} className={styles.row}>
                            <div className={styles.textGroup}>
                                <h2>{item.title}</h2>
                            </div>
                            <Switch
                                action={item.action}
                                isChecked={item.value}
                                setChecked={item.toggle}
                            />
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    )
}