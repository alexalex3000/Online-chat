"use client";

import React, { useState, useId } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./Input.module.scss";

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    type?: "email" | "password" | "text" | "file" | "number";
    label?: string;
    before?: React.ReactNode;
    onChange?: (value: string) => void;
    errorMessage?: string;
    wrapperClassName?: string;
    id?: string;
    placeholder?: string;
    name?: string;
    disabled?: boolean;
}

export default function Input({
                                  label,
                                  before,
                                  errorMessage,
                                  wrapperClassName = "",
                                  type = "text",
                                  id,
                                  name,
                                  onChange,
                                  placeholder,
                                  disabled,
                                  ...props
                              }: Props) {
    const generatedId = useId();
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : generatedId);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const currentType = type === "password" ? (isPasswordVisible ? "text" : "password") : type;

    return (
        <div className={`${styles.container} ${wrapperClassName}`}>
            {label && (
                <label htmlFor={inputId} className={styles.label}>
                    {label}
                </label>
            )}

            <div
                className={`${styles.wrapper} ${
                    errorMessage ? styles.error : ""
                }`}
            >
                {before && <span className={styles.before}>{before}</span>}

                <input
                    id={inputId}
                    type={currentType}
                    disabled={disabled}
                    name={name}
                    placeholder={placeholder}
                    className={styles.input}
                    onChange={(e) => onChange?.(e.target.value)}
                    onFocus={(e) => {
                        setIsFocused(true);
                        props.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        props.onBlur?.(e);
                    }}
                    {...props}
                />

                {type === "password" && (
                    <button
                        type="button"
                        className={styles.helper}
                        onClick={() => setIsPasswordVisible((prev) => !prev)}
                        tabIndex={-1}
                        aria-label={isPasswordVisible ? "Скрыть пароль" : "Показать пароль"}
                    >
                        {isPasswordVisible ? (
                            <Eye
                                color={isFocused ? "#5294e2" : "#6b6b6b"}
                                size={18}
                                strokeWidth={1.5}
                            />
                        ) : (
                            <EyeOff
                                color={isFocused ? "#5294e2" : "#6b6b6b"}
                                size={18}
                                strokeWidth={1.5}
                            />
                        )}
                    </button>
                )}
            </div>

            {errorMessage && <span className={styles.errorText}>{errorMessage}</span>}
        </div>
    );
}