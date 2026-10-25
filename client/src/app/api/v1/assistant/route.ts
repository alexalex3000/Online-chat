import {GoogleGenAI} from "@google/genai";
import {NextResponse} from "next/server";
import {askAiSchema} from "@/entities/question/model/schema";

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY})

export async function POST(request: Request) {
    try{
        const body = await request.json()

        const validation = askAiSchema.safeParse(body)

        if(!validation.success){
            return NextResponse.json(
                {error: "Uncrorrect question"},
                {status: 400}
            )
        }
        const {prompt} = validation.data

        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: prompt,
            config: {
                systemInstruction: `
          Ты — лаконичный AI-ассистент справочного раздела приложения.
          Отвечай строго по делу, вежливо, в пределах 2-3 предложений.
          Отвечай на том же языке, на котором задан вопрос. Приложение это онлайн чат, на иные вопросы не касающиеся этой темы отвечай: некоректный вопрос(разумеется в вежливом формате по теме)
        `,
                temperature: 0.2,
                maxOutputTokens: 1500,
            },
        });


        return NextResponse.json({answer: response.text});
    } catch(e){
        return NextResponse.json(
            {
                status: 500,
                error: e
            }
        )
    }
}