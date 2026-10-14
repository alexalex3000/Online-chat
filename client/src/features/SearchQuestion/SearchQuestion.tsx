"use client"

import Input from "@/shared/ui/Input/Input";
import {Search} from "lucide-react";
import {usePathname, useSearchParams, useRouter} from "next/navigation";
import Questions from "@/widgets/Questions/Questions";
import styles from "./SearchQuestion.module.scss"
import {startTransition} from "react";

export default function SearchQuestion(){
    const searchParams = useSearchParams();
    const router = useRouter()
    const pathname = usePathname();

    const handleChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if(value){
            params.set("search", value);
        }
        else{
            params.delete("search");
        }

        startTransition(() => router.replace(`${pathname}?${params}`))
    }

    return (
        <div className={styles.wrapper}>
            <Input
                onChange={handleChange}
                placeholder={"Search help topic"}
                before={<Search/>}
            />

            <Questions/>
        </div>
    )
}