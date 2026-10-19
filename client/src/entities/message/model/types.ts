import {User} from "@/entities/user/model/types";

export type MessageStatusType = "pending" | "success" | "error";

export interface Message {
    message: string;
    status: MessageStatusType;
    owner: User
    date: Date
}