import {Request, Response, NextFunction} from "express";
import {authServiceObj} from "./auth.service";
import {LoginData, RegisterData} from "./auth.schema";

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 30 * 24 * 60 * 60 * 1000,
};

export class AuthController {
    async register(req: Request<{}, {}, RegisterData>, res: Response, next: NextFunction) {
        try {
            const result = await authServiceObj.register(req.body);
            res.cookie("refreshToken", result.tokens.refreshToken, COOKIE_OPTIONS);

            res.status(200).json({
                success: true,
                user: result.user,
                accessToken: result.tokens.accessToken,
            });
        } catch (e){
            next(e)
        }
    }
    async login(req: Request<{}, {},LoginData>, res: Response, next: NextFunction) {
        try {
            const result = await authServiceObj.login(req.body);
            res.cookie("refreshToken", result.tokens.refreshToken, COOKIE_OPTIONS);

            res.status(200).json({
                success: true,
                user: result.user,
                accessToken: result.tokens.accessToken,
            });
        } catch (e){
            next(e)
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            const result = await authServiceObj.refresh(refreshToken);
            res.cookie("refreshToken", result.tokens.refreshToken, COOKIE_OPTIONS);
            res.status(200).json({
                success: true,
                user: result.user,
                accessToken: result.tokens.accessToken,
            });
        } catch (e){
            next(e)
        }
    }
    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            await authServiceObj.logout(refreshToken);

            res.clearCookie("refreshToken");

            res.status(200).json({
                success: true,
                message: "Logged out from current device",
            });
        } catch (e){
            next(e)
        }
    }

    allLogout = async (req: Request<{}, {}, { userId: string }>, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.body;
            await authServiceObj.logoutAll(userId);

            res.clearCookie("refreshToken");

            res.status(200).json({
                success: true,
                message: "Logged out from all devices",
            });
        } catch (e) {
            next(e);
        }
    }
}

export const authControllerObj = new AuthController();