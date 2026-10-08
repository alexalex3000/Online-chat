"use client"

import Button from "@/shared/ui/Button/Button";
import DayInfo from "@/shared/ui/DayInfo/DayInfo";
import InfoField from "@/shared/ui/InfoField/InfoField";
import Input from "@/shared/ui/Input/Input";
import NumOfMembers from "@/shared/ui/NumOfMembers/NumOfMembers";
import Section from "@/shared/ui/Section/Section";
import {useState} from "react";
import Switch from "@/shared/ui/Switch/Switch";
import Textarea from "@/shared/ui/Textarea/Textarea";
import UnwrapButton from "@/shared/ui/UnwrapButton/UnwrapButton";
import SidebarLink from "@/shared/ui/SidebarLink/SidebarLink";
import {User} from "lucide-react";
import Label from "@/shared/ui/Label/Label";

export default function Home() {
    const [isChecked, setChecked] = useState(false);

    return (
        <div>
            <Button onClick={() => {}}>asfasf</Button>
            <DayInfo date={new Date}/>
            <InfoField text={"text"} label={"label"} before={"@"}/>
            <Input label={"text"} before={"@"}/>
            <NumOfMembers online={1321} total={412}/>
            <Section>safasfasfasf</Section>
            <Textarea label={"safaf"}/>
            <UnwrapButton onClick={() => {}}>asfasf</UnwrapButton>
            <SidebarLink>
                <User/>
                User
            </SidebarLink>
            <Label label={"Label"}/>
        </div>
    )
}