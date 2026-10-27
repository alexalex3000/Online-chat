"use client"

import styles from "./Avatar.module.scss"
import {getFirstLatters} from "@/shared/utils/getFirstLatters";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import Image from "next/image";

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
            {firstLetters}
            {
                url && (
                    <Image
                        src={url!}
                        alt={name}
                        width={40}
                        height={40}
                        className={styles.image}
                    />
                )
            }
        </div>
    )
}