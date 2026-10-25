import {AskAiInput} from "@/entities/question/model/schema";
import {ApiResponse} from "@/entities/question/model/types";

export const askQuestion = async (question: AskAiInput) => {
    const response = await fetch("/api/v1/assistant", {
        method: "POST",
        body: JSON.stringify(question),
        headers: {
            "Content-Type": "application/json",
        }
    })

    if(!response.ok) {
        throw new Error("Something went wrong");
    }

    const data:ApiResponse = await response.json();

    return data.answer;
}