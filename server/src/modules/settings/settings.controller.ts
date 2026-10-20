import {Request, Response, NextFunction} from "express";
import {settingsServiceObj} from "./setting.service";
import type {UserIdType} from "./settings.schema";

export class SettingsController {
    async getSettings(req: Request, res: Response, next: NextFunction) {
        try{
            const result = await settingsServiceObj.getSettings()

            res.status(200).json({
                success: true,
                data: result
            })
        } catch (e){
            next(e)
        }
    }

    async changeSetting(req: Request<UserIdType>, res: Response, next: NextFunction) {
        try{
            const result = await settingsServiceObj.changeSetting(req.body, req.params.userId)

            res.status(200).json({
                success: true,
                data: result
            })
        } catch (e){
            next(e)
        }
    }
}

export const settingsContollerObj = new SettingsController();