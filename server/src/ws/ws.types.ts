import { WebSocket } from "ws";
import {z} from "zod";

type WsTypes = "NEW_MESSAGE"
    | "USER_TYPING"
    | "USER_ONLINE"
    | "USER_TYPING_STOP"
    | "USER_OFFLINE"
    | "ERROR"


export interface WsMessage<T = unknown> {
    type: WsTypes;
    data?: T
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