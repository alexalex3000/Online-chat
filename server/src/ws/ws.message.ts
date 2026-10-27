import {firstValidate, WsClientMessage} from "./ws.types";
import {userServiceObj} from "../modules/user/user.service";
import {wsManager} from "./ws.manager";
import {messageBodyValidateSchema} from "../modules/message/message.schema";

export async function wsMessage(userId: string, rawData: string) {
    let userData: WsClientMessage

    try{
        userData = JSON.parse(rawData);
    } catch (e){
        wsManager.sendToUser(userId, {
            type: "ERROR",
            data: {
                success: false,
                message: "Can not decode JSON"
            }
        });

        return
    }

    let validateType

    try{
        validateType = firstValidate.parse(userData)
    } catch (e){
        wsManager.sendToUser(userId, {
            type: "ERROR",
            data: {
                success: false,
                message: "Bad data type format",
            }
        });

        return
    }

    switch (userData.type){
        case "MESSAGE_SEND":
            const isValid = messageBodyValidateSchema.safeParse(validateType.type);

            if(!isValid){
                wsManager.sendToUser(userId, {
                    type: "ERROR",
                    data: {
                        success: false,
                        message: "Bad data format",
                    }
                });
            }

            const clients = await userServiceObj.getUsersId()

            wsManager.sendToUsers(clients, {
                type: "NEW_MESSAGE",
                data: userData.data
            })
            break
    }
}