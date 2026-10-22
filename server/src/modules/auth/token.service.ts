import {config} from "dotenv";
import {sessionTable, TokenPayload} from "./auth.schema";
import jwt from "jsonwebtoken";
import {db} from "../../db";
import {eq} from "drizzle-orm";
import {userTable} from "../user/user.schema";

config({path: ".env.local"});

export class TokenService {
    private readonly accessSecret = process.env.JWT_ACCESS_SECRET || "access_secret";
    private readonly refreshSecret = process.env.JWT_REFRESH_SECRET || "refresh_secret";
    private readonly accessExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN || "15m";
    private readonly refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || "30d";

    generateTokens(payload:TokenPayload){
        const accessToken = jwt.sign(payload, this.accessSecret, {
            expiresIn: this.accessExpiresIn as jwt.SignOptions["expiresIn"]
        })

        const refreshToken = jwt.sign(payload, this.refreshSecret, {
            expiresIn: this.refreshExpiresIn as jwt.SignOptions["expiresIn"]
        })

        return {accessToken, refreshToken};
    }

    verifyAccessToken(accessToken: string){
        try{
            return jwt.verify(accessToken, this.accessSecret) as TokenPayload;
        } catch (e){
            return null
        }
    }

    verifyRefreshToken(refreshToken: string){
        try{
            return jwt.verify(refreshToken, this.refreshSecret) as TokenPayload;
        } catch (e){
            return null
        }
    }

    async createSession(userId: string, refreshToken: string){
        const expiresAt = new Date();
        const currDate = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);

        await db
            .update(userTable)
            .set({
                lastTimeOnline: currDate
            })

        const [session] = await db
            .insert(sessionTable)
            .values({
                userId,
                refreshToken,
                expiresAt,
                createdAt: currDate,
            })
            .returning()

        return session;
    }

    async findSessionByToken(refresToken: string){
        const [session] = await db
            .select()
            .from(sessionTable)
            .where(eq(sessionTable.refreshToken, refresToken))

        return session || null;
    }

    async updateSessionToken(oldRefreshToken: string, refreshToken: string){
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);

        const [updated] = await db
            .update(sessionTable)
            .set({
                refreshToken,
                expiresAt
            })
            .where(eq(sessionTable.refreshToken, oldRefreshToken))
            .returning()

        return updated;
    }

    async deleteSession(refreshToken: string){
        await db
            .delete(sessionTable)
            .where(eq(sessionTable.refreshToken, refreshToken))
    }

    async deleteAllSessions(userId: string){
        await db
            .delete(sessionTable)
            .where(eq(sessionTable.userId, userId))
    }
}

export const tokenServiceObj = new TokenService();