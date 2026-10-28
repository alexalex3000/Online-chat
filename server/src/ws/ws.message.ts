import { firstValidate, WsMessage } from "./ws.types";
import { userServiceObj } from "../modules/user/user.service";
import { wsManager } from "./ws.manager";
import { messageBodyValidateSchema } from "../modules/message/message.schema";

export async function wsMessage(userId: string, rawData: string) {
    let userData: WsMessage;

    try {
        userData = JSON.parse(rawData);
    } catch {
        wsManager.sendToUser(userId, {
            type: "ERROR",
            data: { success: false, message: "Can not decode JSON" }
        });
        return;
    }

    const validateType = firstValidate.safeParse(userData);
    if (!validateType.success) {
        wsManager.sendToUser(userId, {
            type: "ERROR",
            data: { success: false, message: "Bad data type format" }
        });
        return;
    }

    switch (userData.type) {
        case "NEW_MESSAGE": {
            const validation = messageBodyValidateSchema.safeParse(userData.data);

            if (!validation.success) {
                wsManager.sendToUser(userId, {
                    type: "ERROR",
                    data: {
                        success: false,
                        message: "Bad data format",
                        errors: validation.error.format()
                    }
                });
                return;
            }

            const clients = await userServiceObj.getUsersId();

            wsManager.sendToUsers(clients, {
                type: "NEW_MESSAGE",
                data: validation.data
            });
            break;
        }

        case "USER_TYPING":
        case "USER_TYPING_STOP":
            wsManager.broadcast({
                type: userData.type,
                data: {
                    userId: userId
                }
            });
            break;

        default:
            console.warn(`Unknown message type: ${(userData as any).type}`);
    }
}