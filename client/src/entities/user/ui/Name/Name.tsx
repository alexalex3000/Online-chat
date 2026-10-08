import styles from "./Name.module.scss"

interface Props{
    name?: string
    large?: boolean
}

export default function Name({name = "Alexey Petrikevitch", large}: Props){
    return (
        <div className={large ? styles.large : styles.name}>
            {name}
        </div>
    )
}