import { Request, Response, NextFunction } from 'express';
import {z, ZodError} from "zod";

interface ValidateMiddleware {
    body?: z._ZodType,
    query?: z._ZodType,
    params?: z._ZodType,
}

export const validateMiddleware = (obj: ValidateMiddleware) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            if(obj.body){
                req.body = await obj.body.parseAsync(req.body);
            }

            if(obj.params){
                const parsedQuery = await obj.params.parseAsync(req.params);
                Object.defineProperty(req, "params", {
                    value: parsedQuery,
                    writable: true,
                    enumerable: true,
                    configurable: true,
                });            }

            if(obj.query){
                const parsedQuery = await obj.query.parseAsync(req.query);
                Object.defineProperty(req, "query", {
                    value: parsedQuery,
                    writable: true,
                    enumerable: true,
                    configurable: true,
                });
            }

            next()
        } catch (error){
            if (error instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    errors: error.issues.map((issue) => ({
                        field: issue.path.join("."),
                        message: issue.message,
                    })),
                });
            }
            next(error);
        }
    }
}