import {WsMessage} from "./ws.types";

export function ws(userId: string, rawData: string) {
    const data: WsMessage = JSON.parse(rawData);

    switch (data.type){

    }
}