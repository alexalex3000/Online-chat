import styles from "./Label.module.scss"

interface Props{
    label: string
    red?: boolean
}

export default function Label({label, red}: Props){
    return (
        <h3 className={red ? styles.red : styles.label}>{label}</h3>
    )
}