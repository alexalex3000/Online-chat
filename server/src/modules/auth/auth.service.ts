import {LoginData, RegisterData, TokenPayload} from "./auth.schema";
import {db} from "../../db";
import {userTable} from "../user/user.schema";
import {eq} from "drizzle-orm";
import argon2 from "argon2";
import {config} from "dotenv";
import {tokenServiceObj} from "./token.service";
import {settingsTable} from "../settings/settings.schema";

config({path: ".env.local"});

const PEPPER = Buffer.from(process.env.PEPPER || "", "utf-8");

export class AuthService {
    async register(userData:RegisterData){
        const [userExist] = await db
            .select()
            .from(userTable)
            .where(eq(userTable.email, userData.email))

        if(userExist){
            throw new Error("User with email already exists");
        }

        const passwordHashCoded = await argon2.hash(userData.password, {
            type: argon2.argon2id,
            secret: PEPPER
        });

        const newUser = await db.transaction(async (tx) => {
            const [user] = await tx
                .insert(userTable)
                .values({
                    name: userData.name,
                    surname: userData.surname,
                    username: userData.username,
                    email: userData.email,
                    passwordHash:passwordHashCoded,
                })
                .returning();

            await tx.insert(settingsTable).values({
                userId: user.id,
                chatSounds: true,
                pinnedMessageAlerts: true,
                showOnlineStatus: true,
                doNotDistract: false,
            });

            return user;
        });

        const payload: TokenPayload = {
            userId: newUser.id,
            role: newUser.role,
        }

        const tokens = tokenServiceObj.generateTokens(payload)

        await tokenServiceObj.createSession(newUser.id, tokens.refreshToken)

        const {passwordHash, ...userWithoutPassword} = newUser

        return {
            user: userWithoutPassword,
            tokens: tokens,
        }
    }

    async login(userData: LoginData){
        const [user] = await db
            .select()
            .from(userTable)
            .where(eq(userTable.email, userData.email))

        if(!user){
            throw new Error("Cant find user with this email");
        }

        const passwordVerified = await argon2.verify(user.passwordHash, userData.password, {
            secret: PEPPER
        })

        if(!passwordVerified){
            throw new Error("Check your email or password");
        }

        const payload: TokenPayload = {
            userId: user.id,
            role: user.role,
        }

        const tokens = tokenServiceObj.generateTokens(payload)

        await tokenServiceObj.createSession(user.id, tokens.refreshToken)

        const {passwordHash, ...userWithoutPassword} = user

        return {
            user: userWithoutPassword,
            tokens: tokens,
        }
    }

    async refresh(oldRefreshToken: string){
        if(!oldRefreshToken){
            throw new Error("Refresh token is required");
        }

        const verifyToken = tokenServiceObj.verifyRefreshToken(oldRefreshToken)
        const isSessionExist = await tokenServiceObj.findSessionByToken(oldRefreshToken)

        if(!verifyToken || !isSessionExist){
            throw new Error("Invalid or expired session");
        }

        const [user] = await db
            .select()
            .from(userTable)
            .where(eq(userTable.id, verifyToken.userId))

        if(!user){
            throw new Error("User not found");
        }

        const payload = {
            userId: user.id,
            role: user.role,
        }

        const tokens = tokenServiceObj.generateTokens(payload)

        await tokenServiceObj.updateSessionToken(oldRefreshToken, tokens.refreshToken)

        const {passwordHash, ...userWithoutPassword} = user

        return {
            user: userWithoutPassword,
            tokens: tokens,
        }
    }

    async logout(refreshToken: string){
        await tokenServiceObj.deleteSession(refreshToken)
    }

    async logoutAll(userId: string){
        await tokenServiceObj.deleteAllSessions(userId)
    }
}

export const authServiceObj = new AuthService();