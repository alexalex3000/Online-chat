import { firstValidate, WsMessage } from "./ws.types";
import { userServiceObj } from "../modules/user/user.service";
import { wsManager } from "./ws.manager";
import {
    deleteMessageValidateSchema,
    editMessageValidateSchema,
    messageBodyValidateSchema,
    messageTable,
    userTypingValidateSchema
} from "../modules/message/message.schema";
import {db} from "../db";
import {messageServiceObj} from "../modules/message/message.service";

const userTyping = new Map<string, NodeJS.Timeout>();

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

            if(userTyping.has(userId)){
                clearTimeout(userTyping.get(userId))
            }
            else{
                wsManager.broadcast({
                    type: userData.type,
                    data: {
                        userId: userId,
                        userFullname: validation.data.userFullname,
                    }
                });
            }

            const timeout = setTimeout(() => {
                userTyping.delete(userId);
                wsManager.broadcast({
                    type: "USER_TYPING_STOP",
                    data: {
                        userId: userId,
                        userFullname: validation.data.userFullname,
                    }
                });
            }, 2000)

            userTyping.set(userId, timeout)

            break;
        case "GET_INITIAL_INFO": {
            const size = wsManager.getOnlineIds()
            const messages = await messageServiceObj.getPart()

            wsManager.sendToUser(userId, {
                type: "GET_INITIAL_INFO",
                data: {
                    users: size,
                    messages: messages
                }
            })
            break
        }
        case "EDIT_MESSAGE": {
            const isValid = editMessageValidateSchema.safeParse(userData.data);

            if(!isValid.success) {
                wsManager.sendToUser(userId, {
                    type: "ERROR",
                    data: {
                        success: false,
                        message: "Bad data format",
                        errors: isValid.error.format()
                    }
                })
                return
            }

            const result = await messageServiceObj.editMessage(isValid.data.id, isValid.data.message)

            wsManager.broadcast({
                type: userData.type,
                data: {
                    message: result
                }
            });

            break;
        }

        case "DELETE_MESSAGE": {
            const isValid = deleteMessageValidateSchema.safeParse(userData.data);

            if(!isValid.success) {
                wsManager.sendToUser(userId, {
                    type: "ERROR",
                    data: {
                        success: false,
                        message: "Bad data format",
                        errors: isValid.error.format()
                    }
                })
                return
            }

            const result = await messageServiceObj.deleteMessage(isValid.data.id)

            wsManager.broadcast({
                type: userData.type,
                data: {
                    id: result.id
                }
            });

            break;
        }
        default:
            console.warn(`Unknown message type: ${(userData as any).type}`);
    }
}