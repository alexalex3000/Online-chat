import { create } from "zustand";
import { z} from "zod";
import {useMessagesStore} from "@/entities/message/model/messages-store";
import {User} from "@/entities/user/model/types";
import {useAlertStore} from "@/features/AlertWindow/model/alert-store";
import {validateMessage} from "@/entities/message/model/types";

const validateResponseBody = z.object({
    userId: z.string()
})

const validateUserTypingBody = z.object({
    userId: z.string(),
    userFullname: z.string().min(1)
})

const validateErrorBody = z.object({
    message: z.string()
})

const validateOnlineBody = z.object({
    users: z.array(z.string().uuid()),
    messages: z.array(
        z.object({
            id: z.string().uuid(),
            message: z.string().min(1),
            date: z.coerce.date(),
            status: z.enum(["success", "error", "pending"]),
            owner: z.object({
                id: z.string().uuid().optional(),
                role: z.enum(["user", "admin"]),
                name: z.string(),
                surname: z.string(),
                username: z.string(),
                email: z.string().email(),
                about: z.string().nullable(),
                phoneNumber: z.string().nullable(),
                logoUrl: z.string().nullable(),
                lastTimeOnline: z.coerce.date(),
            }),
        })
    ),
});

const validateNewMessageBody = z.object({
    tempId: z.string().uuid().optional(),

    user: z.object({
        id: z.string().uuid(),
        role: z.enum(["user", "admin"]),
        name: z.string(),
        surname: z.string(),
        username: z.string(),
        about: z.string().nullable(),
        phoneNumber: z.string().nullable(),
        email: z.string().email(),
        lastTimeOnline: z.string().or(z.date()),
        logoUrl: z.string().nullable().optional(),
    }),

    message: validateMessage
})

const validateEditMessage = z.object({
    message: validateMessage
})

const validateDeleteMessage = z.object({
    id: z.string().uuid(),
})

type WsTypes = "NEW_MESSAGE"
    | "EDIT_MESSAGE"
    | "DELETE_MESSAGE"
    | "USER_TYPING"
    | "USER_TYPING_STOP"
    | "USER_ONLINE"
    | "USER_OFFLINE"
    | "ERROR"
    | "GET_INITIAL_INFO"


export interface WsMessage<T = unknown> {
    type: WsTypes;
    data?: T
}

interface UseWebsocket {
    socket: WebSocket | null;
    isConnected: boolean;
    connect: () => void;
    disconnect: () => void;
    sendMessage: (data: WsMessage) => void;
    isReconnecting: boolean
    usersTyping: {
        id: string;
        fullname: string;
    }[];
    onlineUsers: string[]
}

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WS_SERVER_ENDPOINT || "ws://localhost:4200/ws";

let reconnectTimer: NodeJS.Timeout | null = null;

const setValue = useAlertStore.getState().setValue
const setType = useAlertStore.getState().setType


export const useWebsocket = create<UseWebsocket>((set, get) => ({
    socket: null,
    isConnected: false,
    isReconnecting: false,
    usersTyping: [],
    onlineUsers: [],

    connect: () => {
        const { socket } = get();

        if (
            socket &&
            (socket.readyState === WebSocket.CONNECTING || socket.readyState === WebSocket.OPEN)
        ) {
            return;
        }

        const ws = new WebSocket(WEBSOCKET_URL);

        ws.onopen = () => {
            if (reconnectTimer) {
                clearTimeout(reconnectTimer);
                reconnectTimer = null;
            }
            console.log("WebSocket opened");

            const {isReconnecting} = get();

            if(isReconnecting){
                setValue("Successfuly reconnecting");
                setType("success")
                set({isReconnecting: false});
            }

            set({ isConnected: true, socket: ws});

            const {sendMessage} = get();

            sendMessage({
                type: "GET_INITIAL_INFO"
            })
        };

        ws.onmessage = async (event) => {
            try {
                const message: WsMessage = JSON.parse(event.data);

                switch (message.type) {
                    case "NEW_MESSAGE": {
                        const isValid = validateNewMessageBody.safeParse(message.data);
                        const addMessage = useMessagesStore.getState().addMessage;

                        if(!isValid.success){
                            console.log(isValid.error);

                            break
                        }

                        const messages = useMessagesStore.getState().messages

                        const isMessageExist = messages.some((message) => message.id === isValid.data.tempId)

                        if(isValid.data.tempId && isMessageExist){
                            useMessagesStore.getState().changeStatusSuccess(isValid.data.tempId, isValid.data.message.id);
                            break
                        }
                        else{
                            const isExist = messages.some((message) => message.id === isValid.data.message.id)

                            if(!isExist){
                                addMessage({
                                    id: isValid.data.message.id,
                                    message: isValid.data.message.message,
                                    status: "success",
                                    owner: isValid.data.user as User,
                                    date: new Date(isValid.data.message.date),
                                });
                            }
                        }

                        break;
                    }

                    case "USER_ONLINE": {
                        const isValid = validateResponseBody.safeParse(message.data);

                        if(!isValid.success){
                            console.log(isValid.error);
                            break
                        }

                        set((state) => ({
                            onlineUsers: Array.from(new Set([...state.onlineUsers, isValid.data.userId]))
                        }))
                        break;
                    }
                    case "USER_OFFLINE":{
                        const isValid = validateResponseBody.safeParse(message.data);

                        if(!isValid.success){
                            console.log(isValid.error);
                            break
                        }

                        set((state) => ({
                            onlineUsers: state.onlineUsers.filter((userId) => userId !== isValid.data.userId),
                        }))
                        break;
                    }
                    case "USER_TYPING": {
                        const isValid = validateUserTypingBody.safeParse(message.data);

                        if(!isValid.success){
                            console.log(isValid.error);
                            break
                        }

                        set((state) => ({
                            usersTyping: Array.from(new Set([...state.usersTyping, {id: isValid.data.userId, fullname: isValid.data.userFullname}]))
                        }))

                        break;
                    }
                    case "USER_TYPING_STOP": {
                        const isValid = validateUserTypingBody.safeParse(message.data);

                        if(!isValid.success){
                            console.log(isValid.error);
                            break
                        }

                        set((state) => ({
                            usersTyping: state.usersTyping.filter((userTyping) => userTyping.id !== isValid.data.userId),
                        }))

                        break;
                    }
                    case "GET_INITIAL_INFO": {
                        console.log(message);

                        const isValid = validateOnlineBody.safeParse(message.data);

                        if(!isValid.success){
                            console.log(isValid.error);
                            break
                        }

                        set((state) => ({
                            onlineUsers: Array.from(new Set([...state.onlineUsers, ...isValid.data.users]))
                        }));

                        const addMessages = useMessagesStore.getState().addMessages

                        addMessages(isValid.data.messages)

                        break;
                    }

                    case "EDIT_MESSAGE": {
                        const isValid = validateEditMessage.safeParse(message.data);

                        if(!isValid.success){
                            console.log(isValid.error);
                            break
                        }

                        const editMessage = useMessagesStore.getState().editMessage

                        editMessage(isValid.data.message.id, isValid.data.message.message)

                        break;
                    }

                    case "DELETE_MESSAGE": {
                        const isValid = validateDeleteMessage.safeParse(message.data);

                        if(!isValid.success){
                            console.log(isValid.error);
                            break
                        }

                        const deleteMessage = useMessagesStore.getState().deleteMessage

                        deleteMessage(isValid.data.id)

                        break;                    }

                    case "ERROR": {
                        const isValid = validateErrorBody.safeParse(message.data);

                        if(!isValid.success){
                            console.log(isValid.error);
                            break
                        }
                        console.log(isValid.data.message);
                        break;
                    }

                    default:
                        console.log("Unhandled WS message type:", message.type);
                }
            } catch (e) {
                console.error("Error parsing WS message:", e);
            }
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        ws.onclose = (event) => {
            console.log(`WebSocket closed with code: ${event.code}`);
            set({ isConnected: false, socket: null, onlineUsers: []});

            if (event.code !== 1000 && !reconnectTimer) {
                reconnectTimer = setTimeout(() => {
                    setValue("Reconnecting...")
                    setType("error")
                    console.log("WebSocket reconnecting (3s)...");
                    reconnectTimer = null;
                    get().connect();
                }, 3000);
            }
        };

        set({ socket: ws });
    },

    disconnect: () => {
        if (reconnectTimer) {
            clearTimeout(reconnectTimer);
            reconnectTimer = null;
        }

        const { socket } = get();

        if (socket) {
            socket.close(1000, "Socket closed manually");
            set({ isConnected: false, socket: null, onlineUsers: [] });
        }
    },

    sendMessage: (data: WsMessage) => {
        const { socket, isConnected } = get();

        if (socket && isConnected && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(data));
        } else {
            console.warn("WebSocket is not connected. Message dropped:", data);
        }
    },
}));