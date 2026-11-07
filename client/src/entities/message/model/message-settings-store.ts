import { create } from "zustand";

interface VisibleStore {
    activeMessageId: string | null;
    open: (id: string) => void;
    close: () => void;
}

export const useMessageStore = create<VisibleStore>((set) => ({
    activeMessageId: null,
    open: (id) => set({ activeMessageId: id }),
    close: () => set({ activeMessageId: null }),
}));