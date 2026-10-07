"use client"

import styles from "./Switch.module.scss"

interface Props{
    isChecked:boolean,
    setChecked:(value:boolean) => void,
}

export default function Switch({isChecked,setChecked}: Props) {
    console.log(isChecked)
    return (
        <div className={`${styles.track} ${isChecked ? styles.active : ""}`} onClick={()=> {setChecked(!isChecked)}}>
            <div className={`${styles.thumb} ${isChecked ? styles.thumbActive : styles.thumbInactive}`}></div>
        </div>
    )
}