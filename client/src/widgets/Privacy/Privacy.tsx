"use client";

import { useState } from "react";
import Label from "@/shared/ui/Label/Label";
import Section from "@/shared/ui/Section/Section";
import Switch from "@/shared/ui/Switch/Switch";
import styles from "./Privacy.module.scss";
import {delay} from "@/entities/settings/api/delay";
import {Setting, UserSettings} from "@/entities/settings/model/types";
import {settingsApi} from "@/entities/settings/api/settings-api";
import {changeSettings} from "@/entities/settings/api/change-settings";

interface Props{
    userSettings: UserSettings
}

export default function Privacy({userSettings}: Props) {
    const [showOnline, setShowOnline] = useState<boolean>(userSettings.showOnlineStatus);
    const [doNotDistract, setDoNotDistract] = useState<boolean>(userSettings.doNotDistract);

    const privacy = [
        {
            title: "Show Online Status",
            text: "Let members see when you’re active",
            value: showOnline,
            toggle: setShowOnline,
            action: async () => await changeSettings({
                showOnlineStatus: !showOnline,
            })
        },
        {
            title: "Do Not Distract",
            text: "Mute all incoming notifications and sound alerts",
            value: doNotDistract,
            toggle: setDoNotDistract,
            action: async () => await changeSettings({
                doNotDistract: !doNotDistract,
            })
        },
    ];

    return (
        <div className={styles.wrapper}>
            <Label label="Privacy" />
            <Section>
                <div className={styles.list}>
                    {privacy.map((item, i) => (
                        <div key={i} className={styles.row}>
                            <div className={styles.textGroup}>
                                <h2>{item.title}</h2>
                                <p>{item.text}</p>
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
    );
}