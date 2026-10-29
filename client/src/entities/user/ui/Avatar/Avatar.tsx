"use client"

import styles from "./Avatar.module.scss"
import {getFirstLatters} from "@/shared/utils/getFirstLatters";
import {usePathname, useRouter} from "next/navigation";
import Image from "next/image";
import {useUserStore} from "@/entities/user/model/user-store";

export interface Props {
    url?: string
    name?: string
    large?: boolean
    clickable?: boolean
}

export default function Avatar({url, name = "Alexey Petrikevitch", large, clickable}: Props) {
    const router = useRouter();
    const pathname = usePathname()

    const firstLetters = getFirstLatters(name)

    const handleOpen = () => {
        const params = new URLSearchParams();

        params.set("settings", "user-page")

        router.replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className={large ? styles.large : styles.avatar} onClick={clickable ? handleOpen : () => null}>
            <span className={styles.letters}>{firstLetters}</span>
            {
                url && (
                    <Image
                        src={url}
                        alt={name}
                        fill
                        sizes={large ? "(max-width: 574px) 70px, 100px" : "40px"}
                        className={styles.image}
                    />
                )
            }
        </div>
    )
}