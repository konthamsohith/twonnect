"use client";

import React from "react";

const IconAI = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2V4" /><path d="M12 20V22" /><path d="M4.93 4.93L6.34 6.34" /><path d="M17.66 17.66L19.07 19.07" /><path d="M2 12H4" /><path d="M20 12H22" /><path d="M4.93 19.07L6.34 17.66" /><path d="M17.66 6.34L19.07 4.93" /><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /></svg>
);

export default function AISandboxPage() {
    return (
        <div className="dashboard-page">
            <header className="dashboard-header">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                        <h1>AI Sandbox</h1>
                        <p>Powered by IdeaAI &bull; Refine and audit your startup strategies.</p>
                    </div>
                    <span className="badge-pill" style={{ background: "rgba(0, 122, 255, 0.1)", color: "var(--blue)", fontWeight: 600 }}>
                        EARLY ACCESS
                    </span>
                </div>
            </header>

            <div className="chart-card" style={{ padding: "3rem", background: "#0a0a0a", color: "white" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ maxWidth: "60%" }}>
                        <div style={{ color: "#bbf451", marginBottom: "1rem" }}>
                            <IconAI />
                        </div>
                        <h3 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "1rem" }}>Build The Future with IdeaAI</h3>
                        <p style={{ opacity: 0.8, marginBottom: "2rem", lineHeight: "1.6" }}>
                            Our proprietary LLM models analyze your problem statements for market-fit, scalability, and technical feasibility.
                            The AI Sandbox is currently in private Alpha for top-tier contributors.
                        </p>
                        <div style={{ display: "flex", gap: "1rem" }}>
                            <button className="btn-lime">Join Waitlist</button>
                            <button className="btn-ghost" style={{ color: "white", border: "1px solid rgba(255,255,255,0.2)" }}>View Capabilities</button>
                        </div>
                    </div>
                    <div className="ai-sandbox-visual" style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                        <div style={{
                            width: "200px",
                            height: "200px",
                            borderRadius: "50%",
                            background: "radial-gradient(circle, #bbf451 0%, transparent 70%)",
                            filter: "blur(40px)",
                            opacity: 0.3,
                            animation: "pulse 4s infinite alternate"
                        }}></div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes pulse {
                    from { transform: scale(1); opacity: 0.2; }
                    to { transform: scale(1.5); opacity: 0.4; }
                }
            `}</style>
        </div>
    );
}
