import { NextResponse } from "next/server";
import OpenAI from "openai";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  try {
    const { registry } = await req.json();

    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY.includes("REPLACE")) {
      return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
    }

    const systemPrompt = `
You are TWONNECT, an elite venture strategy advisor. Your goal is to move a startup concept from a raw idea to a venture-grade business model.
You will be provided with a "Registry" of ideas (the user's submitted projects).

TASKS:
1. MARKET GAP IDENTIFICATION: Identify high-value gaps in the user's specific registry.
2. STRATEGIC PIVOTING: Suggest 3 high-probability pivots (alternative directions or models) with a stronger "unfair advantage".
3. INSTITUTIONAL READINESS: Evaluate the concept's readiness for institutional capital.

CRITICAL: You MUST return ONLY a JSON object with this exact structure:
{
  "pivots": [
    {
      "title": "Short catchy title",
      "description": "One sentence explaining the pivot and why it has an unfair advantage.",
      "impact": "e.g. High Disruption | Enterprise Ready | Scalable SaaS",
      "type": "shield" | "zap" | "trending"
    }
  ],
  "reasoning": "One line explaining the market gap identified."
}

CONTEXT (User's Submitted Registry):
${JSON.stringify(registry)}
        `;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "system", content: systemPrompt }, { role: "user", content: "Analyze my registry and suggest 3 strategic pivots." }],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const result = JSON.parse(completion.choices[0].message.content || "{}");
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Strategic Pivot Error:", error);
    return NextResponse.json({ error: "Failed to generate strategic pivots" }, { status: 500 });
  }
}
