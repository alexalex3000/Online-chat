import styles from "./Avatar.module.scss"
import {getFirstLatters} from "@/shared/utils/getFirstLatters";

export interface Props {
    url?: string
    name?: string
    small?: boolean
}

export default function Avatar({ url, name = "Alexey Petrikevitch", small}: Props) {
    const firstLetters = getFirstLatters(name)

    return (
        <div className={small ? styles.small : styles.avatar}>
            {firstLetters}
            {
                /*<Image
          src={url!}
          alt={name}
          width={size}
          height={size}
          className={styles.image}
        />*/
            }
        </div>
    )
}