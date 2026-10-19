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

    async writeMessage(body: MessageBody){
        const [resData] = await db
            .insert(messageTable)
            .values({
                message: body.message,
                userId: body.userId,
            })
            .returning()

        return resData ?? null
    }
}

export const messageServiceObj = new MessageService()