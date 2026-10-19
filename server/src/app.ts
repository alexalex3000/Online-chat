import express, {NextFunction, Request, Response} from 'express';
import {errorMiddleware} from "./middleware/error.middleware";

const app = express()

app.use(express.json())

app.use((req: Request, res: Response) => {
    res.status(404).send({success: false, error: 'Not Found 404'});
})

app.use(errorMiddleware);

export default app;