"use client"

import styles from "./UserPageWrapper.module.scss"
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useRef} from "react";
import XButton from "@/shared/ui/XButton/XButton";

interface Props{
    UserPage: React.ReactNode;
}

export default function UserPageWrapper({UserPage}: Props) {
    const queryParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const wrapperRef = useRef<HTMLDivElement>(null);

    const close = () => {
        const params = new URLSearchParams();

        router.replace(`${pathname}?${params.toString()}`);
    }

    useEffect(() => {
        const handleClose = (e: MouseEvent) => {
            if(wrapperRef.current && !wrapperRef.current.contains(e.target as Node)){
                close()
            }
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                close();
            }
        };

        document.addEventListener("mousedown", handleClose);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClose);
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [])

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:4200/ws");

        socket.onopen = () => {
            console.log("connected");
        }

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socket.onclose = (event) => {
            console.log(`WebSocket closed: code=${event.code}, reason=${event.reason}`);
        };
    }, []);

    const isVisible = queryParams.get("settings") === "user-page"

    if(!isVisible) return null

    return (
        <div className={styles.profileWrapper}>
            <div
                className={styles.wrapper}
                ref={wrapperRef}
            >
                {isVisible && UserPage}
            </div>
            <XButton onClick={close} className="absolute right-5 top-5"/>
        </div>
    )
}