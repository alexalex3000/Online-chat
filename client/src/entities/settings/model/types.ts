import {z} from "zod";

export interface Setting {
    title: string;
    text?: string;
    value: boolean;
    toggle: (val: boolean) => void;
    action: () => Promise<boolean>;
}

export const settingsItemSchema = z.object({
    chatSounds: z.boolean(),
    pinnedMessageAlerts: z.boolean(),
    doNotDistract: z.boolean(),
    showOnlineStatus: z.boolean(),
});

export type UserSettings = z.infer<typeof settingsItemSchema>

export const settingsResponseSchema = z.object({
    success: z.boolean(),
    data: settingsItemSchema,
});