import {Router} from "express";
import {authControllerObj} from "./auth.controller";

const authRoute = Router();

authRoute.post("/register", authControllerObj.register);
authRoute.post("/login", authControllerObj.login);
authRoute.post("/refresh", authControllerObj.refresh);
authRoute.post("/logout", authControllerObj.logout);
authRoute.post("/all-logout", authControllerObj.allLogout);