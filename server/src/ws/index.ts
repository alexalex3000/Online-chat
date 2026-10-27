import * as http from "node:http";
import {WebSocketServer} from "ws";
import {wsManager} from "./ws.manager";
import { WebSocket } from "ws";
import {ExtWebSocket} from "./ws.types";

export function initWebsocket(server: http.Server) {
    const wss = new WebSocketServer({noServer: true});

    server.on("upgrade", (req, socket, head) => {
        const url = new URL(req.url || "", `http://${req.headers.host}`);

        if (url.pathname !== "/ws") {
            socket.destroy();
            return;
        }

        const userId = url.searchParams.get("userId");
        if (!userId) {
            socket.destroy();
            return;
        }

        wss.handleUpgrade(req, socket, head, (ws) => {
            (ws as ExtWebSocket).userId = userId;
            wss.emit("connection", ws, req);
        });
    });

    wss.on("connection", (socket: WebSocket) => {
        const ws = socket as ExtWebSocket;
        const userId = ws.userId!

        ws.on("close", () => {
            wsManager.removeClient(userId)
        })

        ws.on("pong", () => {
            ws.isAlive = true
        })

        ws.on("error", (err) => {
            console.error(err);
            wsManager.removeClient(userId)
        })
    })

    const interval = setInterval(() => {
        wss.clients.forEach((client) => {
            const socket = client as ExtWebSocket;
            if(!socket.isAlive) socket.terminate();

            socket.isAlive = false;
            socket.ping()
        })
    }, 30000)

    wss.on("close", () => {
        clearInterval(interval)
    })
}