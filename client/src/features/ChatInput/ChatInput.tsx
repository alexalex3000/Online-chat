"use client"

import React, {ChangeEvent, useRef, useState} from 'react';
import styles from './ChatInput.module.scss';
import {Send} from "lucide-react";
import {useWebsocket} from "@/shared/api/ws/useWebsocket";
import {useUserStore} from "@/entities/user/model/user-store";

export default function ChatInput() {
    const sendMessage = useWebsocket(state => state.sendMessage);
    const [value, setValue] = useState<string>('');
    const lastTypingTimeRef = useRef<number>(0);
    const isConnected = useWebsocket(state => state.isConnected);
    const user = useUserStore(state => state.user);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setValue(value);

        if(value.trim().length > 0) {
            const now = Date.now();

            if(now - lastTypingTimeRef.current > 2000) {
                sendMessage({
                    type: "USER_TYPING",
                    data: {
                        userFullname: `${user?.name} ${user?.surname}`,
                    }
                })
                lastTypingTimeRef.current = now;
            }
        }
    }

    return (
        <form className={styles.container}>
            <div className={styles.inputWrapper}>
                <input
                    onChange={handleChange}
                    type="text"
                    value={value}
                    placeholder="Write a message..."
                    className={styles.input}

                />
            </div>

            <button disabled={!isConnected} type="button" aria-label="Send" className={styles.sendButton}>
                <Send className={styles.sendIcon}/>
            </button>
        </form>
    );
}