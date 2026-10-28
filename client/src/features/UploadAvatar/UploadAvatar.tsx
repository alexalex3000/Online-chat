import Avatar from "@/entities/user/ui/Avatar/Avatar";
import {userApi} from "@/entities/user/api/user.api";

export default async function UploadAvatar(){
    const userInfo = await userApi.getUser();

    return (
        <>
            <Avatar name={`${userInfo.user?.name} ${userInfo.user?.surname}`} url={userInfo.user?.logoUrl}/>
        </>
    )
}