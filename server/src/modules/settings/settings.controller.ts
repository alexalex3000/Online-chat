import { Response, NextFunction } from "express";
import { settingsServiceObj } from "./settings.service";
import type { UserIdType } from "./settings.schema";
import { AuthenticatedRequest } from "../../middleware/checkCookie.middleware";

export class SettingsController {
    async getSettings(req: AuthenticatedRequest<UserIdType>, res: Response, next: NextFunction) {
        try {
            const currentUserId = req.user!.id;

            const result = await settingsServiceObj.getSettings(currentUserId);

            return res.status(200).json({
                success: true,
                data: result
            });
        } catch (e) {
            next(e);
        }
    }

    async changeSetting(req: AuthenticatedRequest<UserIdType>, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const currentUserId = req.user!.id;

            if (userId !== currentUserId) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden: Cannot update external user settings"
                });
            }

            const result = await settingsServiceObj.changeSetting(req.body, userId);

            return res.status(200).json({
                success: true,
                data: result
            });
        } catch (e) {
            next(e);
        }
    }
}

export const settingsContollerObj = new SettingsController();