"use client"

import React, {ChangeEvent, useRef, useState, KeyboardEvent, useEffect} from 'react';
import styles from './ChatInput.module.scss';
import {Check, Send} from "lucide-react";
import {useWebsocket} from "@/shared/api/ws/useWebsocket";
import {useUserStore} from "@/entities/user/model/user-store";
import {useMessagesStore} from "@/entities/message/model/messages-store";
import {useEditMessage} from "@/entities/message/model/edit-store";

export default function ChatInput() {
    const sendMessage = useWebsocket(state => state.sendMessage);
    const [value, setValue] = useState<string>('');
    const lastTypingTimeRef = useRef<number>(0);
    const isConnected = useWebsocket(state => state.isConnected);
    const user = useUserStore(state => state.user);
    const addMessage = useMessagesStore(state => state.addMessage)

    const editMessage = useEditMessage(state => state.editMessage)
    const id = useEditMessage(state => state.id)
    const setMessage = useEditMessage(state => state.setMessage)

    useEffect(() => {
        if(id && id.length > 0){
            setValue(editMessage);
        }
    }, [id])

    const handleEdit = () => {
        sendMessage({
            type: "EDIT_MESSAGE",
            data: {
                id,
                message: value
            }
        })

        setValue('')
        setMessage("", "")
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();

            if(id && id.length > 0){
                handleEdit()
                return
            }

            handleClick();
        }
    };

    const handleClick = () => {
        const tempId = crypto.randomUUID()

        addMessage({
            id: tempId,
            message: value.trim(),
            status: "pending",
            owner: user!,
            date: new Date()
        })

        sendMessage({
            type: "NEW_MESSAGE",
            data: {
                tempId: tempId,
                message: value.trim()
            }
        })

        setValue('')
    }

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
                    onKeyDown={handleKeyDown}
                />
            </div>

            {
                id && id.length > 0 ? (
                    <>
                        {
                            value && value.length > 0 && (
                                <button onClick={handleEdit} disabled={!isConnected} type="button" aria-label="Send" className={styles.sendButton}>
                                    <Check className={styles.sendIcon}/>
                                </button>
                            )
                        }
                    </>
                ) : (
                    <>
                        {
                            value && value.length > 0 && (
                                <button onClick={handleClick} disabled={!isConnected} type="button" aria-label="Send" className={styles.sendButton}>
                                    <Send className={styles.sendIcon}/>
                                </button>
                            )
                        }
                    </>
                )
            }


        </form>
    );
}