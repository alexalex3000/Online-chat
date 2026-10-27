import { Request, Response, NextFunction } from "express";
import { ChangeUser } from "./user.schema";
import { userServiceObj } from "./user.service";
import { AuthenticatedRequest } from "../../middleware/checkCookie.middleware";

export class UserController {
    async getUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const currentUserId = req.user!.id;

            const result = await userServiceObj.getUser(currentUserId);

            return res.status(200).json({
                success: true,
                user: result
            });
        } catch (e) {
            next(e);
        }
    }

    async getUsers(req: AuthenticatedRequest<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const currentUserId = req.user!.id;

            if (currentUserId !== id) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden: Access denied to this resource"
                });
            }

            const result = await userServiceObj.getUsers();

            return res.status(200).json({
                success: true,
                users: result
            });
        } catch (e) {
            next(e);
        }
    }

    async changeUser(req: AuthenticatedRequest<{}, {}, ChangeUser>, res: Response, next: NextFunction) {
        try {
            const currentUserId = req.user!.id;

            const result = await userServiceObj.changeUser(currentUserId, req.body);

            return res.status(200).json({
                success: true,
                user: result
            });
        } catch (e) {
            next(e);
        }
    }

    async getUserCount(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await userServiceObj.getUserCount();

            return res.status(200).json({
                success: true,
                total: result
            });
        } catch (e) {
            next(e);
        }
    }
}

export const userControllerObj = new UserController();