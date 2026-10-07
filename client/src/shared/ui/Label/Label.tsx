import styles from "./Label.module.scss"

interface Props{
    label: string
}

export default function Label({label}: Props){
    return (
        <h3 className={styles.label}>{label}</h3>
    )
}