import styles from "./Username.module.scss"

interface Props{
    username?: string,
}

export default function Username({username = "nenfrjm54"}:Props){
    return (
        <div className={styles.username}>
            @{username}
        </div>
    )
}