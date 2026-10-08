import {Check, CheckCheck, CircleX} from "lucide-react";
import styles from "./Status.module.scss";
import {MessageStatusType} from "@/entities/message/model/types";

interface Props {
    status: MessageStatusType;
}

export default function Status({status}: Props) {
    return (
        <span className={`${styles.statusIcon} ${styles[status]}`}>
            {status === "success" && <CheckCheck/>}
            {status === "pending" && <Check/>}
            {status === "error" && <CircleX/>}
        </span>
    );
}