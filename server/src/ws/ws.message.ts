import { firstValidate, WsMessage } from "./ws.types";
import { userServiceObj } from "../modules/user/user.service";
import { wsManager } from "./ws.manager";
import {messageBodyValidateSchema, messageTable, userTypingValidateSchema} from "../modules/message/message.schema";
import {db} from "../db";

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
            data: {message: "Bad data type format" }
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

            const [newMessage] = await db
                .insert(messageTable)
                .values({
                    message: validation.data.message,
                    userId: userId,
                })
                .returning()

            const user = await userServiceObj.getUser(userId);

            const clients = await userServiceObj.getUsersId();

            wsManager.sendToUsers(clients, {
                type: "NEW_MESSAGE",
                data: {
                    user: user,
                    message: newMessage,
                    tempId: validation.data.tempId
                }
            });
            break;
        }

        case "USER_TYPING":
            const validation = userTypingValidateSchema.safeParse(userData.data);

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

            wsManager.broadcast({
                type: userData.type,
                data: {
                    userId: userId,
                    userFullname: validation.data.userFullname,
                }
            });
            break;
        case "GET_INITIAL_INFO": {
            const size = wsManager.getOnlineIds()

            wsManager.sendToUser(userId, {
                type: "GET_INITIAL_INFO",
                data: {
                    users: size
                }
            })
            break
        }
        default:
            console.warn(`Unknown message type: ${(userData as any).type}`);
    }
}