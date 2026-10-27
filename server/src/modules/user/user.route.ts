import {Router} from "express";
import {userControllerObj} from "./user.controller";
import {validateMiddleware} from "../../middleware/validate.middleware";
import {changeUserValidateSchema} from "./user.schema";
import {authMiddleware} from "../../middleware/checkCookie.middleware";

const userRoute = Router();

userRoute
    .route("/")
    .get(userControllerObj.getUserCount)

userRoute
    .route("/me")
    .get(authMiddleware,userControllerObj.getUser)
    .patch(authMiddleware,validateMiddleware({body: changeUserValidateSchema}),userControllerObj.changeUser)

export default userRoute;