import { create } from "zustand";

interface VisibleStore {
    isVisible: boolean;
    open: () => void;
    close: () => void;
}

export const useMessageStore = create<VisibleStore>((set) => ({
    isVisible: false,

    open: () => set({ isVisible: true }),
    close: () => set({ isVisible: false }),
}));