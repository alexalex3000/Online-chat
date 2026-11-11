"use client";

import styles from "./Privacy.module.scss";
import Label from "@/shared/ui/Label/Label";
import Section from "@/shared/ui/Section/Section";
import Switch from "@/shared/ui/Switch/Switch";
import { changeSettings } from "@/entities/settings/api/change-settings";
import { useSettingsStore } from "@/entities/settings/model/settings-store";

export default function Privacy() {
    const settings = useSettingsStore((state) => state.settings);
    const updateSettings = useSettingsStore((state) => state.updateSettings);

    if (!settings) {
        return null;
    }

    const { showOnlineStatus, doNotDistract } = settings;

    const privacy = [
        {
            title: "Show Online Status",
            text: "Let members see when you’re active",
            value: showOnlineStatus,
            action: async () => {
                const nextValue = !showOnlineStatus;
                updateSettings({ showOnlineStatus: nextValue });
                await changeSettings({ showOnlineStatus: nextValue });
            },
        },
        {
            title: "Do Not Distract",
            text: "Mute all incoming notifications and sound alerts",
            value: doNotDistract,
            action: async () => {
                const nextValue = !doNotDistract;
                updateSettings({ doNotDistract: nextValue });
                await changeSettings({ doNotDistract: nextValue });
            },
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
                                setChecked={() => {}}
                            />
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
}