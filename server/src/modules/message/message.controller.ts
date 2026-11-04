import {Request, Response, NextFunction} from "express";
import {messageServiceObj} from "./message.service";

export class MessageController {
    async getAll(req: Request<{}, {}, {}, {cursor?: string}>, res: Response, next: NextFunction) {
        try{
            const {cursor} = req.query;

            const result = await messageServiceObj.getPart(cursor);

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