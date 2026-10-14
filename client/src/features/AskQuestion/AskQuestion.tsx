"use client";

import {useActionState, useState} from "react";
import Section from "@/shared/ui/Section/Section";
import Input from "@/shared/ui/Input/Input";
import styles1 from "@/shared/ui/Logo/Logo.module.scss";
import styles from "./AskQuestion.module.scss";
import { MessageCircleQuestionMark, Send, Loader2, WavesHorizontal } from "lucide-react";
import Button from "@/shared/ui/Button/Button";
import { askQuestion } from "@/entities/question/api/askQuestion";

interface AnswerState {
    answer: string | null;
    error: string | null;
    success: boolean;
}

const initialState: AnswerState = {
    answer: null,
    error: null,
    success: false,
};

export default function AskQuestion() {
    const [error, setError] = useState<string>("");

    const [state, formAction, isPending] = useActionState(
        async (_prevState: AnswerState, formData: FormData): Promise<AnswerState> => {
            const question = (formData.get("question") as string)?.trim();

            if (!question) {
                setError("Please enter a question");

                return {
                    answer: null,
                    error: "Please enter a question",
                    success: false,
                };
            }

            try {
                const answer = await askQuestion({ prompt: question });

                return {
                    answer: answer ?? "Answer is not received. Please check your internet connection or location",
                    error: null,
                    success: true,
                };
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : "Cant receive answer";

                setError(message);

                return {
                    answer: null,
                    error: message,
                    success: false,
                };
            }
        },
        initialState
    );

    return (
        <Section className={styles.section}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.headerContent}>
                        <div className={styles1.iconWrapper}>
                            <WavesHorizontal className={styles.icon} />
                        </div>
                        <div className={styles.textGroup}>
                            <h1 className={styles.title}>Still need help?</h1>
                            <p className={styles.subtitle}>Our AI assistant can always help you</p>
                        </div>
                    </div>
                </header>

                <div className={styles.actions}>
                    <form action={formAction} className={styles.inputWrapper}>
                        <Input
                            name="question"
                            errorMessage={error}
                            onChange={() => setError("")}
                            before={<MessageCircleQuestionMark />}
                            placeholder="Ask a question..."
                            disabled={isPending}
                        />
                        <Button type="submit" disabled={isPending}>
                            {isPending ? (
                                <Loader2 className={`${styles.sendIcon} animate-spin`} />
                            ) : (
                                <Send className={styles.sendIcon} />
                            )}
                        </Button>
                    </form>

                    {state.success && state.answer && (
                        <div className={styles.answerBox}>
                            <span className={styles.answerAuthor}>Echo AI:</span>
                            {state.answer}
                        </div>
                    )}
                </div>
            </div>
        </Section>
    );
}