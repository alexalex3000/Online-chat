"use client";

import styles from "@/widgets/Privacy/Privacy.module.scss";
import Label from "@/shared/ui/Label/Label";
import Section from "@/shared/ui/Section/Section";
import Switch from "@/shared/ui/Switch/Switch";
import { changeSettings } from "@/entities/settings/api/change-settings";
import { useSettingsStore } from "@/entities/settings/model/settings-store";

export default function Notifications() {
    const settings = useSettingsStore((state) => state.settings);
    const updateSettings = useSettingsStore((state) => state.updateSettings);

    console.log(settings)

    if (!settings) {
        return null;
    }

    const { chatSounds, pinnedMessageAlerts } = settings;

    const notification = [
        {
            title: "Chat Sounds",
            value: chatSounds,
            action: async () => {
                const nextValue = !chatSounds;
                updateSettings({ chatSounds: nextValue });
                await changeSettings({ chatSounds: nextValue });
            },
        },
        {
            title: "Pinned Message Alerts (In future)",
            value: pinnedMessageAlerts,
            action: async () => {
                const nextValue = !pinnedMessageAlerts;
                updateSettings({ pinnedMessageAlerts: nextValue });
                await changeSettings({ pinnedMessageAlerts: nextValue });
            },
        },
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
                                setChecked={() => {}}
                            />
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
}