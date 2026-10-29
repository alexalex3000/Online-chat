import styles from "./Username.module.scss"

interface Props{
    username?: string,
    large?: boolean,
}

export default function Username({username = "", large}:Props){
    return (
        <div className={large ? styles.large : styles.username}>
            @{username}
        </div>
    )
}