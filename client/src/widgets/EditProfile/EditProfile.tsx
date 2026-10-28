import Section from "@/shared/ui/Section/Section";
import Input from "@/shared/ui/Input/Input";
import Textarea from "@/shared/ui/Textarea/Textarea";
import styles from "./EditProfile.module.scss"
import Label from "@/shared/ui/Label/Label";
import EditProfileForm from "@/widgets/EditProfile/ui/EditProfileForm";
import {userApi} from "@/entities/user/api/user.api";
import {redirect} from "next/navigation";

export default async function EditProfile() {
    const result = await userApi.getUser()

    if(!result.user || !result.success) {
        redirect("/login");
    }

    return (
        <div>
            <Label label="Edit Profile"/>
            <Section>
               <EditProfileForm user={result.user}/>
            </Section>
        </div>
    )
}