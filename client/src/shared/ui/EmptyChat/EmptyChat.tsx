import styles from "./EmptyChat.module.scss";

interface EmptyChatProps {
    title?: string;
    description?: string;
}

export default function EmptyChat({title = "No messages yet", description = "Send a message to start the conversation",}: EmptyChatProps) {
    return (
        <div className={styles.emptyContainer}>
            <div className={styles.iconWrapper}>
                <svg
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <line x1="8" y1="9" x2="16" y2="9" />
                    <line x1="8" y1="13" x2="13" y2="13" />
                </svg>
            </div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
        </div>
    );
}