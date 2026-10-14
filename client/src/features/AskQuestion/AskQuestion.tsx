import Section from "@/shared/ui/Section/Section";
import Input from "@/shared/ui/Input/Input";
import styles1 from "@/shared/ui/Logo/Logo.module.scss";
import styles from "./AskQuestion.module.scss"
import {MessageCircleQuestionMark, Send, WavesHorizontal} from "lucide-react";
import Button from "@/shared/ui/Button/Button";

export default function AskQuestion() {
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
                    <form className={styles.inputWrapper}>
                        <Input before={<MessageCircleQuestionMark/>} placeholder="Ask a question..." />
                        <Button>
                            <Send className={styles.sendIcon} />
                        </Button>
                    </form>
                </div>
            </div>
        </Section>
    )
}

//TODO create a answers with AI api
