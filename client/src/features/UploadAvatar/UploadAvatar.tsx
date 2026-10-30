import Avatar from "@/entities/user/ui/Avatar/Avatar";
import {userApi} from "@/entities/user/api/user.api";

export default async function UploadAvatar(){
    const userInfo = await userApi.getUser();

    const fullName = [userInfo.user?.name, userInfo.user?.surname].filter(Boolean).join(" ") || undefined;

    return (
        <Avatar
            name={fullName}
            url={userInfo.user?.logoUrl || undefined}
        />
    )
}