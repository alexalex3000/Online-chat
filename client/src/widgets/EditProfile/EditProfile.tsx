import Section from "@/shared/ui/Section/Section";
import Input from "@/shared/ui/Input/Input";
import Textarea from "@/shared/ui/Textarea/Textarea";
import styles from "./EditProfile.module.scss"
import Label from "@/shared/ui/Label/Label";

export default function EditProfile() {
    return (
        <div>
            <Label label="Edit Profile"/>
            <Section>
                <div className={styles.wrapper}>
                    <div className={styles.top}>
                        <Input label="Full Name" placeholder="Jonh Due"/>
                        <Input label="Username" placeholder="jonhdue" before="@"/>
                    </div>
                    <div className={styles.mid}>
                        <Textarea label="Bio / About" placeholder="Tell about your self"/>
                    </div>
                    <div className={styles.bottom}>
                        <Input label="Phone number" placeholder="123456789" before="+"/>
                        <Input label="Location" placeholder="New York, USA"/>
                    </div>
                </div>
            </Section>
        </div>
    )
}