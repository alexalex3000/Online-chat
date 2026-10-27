import * as http from "node:http";
import { WebSocketServer, WebSocket } from "ws";
import { wsManager } from "./ws.manager";
import { ExtWebSocket } from "./ws.types";
import { tokenServiceObj } from "../modules/auth/token.service";
import jwt from "jsonwebtoken";
import { db } from "../db";
import { sessionTable } from "../modules/auth/auth.schema";
import { eq } from "drizzle-orm";

function parseCookies(cookieHeader: string = ''): Record<string, string> {
    const list: Record<string, string> = {};
    if (!cookieHeader) return list;

    cookieHeader.split(';').forEach((cookie) => {
        const parts = cookie.split('=');
        const name = parts.shift()?.trim();
        const value = parts.join('=').trim();
        if (name) {
            list[name] = decodeURIComponent(value);
        }
    });

    return list;
}

export function initWebsocket(server: http.Server) {
    const wss = new WebSocketServer({ noServer: true });

    server.on("upgrade", async (req, socket, head) => {
        try {
            const url = new URL(req.url || "", `http://${req.headers.host}`);

            if (url.pathname !== "/ws") {
                socket.destroy();
                return;
            }

            const cookies = parseCookies(req.headers.cookie);
            const { accessToken, refreshToken } = cookies;

            if (!accessToken || !refreshToken) {
                socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
                socket.destroy();
                return;
            }

            let userId: string | null = null;

            try {
                const payload = tokenServiceObj.verifyAccessToken(accessToken);

                if (!payload || payload.userId === null) {
                    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
                    socket.destroy();
                    return;
                }
                userId = payload.userId;
            } catch (e) {
                if (!(e instanceof jwt.TokenExpiredError)) {
                    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
                    socket.destroy();
                    return;
                }
            }

            if (!userId && refreshToken) {
                try {
                    const payload = tokenServiceObj.verifyRefreshToken(refreshToken);

                    if (!payload) {
                        socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
                        socket.destroy();
                        return;
                    }

                    const [session] = await db
                        .select()
                        .from(sessionTable)
                        .where(eq(sessionTable.refreshToken, refreshToken));

                    if (!session) {
                        socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
                        socket.destroy();
                        return;
                    }

                    userId = payload.userId;
                } catch {
                    userId = null;
                }
            }

            if (!userId) {
                socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
                socket.destroy();
                return;
            }

            wss.handleUpgrade(req, socket, head, (ws) => {
                (ws as any).userId = userId;
                wss.emit("connection", ws, req);
            });
        } catch (e) {
            console.error("WS upgrade error:", e);
            socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
            socket.destroy();
        }
    });

    wss.on("connection", (socket: WebSocket) => {
        const ws = socket as ExtWebSocket;
        const userId = ws.userId!;

        wsManager.addClient(userId, ws);

        wsManager.broadcast({
            type: "USER_ONLINE",
            data: {
                userId: userId,
            },
        });
        ws.isAlive = true;

        ws.on("close", () => {
            wsManager.removeClient(userId, ws);
        });

        ws.on("pong", () => {
            ws.isAlive = true;
        });

        ws.on("error", (err) => {
            console.error("WS client error:", err);
            wsManager.removeClient(userId, ws);
        });
    });

    const interval = setInterval(() => {
        wss.clients.forEach((client) => {
            const socket = client as ExtWebSocket;
            if (!socket.isAlive) return socket.terminate();

            socket.isAlive = false;
            socket.ping();
        });
    }, 30000);

    wss.on("close", () => {
        clearInterval(interval);
    });
}