import OtherHeader from "@/widgets/header/OtherHeader/OtherHeader";
import styles from "@/app/chat/page.module.scss";
import UserLink from "@/entities/user/ui/UserLink/UserLink";
import EditProfile from "@/widgets/EditProfile/EditProfile";

export default function ProfilePage() {
    return (
        <div className={styles.wrapperNoPoint}>
            <OtherHeader text="Profile" showButton/>
            <div className={styles.miniMain}>
                <UserLink large/>
                <EditProfile/>
            </div>
        </div>
    )
}