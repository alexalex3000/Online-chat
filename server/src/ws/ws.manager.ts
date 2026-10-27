import { WebSocket } from "ws";
import {WsServerMessage} from "./ws.types";

class WsManager {
    private clients = new Map<string, Set<WebSocket>>();

    addClient(userId: string, socket: WebSocket) {
        if (!this.clients.has(userId)) {
            this.clients.set(userId, new Set());
        }
        this.clients.get(userId)!.add(socket);
    }

    removeClient(userId: string, socket: WebSocket) {
        const userSockets = this.clients.get(userId);
        if (!userSockets) return;

        userSockets.delete(socket);

        if (userSockets.size === 0) {
            this.clients.delete(userId);
        }
    }

    sendToUser(userId: string, message: WsServerMessage) {
        const userSockets = this.clients.get(userId);
        if (!userSockets) return;

        const data = JSON.stringify(message);
        userSockets.forEach((ws) => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(data);
            }
        });
    }

    sendToUsers(usersId: string[], message: WsServerMessage) {
        for(const userId of usersId){
            const userSockets = this.clients.get(userId);
            if (!userSockets) return;

            const data = JSON.stringify(message);
            userSockets.forEach((ws) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(data);
                }
            });
        }
    }
}

export const wsManager = new WsManager();