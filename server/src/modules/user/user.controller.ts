import { Request, Response, NextFunction } from "express";
import {ChangeAvatar, ChangeUser} from "./user.schema";
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


    async getUserById(req: AuthenticatedRequest<{id: string}>, res: Response, next: NextFunction) {
        try{
            const userId = req.params.id;

            const result = await userServiceObj.getUser(userId);

            return res.status(200).json({
                success: true,
                user: result
            });
        } catch (e){
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

    async updateLastTimeOnline(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try{
            const userId = req.user!.id;

            const result = await userServiceObj.updateLastTimeOnline(userId);

            return res.status(200).json({
                success: true,
                lastTimeOnline: result
            });
        } catch (e){
            next(e);
        }
    }

    async updateUserAvatar(req: AuthenticatedRequest<{}, {}, ChangeAvatar>, res: Response, next: NextFunction){
        try{
            const userId = req.user!.id;

            const {logoUrl} = req.body

            if(!logoUrl){
                throw new Error("Cant find avatar")
            }

            const result = await userServiceObj.changeUserAvatar(userId, logoUrl);

            return res.status(200).json({
                success: true,
                lastTimeOnline: result
            });
        } catch (e){
            next(e);
        }
    }
}

export const userControllerObj = new UserController();