import {create} from "zustand";

interface EditMessage {
    id: string
    editMessage: string
    setMessage: (id: string, editMessage: string) => void
}

export const useEditMessage = create<EditMessage>((set) => ({
    id: "",
    editMessage: "",
    setMessage: (id, editMessage) => set({
        id,
        editMessage
    }),
}))