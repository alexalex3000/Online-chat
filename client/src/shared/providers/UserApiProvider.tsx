"use client"

import {User} from "@/entities/user/model/types";
import {ReactNode, useRef} from "react";
import {useUserStore} from "@/entities/user/model/user-store";

interface Props {
    user: User
    children: ReactNode
}

export function UserProvider({user, children}: Props) {
    const isActive = useRef<boolean>(false);
    const setUser = useUserStore(state => state.setUser);

    if(!isActive.current) {
        setUser(user);
    }

    return (
        <>
            {children}
        </>
    )
}