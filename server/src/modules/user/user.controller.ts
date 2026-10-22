import {Request, Response, NextFunction} from "express";
import {ChangeUser, User} from "./user.schema";
import {userServiceObj} from "./user.service";

export class UserController {
    async getUser(req: Request<{id: string}>, res: Response, next: NextFunction) {
        try{
            const {id} = req.params;

            const result = await userServiceObj.getUser(id);

            res.status(200).json({
                success: true,
                user: result
            })
        } catch (e){
            next(e)
        }
    }
    async changeUser(req: Request<{id: string}, {}, ChangeUser>, res: Response, next: NextFunction) {
        try{
            const {id} = req.params;

            const result = await userServiceObj.changeUser(id, req.body);

            res.status(200).json({
                success: true,
                user: result
            })
        } catch (e){
            next(e)
        }
    }
    async getUserCount(req: Request, res: Response, next: NextFunction) {
        try{
            const result = await userServiceObj.getUserCount();

            res.status(200).json({
                success: true,
                total: result
            })
        } catch (e){
            next(e)
        }
    }
}

export const userControllerObj = new UserController();