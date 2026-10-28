import { Request, Response, NextFunction } from "express";
import { authServiceObj } from "./auth.service";
import { LoginData, RegisterData } from "./auth.schema";
import { AuthenticatedRequest } from "../../middleware/checkCookie.middleware";

const IS_PROD = process.env.NODE_ENV === "production";

const ACCESS_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax" as const,
    maxAge: 15 * 60 * 1000,
    path: "/",
};

const REFRESH_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "strict" as const,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "/",
};

export class AuthController {
    async register(req: Request<{}, {}, RegisterData>, res: Response, next: NextFunction) {
        try {
            const result = await authServiceObj.register(req.body);
            res.cookie("accessToken", result.tokens.accessToken, ACCESS_COOKIE_OPTIONS);
            res.cookie("refreshToken", result.tokens.refreshToken, REFRESH_COOKIE_OPTIONS);

            return res.status(201).json({
                success: true,
                user: result.user,
            });
        } catch (e) {
            next(e);
        }
    }

    async login(req: Request<{}, {}, LoginData>, res: Response, next: NextFunction) {
        try {
            const result = await authServiceObj.login(req.body);

            res.cookie("accessToken", result.tokens.accessToken, ACCESS_COOKIE_OPTIONS);
            res.cookie("refreshToken", result.tokens.refreshToken, REFRESH_COOKIE_OPTIONS);

            console.log(result);

            return res.status(200).json({
                success: true,
                user: result.user,
            });
        } catch (e) {
            next(e);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;

            const result = await authServiceObj.refresh(refreshToken);

            res.cookie("accessToken", result.tokens.accessToken, ACCESS_COOKIE_OPTIONS);
            res.cookie("refreshToken", result.tokens.refreshToken, REFRESH_COOKIE_OPTIONS);

            return res.status(200).json({
                success: true,
                user: result.user,
            });
        } catch (e) {
            next(e);
        }
    }

    async logout(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;

            if (refreshToken) {
                await authServiceObj.logout(refreshToken);
            }

            res.clearCookie("accessToken", { path: "/" });
            res.clearCookie("refreshToken", { path: "/" });

            return res.status(200).json({
                success: true,
                message: "Logged out from current device",
            });
        } catch (e) {
            next(e);
        }
    }

    allLogout = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;

            await authServiceObj.logoutAll(userId);

            res.clearCookie("accessToken", { path: "/" });
            res.clearCookie("refreshToken", { path: "/" });

            return res.status(200).json({
                success: true,
                message: "Logged out from all devices",
            });
        } catch (e) {
            next(e);
        }
    };
}

export const authControllerObj = new AuthController();