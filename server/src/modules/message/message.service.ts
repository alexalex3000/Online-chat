import { db } from "../../db";
import { messageTable } from "./message.schema";
import { userTable } from "../user/user.schema";
import { desc, eq, sql } from "drizzle-orm";

export class MessageService {
    async getAll() {
        const resData = await db
            .select()
            .from(messageTable);

        return resData ?? null;
    }

    async getPart(cursor?: string) {
        const query = db
            .select({
                id: messageTable.id,
                message: messageTable.message,
                date: messageTable.date,
                user: userTable,
            })
            .from(messageTable)
            .leftJoin(userTable, eq(messageTable.userId, userTable.id))
            .orderBy(desc(messageTable.date), desc(messageTable.id))
            .limit(30);

        if (cursor) {
            query.where(
                sql`(${messageTable.date}, ${messageTable.id}) < (
                    SELECT m.date, m.id 
                    FROM ${messageTable} m 
                    WHERE m.id = ${cursor}::uuid
                )`
            );
        }

        const data = await query;

        const messages = data.map((item) => ({
            id: item.id,
            message: item.message,
            date: item.date,
            status: "success" as const,
            owner: item.user,
        }));

        messages.reverse();

        return messages;
    }
}

export const messageServiceObj = new MessageService();