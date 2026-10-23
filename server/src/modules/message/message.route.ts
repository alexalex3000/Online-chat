import {Router} from "express";
import {validateMiddleware} from "../../middleware/validate.middleware";
import {messageBodyValidateSchema, messageQueryValidateSchema} from "./message.schema";
import {messageControllerObject} from "./message.controller";
import {authMiddleware} from "../../middleware/checkCookie.middleware";

const messageRouter = Router();

messageRouter
    .route("/")
    .get(
        validateMiddleware({
            query: messageQueryValidateSchema
        }),
        messageControllerObject.getAll
    )
    .post(
        authMiddleware,
        validateMiddleware({
            body: messageBodyValidateSchema
        }),
        messageControllerObject.addMessage
    )

export default messageRouter