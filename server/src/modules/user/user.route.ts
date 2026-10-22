import {Router} from "express";
import {userControllerObj} from "./user.controller";
import {validateMiddleware} from "../../middleware/validate.middleware";
import {changeUserValidateSchema} from "./user.schema";

const userRoute = Router();

userRoute
    .route("/")
    .get(userControllerObj.getUserCount)

userRoute
    .route("/:id")
    .get(userControllerObj.getUser)
    .post(validateMiddleware({body: changeUserValidateSchema}),userControllerObj.changeUser)

export default userRoute;