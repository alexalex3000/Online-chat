import { Request, Response, NextFunction } from "express";
import { tokenServiceObj } from "../modules/auth/token.service";
import jwt from "jsonwebtoken";

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

export function authMiddleware(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    const token = req.cookies?.accessToken;

    if (!token) {
        return res.status(401).json({
            success: false,
            code: "TOKEN_MISSING",
            message: "Unauthorized: Access token missing",
        });
    }

    try {
        const payload = tokenServiceObj.verifyAccessToken(token);

        if (!payload) {
            throw new Error();
        }

        req.user = { id: payload.userId, role: payload.role };
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                success: false,
                code: "TOKEN_EXPIRED",
                message: "Access token has expired",
            });
        }

        return res.status(401).json({
            success: false,
            code: "TOKEN_INVALID",
            message: "Session expired or invalid",
        });
    }
}