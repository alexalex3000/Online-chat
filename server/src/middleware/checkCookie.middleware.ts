import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { db } from "../db";
import { sessionTable } from "../db/schema";
import { eq } from "drizzle-orm";

export interface AuthenticatedRequest<
    P = Record<string, any>,
    ResBody = any,
    ReqBody = any,
    ReqQuery = any
> extends Request<P, ResBody, ReqBody, ReqQuery> {
    user?: {
        id: string;
        email: string;
    };
}

export async function authMiddleware(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ success: false, message: "Unauthorized: Refresh token missing" });
    }

    try {
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as {
            id: string;
            email: string;
        };

        const existingSession = await db.query.sessionTable.findFirst({
            where: eq(sessionTable.refreshToken, refreshToken),
        });

        if (!existingSession) {
            return res.status(401).json({ success: false, message: "Session revoked or expired" });
        }

        req.user = { id: payload.id, email: payload.email };
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Session expired or invalid" });
    }
}