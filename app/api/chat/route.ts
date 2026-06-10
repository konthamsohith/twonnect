import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY.includes("REPLACE")) {
            return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
        }

        const groq = new OpenAI({
            apiKey: process.env.GROQ_API_KEY,
            baseURL: "https://api.groq.com/openai/v1",
        });

        const systemPrompt = `
You are the TWONNECT Assistant, a helpful, intelligent, and concise AI companion for the user of the TWONNECT Platform.
Your goal is to answer general queries, provide startup advice, review text, or act as a collaborative co-founder brainstorming partner.
Unlike the Deep Scour tool, you do not need to format your first message as a massive report unless requested. Just answer naturally and concisely.
Use standard markdown formatting.
        `;

        const chatMessages = [
            { role: "system", content: systemPrompt },
            ...messages
        ];

        const completion = await groq.chat.completions.create({
            messages: chatMessages as any[],
            model: "llama-3.3-70b-versatile",
            temperature: 0.5,
        });

        const reply = completion.choices[0].message.content;

        return NextResponse.json({ reply });
    } catch (error: any) {
        console.error("General Chat API Error:", error);
        return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
    }
}
