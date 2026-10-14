"use client"

import {useState} from "react";
import {ChevronRight} from "lucide-react";
import styles from "./HelpSelect.module.scss"
import Section from "@/shared/ui/Section/Section";

interface Props{
    question: string;
    answer: string;
    className?: string;
}

export default function HelpSelect({question, answer, className}: Props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Section small className={className}>
            <div className={styles.helpSelectContainer}>
                <div
                    className={styles.questionRow}
                    onClick={() => setIsOpen(prev => !prev)}
                >
                    <span className={styles.question}>{question}</span>
                    <ChevronRight
                        className={`${styles.arrow} ${isOpen ? styles.rotated : ""}`}
                    />
                </div>

                {isOpen && (
                    <div className={styles.answer}>
                        {answer}
                    </div>
                )}
            </div>
        </Section>
    )
}