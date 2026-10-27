import { WebSocket } from "ws";
import {WsMessage} from "./ws.types";

export class WebSocketManager {
    private clients = new Map<string, WebSocket>();

    addClient(userId: string, client: WebSocket) {
        this.clients.set(userId, client);
    }

    removeClient(userId: string) {
        this.clients.delete(userId);
    }

    sendToUser<T>(userId: string, data: WsMessage<T>) {
        const socket = this.clients.get(userId);

        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(data));
            return true
        }

        return false
    }

    sendToUsers<T>(usersId: string[], data: WsMessage<T>) {
        const rawData = JSON.stringify(data);

        for(const userId of usersId){
            const socket = this.clients.get(userId);

            if(socket && socket.readyState === WebSocket.OPEN) {
                socket.send(rawData);
            }
        }
    }
}

export const wsManager = new WebSocketManager();