import OtherHeader from "@/widgets/header/OtherHeader/OtherHeader";
import styles from "@/app/chat/page.module.scss";
import UserLink from "@/entities/user/ui/UserLink/UserLink";
import EditProfile from "@/widgets/EditProfile/EditProfile";
import Privacy from "@/widgets/Privacy/Privacy";
import LogoutBlock from "@/features/Logout/ui/Logout/LogoutBlock";

export default function ProfilePage() {
    return (
        <div className={styles.wrapperNoPoint}>
            <OtherHeader text="Profile" showButton/>
            <div className={styles.miniMain}>
                <UserLink large/>
                <EditProfile/>
                <Privacy/>
                <LogoutBlock/>
            </div>
        </div>
    )
}