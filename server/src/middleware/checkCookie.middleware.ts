import { Request, Response, NextFunction } from "express";
import {tokenServiceObj} from "../modules/auth/token.service";

export interface AuthenticatedRequest<
    P = Record<string, any>,
    ResBody = any,
    ReqBody = any,
    ReqQuery = any
> extends Request<P, ResBody, ReqBody, ReqQuery> {
    user?: {
        id: string;
        role: "user" | "admin";
    };
}

export async function authMiddleware(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Unauthorized: Access token missing" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = tokenServiceObj.verifyAccessToken(token);

        if(!payload) {
            throw new Error();
        }

        req.user = {id: payload.userId, role: payload.role};
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Session expired or invalid" });
    }
}