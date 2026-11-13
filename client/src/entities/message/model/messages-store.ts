import {Message, validateMessageResponse} from "@/entities/message/model/types";
import {create} from "zustand";
import {serverFetch} from "@/shared/api/serverFetch";
import {clientFetch} from "@/shared/api/clientFetch";

interface MessagesStore {
    messages: Message[];
    anchorMessage: string;
    changeStatusSuccess: (tempId: string, id: string) => void;
    changeStatusError: (id: string) => void;
    addMessage: (message: Message) => void;
    addMessages: (message: Message[]) => void;
    deleteMessage: (id: string) => void;
    fetchMessages: (id: string) => Promise<void>;
    isFetchLoading: boolean;
    editMessage: (id: string, messageText: string) => void;

    isWritedMessage: boolean;
}

export const useMessagesStore = create<MessagesStore>((set, get) => ({
    isWritedMessage: false,
    messages: [],

    anchorMessage: "",

    addMessages: (newMessages) => {
        const {messages} = get();

        const currArr = [...messages, ...newMessages]

        set({
            messages: currArr, anchorMessage: currArr[0].id ?? "",
            isWritedMessage: false
        });
    },

    addMessage: (message) => {
        set((state) => ({
            messages: [...state.messages, message],
            isWritedMessage: true,
        }));
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

    editMessage(id: string, messageText: string){
        set(state => ({
            messages: state.messages.map(message => {
                if(message.id === id){
                    return {
                        ...message,
                        message: messageText
                    }
                }

                return message
            })
        }))
    },

    deleteMessage: (id) => {
        set(state => ({
            messages: state.messages.filter((message) => (message.id !== id))
        }))
    },

    isFetchLoading: false,
    fetchMessages: async (id: string) => {
        try{
            set({isFetchLoading: true});

            const result = await clientFetch(`/message?cursor=${id}`);

            const isValid = validateMessageResponse.safeParse(result);

            if(!isValid.success) {
                throw new Error("Cant load messages");
            }

            const {messages} = get();

            const currArr = [...isValid.data.data, ...messages];

            set((state) => ({
                isFetchLoading: false,
                messages: currArr,
                anchorMessage: currArr[0].id ?? "",
                isWritedMessage: false
            }));

        } catch (e){
            console.log(e)
        } finally {
          set({isFetchLoading: false});
        }
    },
}))