import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
    try {
        const { messages, concept } = await req.json();

        if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY.includes("REPLACE")) {
            return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
        }

        const groq = new OpenAI({
            apiKey: process.env.GROQ_API_KEY,
            baseURL: "https://api.groq.com/openai/v1",
        });

        const isNewScour = messages.length === 0;

        const systemPrompt = `
You are TWONNECT, an elite venture strategy auditor and market intelligence AI. Your goal is to provide deep, high-fidelity market research, disruption analysis, and conversational strategic guidance.

When the user first provides a concept, you must provide a comprehensive "Deep Scour Report" structured in markdown.
The report MUST include:
1. **Competitive Landscape**: List exact names of direct or similar competitors. If none exist, state "No direct competitors identified".
2. **Gap Analysis**: What makes this concept SIMILAR to existing solutions, and where it DIFFERS (the "Unfair Advantage").
3. **Disruption Score**: A score from 0 to 100 with a brief justification.
4. **Feasibility & Scalability**: Brief notes on the technical/market realism of the idea.

For follow-up questions in the conversation, answer them naturally, maintaining your persona as an elite strategist, referencing the earlier context. Do not output the full template again unless requested.

Use standard markdown formatting (bolding, lists, headers) to make your output highly readable.
        `;

        const chatMessages = [
            { role: "system", content: systemPrompt },
        ];

        // If it's a completely new scour, we seed the first message as a prompt for the user's concept
        if (isNewScour && concept) {
            chatMessages.push({
                role: "user",
                content: `Please run a Deep Scour Report for the following concept: \n\n${concept}`
            });
        } else {
            // Otherwise, append the existing conversation history
            chatMessages.push(...messages);
        }

        const completion = await groq.chat.completions.create({
            messages: chatMessages as any[],
            model: "llama-3.3-70b-versatile",
            temperature: 0.3,
        });

        const reply = completion.choices[0].message.content;

        return NextResponse.json({ reply });
    } catch (error: any) {
        console.error("Deep Scour API Error:", error);
        return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
    }
}
