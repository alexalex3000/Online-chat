import { WebSocket } from "ws";
import {z} from "zod";

type WsTypes = "NEW_MESSAGE"
    | "USER_TYPING"
    | "USER_ONLINE"
    | "USER_OFFLINE"
    | "ERROR"
    | "GET_INITIAL_INFO"


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
        "NEW_MESSAGE"
        , "USER_TYPING"
        , "USER_ONLINE"
        ,"USER_OFFLINE"
        , "ERROR"
        ,"GET_INITIAL_INFO"]),
    data: z.unknown().optional(),
})