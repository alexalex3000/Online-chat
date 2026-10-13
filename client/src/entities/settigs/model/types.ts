import {delay} from "@/entities/settigs/api/delay";

export interface Setting {
    title: string;
    text?: string;
    value: boolean;
    toggle: (val: boolean) => void;
    action: () => Promise<boolean>;
}