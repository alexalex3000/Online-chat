import { create } from "zustand";

// Типы сообщений от клиента к серверу
export type WsClientType = "MESSAGE_SEND" | "TYPING_START" | "TYPING_STOP";

export interface WsClientMessage<T = unknown> {
    type: WsClientType;
    data: T;
}

export type WsServerType = "USER_ONLINE" | "USER_OFFLINE" | "MESSAGE_NEW" | "USER_TYPING";

export interface WsServerMessage<T = unknown> {
    type: WsServerType;
    data: T;
}

interface UseWebsocket {
    socket: WebSocket | null;
    isConnected: boolean;
    connect: () => void;
    disconnect: () => void;
    sendMessage: (data: WsClientMessage) => void;
    userIdTyping: string | null;
}

const WEBSOCKET_URL = process.env.WS_SERVER_ENDPOINT || "ws://localhost:4200/ws";

let reconnectTimer: NodeJS.Timeout | null = null;

export const useWebsocket = create<UseWebsocket>((set, get) => ({
    socket: null,
    isConnected: false,
    userIdTyping: null,

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
        };

        ws.onmessage = (event) => {
            try {
                const message: WsServerMessage = JSON.parse(event.data);

                switch (message.type) {
                    case "USER_ONLINE":

                        break;
                    case "MESSAGE_NEW":
                        break;
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
            set({ isConnected: false, socket: null });

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
            set({ isConnected: false, socket: null });
        }
    },

    sendMessage: (data: WsClientMessage) => {
        const { socket, isConnected } = get();

        if (socket && isConnected && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(data));
        } else {
            console.warn("WebSocket is not connected. Message dropped:", data);
        }
    },
}));