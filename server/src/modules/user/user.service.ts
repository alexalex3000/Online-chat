import {ChangeUser, User, userTable} from "./user.schema";
import {db} from "../../db";
import {count, eq, gte, sql} from "drizzle-orm";

export class UserService{
    async getUser(id: string){
        const [user] = await db
            .select()
            .from(userTable)
            .where(eq(userTable.id, id))

        const {passwordHash, ...safeUser} = user

        return safeUser || null
    }

    async changeUser(userId:string, userData: ChangeUser){
        const [changed] = await db
            .update(userTable)
            .set(userData)
            .where(eq(userTable.id, userId))
            .returning()

        const {passwordHash, ...safeUser} = changed

        return safeUser || null
    }

    async getUserCount(){
        const [totalResult] = await db
            .select({ value: count() })
            .from(userTable);

        const [onlineResult] = await db
            .select({ value: count() })
            .from(userTable)
            .where(
                sql`${userTable.lastTimeOnline} >= NOW() - INTERVAL '5 minutes'`
            );
        
        return {
            total: totalResult?.value ?? 0,
            onlineTotal: onlineResult?.value ?? 0,
        };
    }
}

export const userServiceObj = new UserService();