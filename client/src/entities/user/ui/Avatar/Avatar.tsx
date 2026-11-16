"use client"

import styles from "./Avatar.module.scss"
import {getFirstLatters} from "@/shared/utils/getFirstLatters";
import {usePathname, useRouter} from "next/navigation";
import Image from "next/image";
import {User} from "@/entities/user/model/types";
import ChangeUserLogo from "@/features/ChangeUserLogo/ChangeUserLogo";

export interface Props {
    url?: string
    name?: string
    large?: boolean
    clickable?: boolean
    user?: User
    canChange?: boolean
}

export default function Avatar({url, name, large, clickable, user, canChange}: Props) {
    const router = useRouter();
    const pathname = usePathname()

    const firstLetters = getFirstLatters(name === "undefined undefined" || !name ? "Deleted Account" : name)

    const handleOpen = () => {
        const params = new URLSearchParams();

        params.set("settings", "user-page")
        params.set("user-id", user?.id ?? "")
        router.replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className={large ? styles.large : styles.avatar} onClick={clickable &&  name !== "undefined undefined" && name ? handleOpen : () => null}>
            <span className={styles.letters}>{firstLetters}</span>
            {
                url && url.length > 0 && (
                    <Image
                        src={url}
                        alt={name ?? "deleted account"}
                        fill
                        sizes={large ? "(max-width: 574px) 70px, 100px" : "40px"}
                        className={styles.image}
                    />
                )
            }

            {
                canChange && <ChangeUserLogo/>
            }
        </div>
    )
}