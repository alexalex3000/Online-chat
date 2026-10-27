import app from "./app";
import dotenv from 'dotenv';
import * as http from "node:http";
import {initWebsocket} from "./ws";

dotenv.config();

const server = http.createServer(app)

initWebsocket(server);

server.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`);
});
