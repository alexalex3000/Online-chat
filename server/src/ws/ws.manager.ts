import { WebSocket } from "ws";
import { WsMessage } from "./ws.types";

class WsManager {
    private clients = new Map<string, Set<WebSocket>>();

    addClient(userId: string, socket: WebSocket): boolean {
        const isFirstConnection = !this.clients.has(userId);

        if (isFirstConnection) {
            this.clients.set(userId, new Set());
        }
        this.clients.get(userId)!.add(socket);

        return isFirstConnection;
    }

    removeClient(userId: string, socket: WebSocket): boolean {
        const userSockets = this.clients.get(userId);
        if (!userSockets) return false;

        userSockets.delete(socket);

        if (userSockets.size === 0) {
            this.clients.delete(userId);
            return true;
        }

        return false;
    }

    sendToUser(userId: string, message: WsMessage) {
        const userSockets = this.clients.get(userId);
        if (!userSockets) return;

        const data = JSON.stringify(message);
        userSockets.forEach((ws) => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(data);
            }
        });
    }

    sendToUsers(usersId: { id: string }[], message: WsMessage) {
        const data = JSON.stringify(message);

        for (const user of usersId) {
            const userSockets = this.clients.get(user.id);
            if (!userSockets) continue;

            userSockets.forEach((ws) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(data);
                }
            });
        }
    }

    broadcast(message: WsMessage) {
        const data = JSON.stringify(message);

        this.clients.forEach((sockets) => {
            sockets.forEach((ws) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(data);
                }
            });
        });
    }

    isUserOnline(userId: string): boolean {
        return this.clients.has(userId);
    }

    getOnline(): number {
        return this.clients.size;
    }

    getOnlineIds(){
        return Array.from(this.clients.keys());
    }
}

export const wsManager = new WsManager();