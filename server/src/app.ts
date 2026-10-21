import express, {Request, Response} from 'express';
import {errorMiddleware} from "./middleware/error.middleware";
import messageRouter from "./modules/message/message.route";
import settingsRoute from "./modules/settings/settings.route";
import cookieParser from "cookie-parser";


const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/message", messageRouter)
app.use("/api/v1/settings/:userId", settingsRoute)
app.use("/api/v1/auth", messageRouter)

app.use((req: Request, res: Response) => {
    res.status(404).send({success: false, error: 'Not Found 404'});
})

app.use(errorMiddleware);

export default app;