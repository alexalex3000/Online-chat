import {create} from "zustand";

interface AlertStore {
    value: string | null
    type: "success" | "error" | "info" | null
    setValue(value: string | null): void
    setType(value: "success" | "error" | "info" | null): void
}

export const useAlertStore = create<AlertStore>((set) => ({
    value: null,
    type: null,
    setValue: (value) => {
        set({value})
    },
    setType: (type) => {
        set({type})
    }
}))