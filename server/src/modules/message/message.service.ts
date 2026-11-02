import {db} from "../../db";
import {messageTable} from "../../db/schema";
import {MessageBody} from "./message.schema";

export class MessageService {
    async getAll() {
        const resData = await db
            .select()
            .from(messageTable)

        return resData ?? null
    }

    async getPart() {
        const resData = await db
            .select()
            .from(messageTable)
            .limit(50)

        return resData ?? null
    }
}

export const messageServiceObj = new MessageService()