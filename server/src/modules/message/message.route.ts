import {Router} from "express";
import {validateMiddleware} from "../../middleware/validate.middleware";
import {messageBodyValidateSchema, messageQueryValidateSchema} from "./message.schema";
import {messageControllerObject} from "./message.controller";

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
        validateMiddleware({
            body: messageBodyValidateSchema
        }),
        messageControllerObject.addMessage
    )

export default messageRouter