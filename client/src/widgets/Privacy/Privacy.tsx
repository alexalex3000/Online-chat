"use client";

import { useState } from "react";
import Label from "@/shared/ui/Label/Label";
import Section from "@/shared/ui/Section/Section";
import Switch from "@/shared/ui/Switch/Switch";
import styles from "./Privacy.module.scss";
import {delay} from "@/entities/settigs/api/delay";
import {Setting} from "@/entities/settigs/model/types";

export default function Privacy() {
    const [showOnline, setShowOnline] = useState<boolean>(false);
    const [readReceipts, setReadReceipts] = useState<boolean>(false);

    const privacy:Setting[] = [
        {
            title: "Show Online Status",
            text: "Let members see when you’re active",
            value: showOnline,
            toggle: setShowOnline,
            action: delay
        },
        {
            title: "Read Receipts",
            text: "Send and receive read confirmations",
            value: readReceipts,
            toggle: setReadReceipts,
            action: delay
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