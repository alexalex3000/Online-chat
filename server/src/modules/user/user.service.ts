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


        console.log(wsManager.getOnline())

        return {
            total: totalResult?.value ?? 0,
            onlineTotal: wsManager.getOnline(),
        };
    }

    async getUsersId(){
        const users = await db
            .select({id: userTable.id})
            .from(userTable)

        return users
    }

    async getUsers(){
        const users = await db
            .select({
                id: userTable.id,
                name: userTable.name,
                surname: userTable.surname,
                email: userTable.email,
                username: userTable.username,
                logoUrl: userTable.logoUrl
            })
            .from(userTable)

        const result = users.map(user => ({
            ...user,
            online: wsManager.isUserOnline(user.id)
        }))

        return result || []
    }
}

export const userServiceObj = new UserService();