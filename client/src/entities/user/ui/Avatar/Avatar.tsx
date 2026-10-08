import styles from "./Avatar.module.scss"
import {getFirstLatters} from "@/shared/utils/getFirstLatters";

export interface Props {
    url?: string
    name?: string
    large?: boolean
}

export default function Avatar({ url, name = "Alexey Petrikevitch", large}: Props) {
    const firstLetters = getFirstLatters(name)

    return (
        <div className={large? styles.large : styles.avatar}>
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