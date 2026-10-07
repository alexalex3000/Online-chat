import styles from "./Name.module.scss"

interface Props{
    name?: string
}

export default function Name({name = "Alexey Petrikevitch"}: Props){
    return (
        <div className={styles.name}>
            {name}
        </div>
    )
}