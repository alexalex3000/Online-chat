"use client";

import { useRef } from "react";
import { useSettingsStore } from "@/entities/settings/model/settings-store";
import { UserSettings } from "@/entities/settings/model/types";

interface Props {
    settings: UserSettings;
}

export default function SettingsInit({ settings }: Props) {
    const initialized = useRef(false);

    if (!initialized.current) {
        useSettingsStore.setState({ settings });
        initialized.current = true;
    }

    return null;
}