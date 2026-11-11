import express, {Request, Response} from 'express';
import {errorMiddleware} from "./middleware/error.middleware";
import messageRouter from "./modules/message/message.route";
import settingsRoute from "./modules/settings/settings.route";
import cookieParser from "cookie-parser";
import userRoute from "./modules/user/user.route";
import authRoute from "./modules/auth/auth.route";
import cors from "cors";

const app = express()

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

app.use(
    cors({
        origin: CLIENT_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/message", messageRouter)
app.use("/api/v1/settings", settingsRoute)
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/user", userRoute)

app.use((req: Request, res: Response) => {
    res.status(404).send({success: false, error: 'Not Found 404'});
})

app.use(errorMiddleware);

export default app;