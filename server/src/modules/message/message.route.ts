import {Router} from "express";
import {validateMiddleware} from "../../middleware/validate.middleware";
import {messageQueryValidateSchema} from "./message.schema";
import {messageControllerObject} from "./message.controller";
import {authMiddleware} from "../../middleware/checkCookie.middleware";

const messageRouter = Router();

messageRouter
    .route("/")
    .get(
        authMiddleware,
        validateMiddleware({
            query: messageQueryValidateSchema
        }),
        messageControllerObject.getAll
    )

export default messageRouter