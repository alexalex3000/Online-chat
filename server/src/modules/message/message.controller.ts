import {Request, Response, NextFunction} from "express";
import {messageServiceObj} from "./message.service";
import {type UserIdType} from "../settings/settings.schema";
import {AuthenticatedRequest} from "../../middleware/checkCookie.middleware";

export class MessageController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try{
            const result = await messageServiceObj.getAll()

            res.status(200).json({
                success: true,
                data: result
            })
        } catch (e){
            next(e)
        }
    }
}

export const messageControllerObject = new MessageController()