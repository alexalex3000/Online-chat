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

    async addMessage(req: AuthenticatedRequest<UserIdType>, res: Response, next: NextFunction) {
        try{
            const {userId} = req.params;
            const id = req.user!.id;

            if(userId !== id){
                return res.status(400).json({
                    success: true,
                    message: "Dont have any rights"
                })
            }

            const result = await messageServiceObj.writeMessage(req.body, req.params.userId)

            return res.status(200).json({
                success: true,
                data: result
            })
        } catch (e){
            next(e)
        }
    }
}

export const messageControllerObject = new MessageController()