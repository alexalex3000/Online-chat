import {ChangeUser, User, userTable} from "./user.schema";
import {db} from "../../db";
import {count, eq, gte, sql} from "drizzle-orm";
import {wsManager} from "../../ws/ws.manager";

export class UserService{
    async getUser(id: string){
        const [user] = await db
            .select()
            .from(userTable)
            .where(eq(userTable.id, id))

        if(!user){
            throw new Error("No user found");
        }

        const {passwordHash, ...safeUser} = user;

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

        if(!totalResult){
            throw new Error("No user found");
        }

        return {
            total: totalResult?.value ?? 0,
            onlineTotal: wsManager.getOnline(),
        };
    }

    async getUsersId(){
        const users = await db
            .select({id: userTable.id})
            .from(userTable)

        if(!users.length){
            throw new Error("No user found");
        }

        return users
    }

    async getUserById(id: string){
        const [user] = await db
            .select()
            .from(userTable)
            .where(eq(userTable.id, id))

        if(!user){
            throw new Error("No user found");
        }

        const {passwordHash, ...safeUser} = user;

        return safeUser || null;
    }
}

export const userServiceObj = new UserService();