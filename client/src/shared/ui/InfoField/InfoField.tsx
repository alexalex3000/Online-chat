import styles from "./InfoField.module.scss"

interface Props{
    text: string
    label: string
    before?: string
}

export default function InfoField({text, before, label}: Props){
    return (
        <div className={`${styles.container}`}>
            {label && <p className={styles.label}>{label}</p>}
            <div className={styles.field}>
                {before && <span className={styles.before}>{before}</span>}
                <span className={styles.value}>{text}</span>
            </div>
        </div>
    )
}