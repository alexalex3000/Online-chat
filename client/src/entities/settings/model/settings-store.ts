import { create } from "zustand";
import { UserSettings } from "@/entities/settings/model/types";

interface SettingsStore {
    settings: UserSettings | null;
    updateSettings: (settingsData: Partial<UserSettings>) => void;
    setSettings: (settings: UserSettings) => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
    settings: null,

    setSettings: (settings) => set({ settings }),

    updateSettings: (settingsData) => {
        set((state) => ({
            settings: state.settings
                ? { ...state.settings, ...settingsData }
                : (settingsData as UserSettings),
        }));
    },
}));