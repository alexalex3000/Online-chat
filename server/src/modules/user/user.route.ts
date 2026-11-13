import {Router} from "express";
import {userControllerObj} from "./user.controller";
import {validateMiddleware} from "../../middleware/validate.middleware";
import {changeUserValidateSchema, getUserByIdValidateSchema} from "./user.schema";
import {authMiddleware} from "../../middleware/checkCookie.middleware";

const userRoute = Router();

userRoute
    .route("/")
    .get(userControllerObj.getUserCount)
    .post(authMiddleware, userControllerObj.updateLastTimeOnline)

userRoute
    .route("/me")
    .get(authMiddleware,userControllerObj.getUser)
    .patch(authMiddleware,validateMiddleware({body: changeUserValidateSchema}),userControllerObj.changeUser)

userRoute
    .route("/:id")
    .get(authMiddleware, userControllerObj.getUserById)

export default userRoute;