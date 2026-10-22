import {Router} from "express";
import {authControllerObj} from "./auth.controller";
import {validateMiddleware} from "../../middleware/validate.middleware";
import {loginValidateSchema, logoutAllValidateSchema, registerValidateSchema} from "./auth.schema";

const authRoute = Router();

authRoute.post("/register", validateMiddleware({body: registerValidateSchema}), authControllerObj.register);
authRoute.post("/login", validateMiddleware({body: loginValidateSchema}), authControllerObj.login);
authRoute.post("/refresh", authControllerObj.refresh);
authRoute.post("/logout", authControllerObj.logout);
authRoute.post("/all-logout", validateMiddleware({body: logoutAllValidateSchema}), authControllerObj.allLogout);

export default authRoute;