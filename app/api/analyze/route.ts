import { NextResponse } from "next/server";
import OpenAI from "openai";

const groq = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
    try {
        const { concept, history } = await req.json();

        if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY.includes("REPLACE")) {
            return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
        }

        const systemPrompt = `
You are TWONNECT, an elite venture strategy auditor. Your goal is to provide deep, high-fidelity market research and disruption analysis.
You will be provided with a startup concept and a history of previous audits for context (memory).

TASKS:
1. DEEP SEARCH: Access your internal global venture databases to find existing companies, projects, or similar ideas.
2. COMPETITIVE LANDSCAPE: If direct or similar competitors exist, list their EXACT names. If none exist, explicitly state "No direct competitors identified".
3. GAP ANALYSIS: Clearly list what makes this concept SIMILAR to existing solutions and where it DIFFERES (the "Unfair Advantage").
4. DISRUPTION SCORE: Calculate a precise score from 0 to 100.
   - 0-30: Saturated market, low differentiation.
   - 31-70: Competitive market with moderate differentiation.
   - 71-100: Highly disruptive, first-of-its-kind, or solving a massive gap with unique tech.
   CRITICAL: The score MUST be dynamic and vary significantly based on your analysis. DO NOT default to a mid-range number.

CRITICAL: You MUST return ONLY a JSON object with this exact structure:
{
  "marketFit": { "value": "e.g. Level 4 / 5", "description": "Short feedback." },
  "scalability": { "value": "e.g. Venture Grade", "description": "Short feedback." },
  "feasibility": { "value": "e.g. Optimal", "description": "Short feedback." },
  "disruptionScore": 0,
  "landscape": {
    "status": "Founding Competitors" | "First-of-its-kind" | "Saturated Market",
    "competitors": ["Company A", "Company B"],
    "similarities": "Brief list of shared traits.",
    "differences": "Explicit differentiation points."
  },
  "summary": "Concise executive summary (2 sentences)."
}

CONTEXT (Audit Memory):
${history ? JSON.stringify(history) : "No previous audits in this session."}

Auditing Concept:
${concept}
        `;

        const completion = await groq.chat.completions.create({
            messages: [{ role: "system", content: systemPrompt }, { role: "user", content: concept }],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" },
            temperature: 0.2,
        });

        const result = JSON.parse(completion.choices[0].message.content || "{}");
        return NextResponse.json(result);
    } catch (error: any) {
        console.error("AI Audit Error:", error);
        return NextResponse.json({ error: "Failed to generate audit report" }, { status: 500 });
    }
}
