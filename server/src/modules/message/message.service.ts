import {db} from "../../db";
import {messageTable} from "./message.schema";

export class MessageService {
    async getAll() {
        const resData = await db
            .select()
            .from(messageTable)

        return resData ?? null
    }

    async getPart() {
        const data = await db.query.messageTable.findMany({
            limit: 30,
            orderBy: (messages, { desc }) => [desc(messages.date)],
            with: {
                user: true
            }
        })

        const messages= data.map((item) => ({
            id: item.id,
            message: item.message,
            date: item.date,
            status: "success",
            owner: item.user,
        }));

        messages.reverse()

        return messages ?? null
    }
}

export const messageServiceObj = new MessageService()