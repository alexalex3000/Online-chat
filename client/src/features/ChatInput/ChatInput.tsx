"use client"

import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import styles from './ChatInput.module.scss';
import {Send} from "lucide-react";
import {useWebsocket} from "@/shared/api/ws/useWebsocket";

export default function ChatInput() {
    const sendMessage = useWebsocket(state => state.sendMessage);
    const userIdTyping = useWebsocket(state => state.userIdTyping);
    const [value, setValue] = useState<string>('');
    const lastTypingTimeRef = useRef<number>(0);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setValue(value);

        if(value.trim().length > 0) {
            const now = Date.now();

            if(now - lastTypingTimeRef.current > 2000) {
                sendMessage({type: "USER_TYPING"})
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

            <button type="button" aria-label="Send" className={styles.sendButton}>
                <Send className={styles.sendIcon}/>
            </button>
        </form>
    );
}