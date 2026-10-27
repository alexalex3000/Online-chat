import { WebSocket } from "ws";
import {z} from "zod";

type WsServerTypes = "NEW_MESSAGE"
    | "USER_TYPING"
    | "USER_ONLINE"
    | "USER_OFFLINE"
    | "ERROR"

type WsClientTypes = "MESSAGE_SEND"
    | "TYPING_START"
    | "TYPING_STOP";

export interface WsServerMessage<T = unknown> {
    type: WsServerTypes;
    data: T
}

export interface WsClientMessage<T = unknown> {
    type: WsClientTypes;
    data: T
}

export interface ExtWebSocket extends WebSocket {
    isAlive: boolean;
    userId?: string;
}

export const firstValidate = z.object({
    type: z.enum([
        "MESSAGE_SEND", "TYPING_START", "TYPING_STOP"
    ]),
    data: z.unknown(),
})