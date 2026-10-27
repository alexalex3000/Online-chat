import Avatar from "@/entities/user/ui/Avatar/Avatar";
import Name from "@/entities/user/ui/Name/Name";
import Username from "@/entities/user/ui/Username/Username";
import {ChevronRight} from "lucide-react";
import Section from "@/shared/ui/Section/Section";
import styles from "./UserLink.module.scss";
import {userApi} from "@/entities/user/api/user.api";
import {GetUserResponse} from "@/entities/user/model/types";

interface Props {
    large?: boolean;
}

export default async function UserLink({large}: Props) {
    const info = await userApi.getUser() as GetUserResponse

    if (large) {
        return (
            <div className={styles.containerLarge}>
                <Avatar
                    name={`${info?.user?.name} ${info?.user?.surname}`}
                    url={info?.user?.logoUrl}
                    large />
                <div className={styles?.userInfo}>
                    <Name large name={`${info?.user?.name} ${info?.user?.surname}`}/>
                    <Username large username={info?.user?.username}/>
                </div>
            </div>
        );
    }

    return (
        <Section small>
            <div className={styles.container}>
                <Avatar
                    name={`${info?.user?.name} ${info?.user?.surname}`}
                    url={info?.user?.logoUrl}
                />
                <div className={styles?.userInfo}>
                    <Name name={`${info?.user?.name} ${info?.user?.surname}`}/>
                    <Username username={info?.user?.username}/>
                </div>
                <ChevronRight className={styles.arrow}/>
            </div>
        </Section>
    );
}