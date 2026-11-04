import {Message} from "@/entities/message/model/types";
import {create} from "zustand";

interface MessagesStore {
    messages: Message[];

    changeStatusSuccess: (tempId: string, id: string) => void;
    changeStatusError: (id: string) => void;
    addMessage: (message: Message) => void;
    addMessages: (message: Message[]) => void;

    deleteMessage: (id: string) => void;
}

export const useMessagesStore = create<MessagesStore>((set) => ({
    messages: [],

    addMessages: (messages) => {
        set((state) => ({messages: [...state.messages, ...messages]}));
    },

    addMessage: (message) => {
        set((state) => ({messages: [...state.messages, message]}));
    },

    changeStatusSuccess: (tempId, id) => {
        set((state) => ({
            messages: state.messages.map((message) => (
                message.id === tempId ? {...message,id, status: "success"} : message
            ))
        }))
    },

    changeStatusError: (id) => {
        set((state) => ({
            messages: state.messages.map((message) => (
                message.id === id ? {...message, status: "error"} : message
            ))
        }))
    },

    deleteMessage: (id) => {
    }
}))

//TODO добавить изменение сообщения