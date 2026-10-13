"use client"

import styles from "./Switch.module.scss"
import {useOptimistic, useTransition} from "react";

interface Props{
    isChecked:boolean,
    setChecked:(value:boolean) => void,
    action: () => Promise<boolean>
}

export default function Switch({isChecked,setChecked, action}: Props) {
    const [isPending, startTransition] = useTransition()

    const [optimisticValue, setOptimisticValue] = useOptimistic(
        isChecked,
        (_initialValue, nextValue: boolean) => nextValue,
    )

    const handleChange = () => {
        startTransition(async() => {
            setOptimisticValue(!optimisticValue)

            try{
                await action()

                setChecked(!optimisticValue)
            } catch (e){
                console.error(e)
            }
        })
    }

    return (
        <div className={`${styles.track} ${optimisticValue ? styles.active : ""}`} onClick={handleChange}>
            <div className={`${styles.thumb} ${optimisticValue ? styles.thumbActive : styles.thumbInactive}`}></div>
        </div>
    )
}