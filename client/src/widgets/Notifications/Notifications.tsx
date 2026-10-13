"use client"

import {delay} from "@/entities/settigs/api/delay";
import {Setting} from "@/entities/settigs/model/types";
import {useState} from "react";
import styles from "@/widgets/Privacy/Privacy.module.scss";
import Label from "@/shared/ui/Label/Label";
import Section from "@/shared/ui/Section/Section";
import Switch from "@/shared/ui/Switch/Switch";

export default function Notifications() {
    const [chatSound, setChatSound] = useState<boolean>(true);
    const [alertsSound, setAlertsSound] = useState<boolean>(true);

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