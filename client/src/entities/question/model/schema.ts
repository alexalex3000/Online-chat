import {z} from "zod";

export const askAiSchema = z.object({
    prompt: z
        .string()
        .trim()
        .min(3)
        .max(100),
});

export type AskAiInput = z.infer<typeof askAiSchema>;