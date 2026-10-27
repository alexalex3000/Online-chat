import { WebSocket } from "ws";

type WsTypes = "NEW_MESSAGE"
    | "USER_TYPING"
    | "USER_ONLINE"
    | "USER_OFFLINE"

export interface WsMessage<T = unknown> {
    type: WsTypes;
    data: T
}

export interface ExtWebSocket extends WebSocket {
    isAlive: boolean;
    userId?: string;
}