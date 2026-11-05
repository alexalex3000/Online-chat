"use client"

import {useWebsocket} from "@/shared/api/ws/useWebsocket";
import {useEffect} from "react";
import AlertWindow from "@/features/AlertWindow/AlertWindow";
import {useAlertStore} from "@/features/AlertWindow/model/alert-store";

interface Props{
    children: React.ReactNode;
}

export default function SocketProvider({children}: Props){
    const connect = useWebsocket(state => state.connect);
    const disconnect = useWebsocket(state => state.disconnect);

    useEffect(()=>{
        connect();

        return () => {
            disconnect();
        }
    }, [])

    return (
        <>
            {children}
        </>
    )
}