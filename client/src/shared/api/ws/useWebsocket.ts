import { create } from "zustand";
import {z} from "zod";

const validateResponseBody = z.object({
    userId: z.string()
})

const validateErrorBody = z.object({
    message: z.string()
})

const validateOnlineBody = z.object({
    users: z.array(z.string())
})

type WsTypes = "NEW_MESSAGE"
    | "USER_TYPING"
    | "USER_ONLINE"
    | "USER_TYPING_STOP"
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
    userIdTyping: string[];
    onlineUsers: string[]
}

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WS_SERVER_ENDPOINT || "ws://localhost:4200/ws";

let reconnectTimer: NodeJS.Timeout | null = null;

export const useWebsocket = create<UseWebsocket>((set, get) => ({
    socket: null,
    isConnected: false,
    userIdTyping: [],
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
            set({ isConnected: true, socket: ws });

            const {sendMessage} = get();

            sendMessage({
                type: "GET_INITIAL_INFO"
            })
        };

        ws.onmessage = (event) => {
            try {
                const message: WsMessage = JSON.parse(event.data);

                switch (message.type) {
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
                        const isValid = validateResponseBody.safeParse(message.data);

                        if(!isValid.success){
                            console.log(isValid.error);
                            break
                        }

                        set((state) => ({
                            userIdTyping: Array.from(new Set([...state.userIdTyping, isValid.data.userId]))
                        }))
                        break;
                    }
                    case "USER_TYPING_STOP":{
                        const isValid = validateResponseBody.safeParse(message.data);

                        if(!isValid.success){
                            console.log(isValid.error);
                            break
                        }

                        set((state) => ({
                            userIdTyping: state.userIdTyping.filter((userId) => userId !== isValid.data.userId),
                        }))
                        break;
                    }

                    case "GET_INITIAL_INFO": {
                        const isValid = validateOnlineBody.safeParse(message.data);

                        if(!isValid.success){
                            console.log(isValid.error);
                            break
                        }

                        set((state) => ({
                            onlineUsers: Array.from(new Set([...state.onlineUsers, ...isValid.data.users]))
                        }));
                        break;
                    }

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