"use client";

import React, { useState, useEffect } from "react";

// ── Icons ──────────────────────────────────────────────────────
const IconAI = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2V4" /><path d="M12 20V22" /><path d="M4.93 4.93L6.34 6.34" /><path d="M17.66 17.66L19.07 19.07" /><path d="M2 12H4" /><path d="M20 12H22" /><path d="M4.93 19.07L6.34 17.66" /><path d="M17.66 6.34L19.07 4.93" /><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /></svg>
);
const IconCheck = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);
const IconBarChart = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
);
const IconShield = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
);
const IconZap = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
);
const IconArrowRight = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
);
const IconAlert = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
);

type SandboxState = "landing" | "input" | "analyzing" | "results" | "error";

interface AuditResult {
    marketFit: { value: string; description: string };
    scalability: { value: string; description: string };
    feasibility: { value: string; description: string };
    disruptionScore: number;
    landscape: {
        status: string;
        competitors: string[];
        similarities: string;
        differences: string;
    };
    summary: string;
}

export default function AISandboxPage() {
    const [state, setState] = useState<SandboxState>("landing");
    const [concept, setConcept] = useState("");
    const [analysisStep, setAnalysisStep] = useState(0);
    const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
    const [auditHistory, setAuditHistory] = useState<{ concept: string; summary: string }[]>([]);
    const [errorMsg, setErrorMsg] = useState("");

    const steps = [
        "Initializing Neural Registry...",
        "Scouring Global Venture Databases...",
        "Identifying Competitive Landscape...",
        "Calculating Disruption Index...",
        "Finalizing Venture Report..."
    ];

    useEffect(() => {
        if (state === "analyzing") {
            const stepInterval = setInterval(() => {
                setAnalysisStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
            }, 1500); // Slower for "deep" feel

            const performAIAnalysis = async () => {
                try {
                    const response = await fetch("/api/analyze", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ concept, history: auditHistory }),
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(data.error || "Failed to audit concept");
                    }

                    setAuditResult(data);
                    setAuditHistory(prev => [...prev, { concept, summary: data.summary }]);
                    setState("results");
                } catch (err: any) {
                    setErrorMsg(err.message);
                    setState("error");
                }
            };

            performAIAnalysis();
            return () => clearInterval(stepInterval);
        }
    }, [state, concept, auditHistory, steps.length]);

    const handleStartAudit = () => setState("input");
    const handleSubmitConcept = () => {
        setAnalysisStep(0);
        setState("analyzing");
    };
    const handleReset = () => {
        setState("landing");
        setConcept("");
        setAnalysisStep(0);
        setAuditResult(null);
    };

    return (
        <div className="dashboard-page clean-elite-sandbox">
            <header className="dashboard-header" style={{ marginBottom: "3rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                        <h1 style={{ fontSize: "101px", fontWeight: 400, color: "#111827", letterSpacing: "-0.05em", lineHeight: "1" }}>AI Sandbox</h1>
                        <p style={{ color: "#6b7280", marginTop: "0.5rem", fontSize: "1.1rem" }}>
                            Powered by <span style={{ color: "var(--blue)", fontWeight: 700 }}>TWONNECT</span> • Deep Market Scouring Active.
                        </p>
                    </div>
                    <span className="early-access-badge">
                        ALPHA ACCESS
                    </span>
                </div>
            </header>

            <div className="sandbox-canvas">
                {/* ── LANDING VIEW ────────────────────────────────────── */}
                {state === "landing" && (
                    <section className="hero-card">
                        <div className="hero-content">
                            <div className="ai-status">
                                <IconAI />
                                <span>Deep Research Protocol: Active</span>
                            </div>
                            <h2 style={{ fontSize: "2rem", fontWeight: 800, margin: "1.5rem 0 1rem", color: "#111827" }}>
                                Discover Your Unfair Advantage
                            </h2>
                            <p style={{ color: "#4b5563", lineHeight: "1.7", fontSize: "1.05rem", marginBottom: "2.5rem" }}>
                                Scour the global internet for existing competitors, similarities, and market gaps.
                                Get a verified **Disruption Score** and a detailed competitive landscape report.
                            </p>
                            <div className="hero-actions">
                                <button className="btn-v3-primary" onClick={handleStartAudit}>
                                    Initialize Deep Scour <IconArrowRight />
                                </button>
                                <button className="btn-v3-ghost">Research Methodology</button>
                            </div>
                        </div>
                        <div className="hero-visual">
                            <div className="orb-container">
                                <div className="orb orb-main" />
                                <div className="orb orb-sub" />
                            </div>
                        </div>
                    </section>
                )}

                {/* ── INPUT VIEW ──────────────────────────────────────── */}
                {state === "input" && (
                    <section className="input-card">
                        <div style={{ padding: "3rem" }}>
                            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>Intelligence Registry</h3>
                            <p style={{ color: "#6b7280", marginBottom: "2rem" }}>TWONNECT will perform an exhaustive search of existing ventures to see if your concept already exists.</p>

                            <div className="form-group">
                                <label style={{ fontSize: "0.65rem", fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", display: "block", marginBottom: "0.75rem" }}>
                                    Startup Concept Details
                                </label>
                                <textarea
                                    value={concept}
                                    onChange={(e) => setConcept(e.target.value)}
                                    placeholder="Describe your breakthrough concept. Be specific about your unique solution or architectural differentiator..."
                                    style={{
                                        width: "100%",
                                        minHeight: "200px",
                                        padding: "1.5rem",
                                        borderRadius: "16px",
                                        border: "1px solid #e5e7eb",
                                        fontSize: "1rem",
                                        outline: "none",
                                        resize: "vertical",
                                        background: "#f9fafb"
                                    }}
                                />
                            </div>

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "2rem" }}>
                                <button className="btn-v3-ghost" onClick={() => setState("landing")}>Cancel</button>
                                <button
                                    className="btn-v3-primary"
                                    disabled={!concept.trim()}
                                    onClick={handleSubmitConcept}
                                >
                                    Launch Deep Market Scour
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                {/* ── ANALYZING VIEW ──────────────────────────────────── */}
                {state === "analyzing" && (
                    <section className="analyzing-card">
                        <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
                            <div className="telemetry-orb research-orb" />
                            <h3 style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "2rem" }}>Scouring Global Markets</h3>
                            <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>{steps[analysisStep]}</p>

                            <div className="step-dots" style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "2.5rem" }}>
                                {steps.map((_, i) => (
                                    <div key={i} className={`dot ${i <= analysisStep ? 'active' : 'research-dot'}`} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ── ERROR VIEW ──────────────────────────────────────── */}
                {state === "error" && (
                    <section className="error-card" style={{ border: "1px solid #fee2e2", background: "#fef2f2" }}>
                        <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
                            <div style={{ color: "#ef4444", marginBottom: "1.5rem" }}><IconAlert /></div>
                            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#991b1b" }}>Research Failure</h3>
                            <p style={{ color: "#b91c1c", maxWidth: "400px", margin: "1rem auto 2.5rem", lineHeight: "1.6" }}>
                                {errorMsg}
                            </p>
                            <button className="btn-v3-primary" style={{ background: "#991b1b" }} onClick={() => setState("input")}>Try Again</button>
                        </div>
                    </section>
                )}

                {/* ── RESULTS VIEW ────────────────────────────────────── */}
                {state === "results" && auditResult && (
                    <section className="results-pane">
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem", marginBottom: "3rem" }}>
                            <div className="result-header-card">
                                <h3 style={{ fontSize: "1.75rem", fontWeight: 800 }}>Venture Audit: <span style={{ color: "var(--blue)" }}>Final Report</span></h3>
                                <p style={{ color: "#6b7280", marginTop: "0.5rem" }}>Market Scour Status: Success • Database Integrity: 100%</p>
                            </div>
                            <div className="disruption-card">
                                <div className="disruption-value">{auditResult.disruptionScore}</div>
                                <div className="disruption-label">Disruption Score</div>
                            </div>
                        </div>

                        <div className="capabilities-grid">
                            {[
                                { title: "Market Fit", value: auditResult.marketFit.value, desc: auditResult.marketFit.description, icon: <IconBarChart />, color: "var(--blue)" },
                                { title: "Scalability", value: auditResult.scalability.value, desc: auditResult.scalability.description, icon: <IconShield />, color: "var(--lime)" },
                                { title: "Feasibility", value: auditResult.feasibility.value, desc: auditResult.feasibility.description, icon: <IconZap />, color: "#f59e0b" }
                            ].map((cap, i) => (
                                <div key={i} className="capability-card result-card">
                                    <div className="cap-icon" style={{ color: cap.color }}>{cap.icon}</div>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                        <h4>{cap.title}</h4>
                                        <span className="result-value" style={{ color: cap.color }}>{cap.value}</span>
                                    </div>
                                    <p>{cap.desc}</p>
                                    <div className="cap-footer"><IconCheck /> <span>Audit Verified</span></div>
                                </div>
                            ))}
                        </div>

                        <div className="landscape-section" style={{ marginTop: "2rem" }}>
                            <div className={`landscape-card ${auditResult.landscape.status === 'Saturated Market' ? 'card-saturated' : ''}`}>
                                {auditResult.landscape.status === 'Saturated Market' && (
                                    <div className="saturated-alert">
                                        <div className="alert-badge"><IconAlert /> RED OCEAN DETECTED</div>
                                        <p>This market segment is highly saturated with established players. High differentiation is critical for survival.</p>
                                    </div>
                                )}

                                <div className="landscape-header">
                                    <div>
                                        <h4 style={{ fontWeight: 800, fontSize: "1.2rem" }}>Competitive Landscape Scour</h4>
                                        <p style={{ color: "#6b7280", fontSize: "0.85rem", marginTop: "0.25rem" }}>Based on global venture registry analysis</p>
                                    </div>
                                    <span className={`status-tag ${auditResult.landscape.status === 'First-of-its-kind' ? 'tag-gold' :
                                        auditResult.landscape.status === 'Saturated Market' ? 'tag-danger' : 'tag-neutral'
                                        }`}>
                                        {auditResult.landscape.status}
                                    </span>
                                </div>

                                <div className="landscape-body">
                                    <div className="landscape-grid-main">
                                        <div className="landscape-column">
                                            <div className="group-label">Identified Competitors</div>
                                            <div className="competitor-grid">
                                                {auditResult.landscape.competitors.map((c, i) => (
                                                    <div key={i} className="competitor-node">
                                                        <div className="node-dot"></div>
                                                        <span>{c}</span>
                                                    </div>
                                                ))}
                                                {auditResult.landscape.competitors.length === 0 && (
                                                    <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>No direct entities identified.</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="landscape-column">
                                            <div className="group-label">Strategic Vectors</div>
                                            <div className="vector-card similarities">
                                                <div className="vector-header">
                                                    <IconCheck /> <span>Shared Traits</span>
                                                </div>
                                                <p>{auditResult.landscape.similarities}</p>
                                            </div>
                                            <div className="vector-card differences">
                                                <div className="vector-header">
                                                    <IconZap /> <span>Differentiation Bridge</span>
                                                </div>
                                                <p>{auditResult.landscape.differences}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ai-feedback-box" style={{ marginTop: "2rem" }}>
                            <h4 style={{ fontWeight: 800, marginBottom: "1rem" }}>Executive Summary</h4>
                            <p style={{ color: "#4b5563", lineHeight: "1.7" }}>{auditResult.summary}</p>
                        </div>

                        <div style={{ textAlign: "center", marginTop: "3rem" }}>
                            <button className="btn-v3-ghost" style={{ padding: "0.75rem 2rem" }} onClick={handleReset}>Initiate New Research Session</button>
                        </div>
                    </section>
                )}
            </div>

            <style jsx>{`
                .clean-elite-sandbox { max-width: 1400px; margin: 0 auto; }
                .early-access-badge {
                    font-size: 0.7rem; font-weight: 800; letter-spacing: 0.1em;
                    color: var(--blue); background: rgba(0, 122, 255, 0.05);
                    padding: 6px 14px; border-radius: 8px; border: 1px solid rgba(0, 122, 255, 0.1);
                }

                .hero-card, .input-card, .analyzing-card, .error-card, .landscape-card, .ai-feedback-box {
                    background: white; border: 1px solid #e5e7eb; border-radius: 24px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.02);
                }

                .hero-card { padding: 4rem; display: grid; grid-template-columns: 1fr 300px; align-items: center; gap: 4rem; }
                .ai-status { display: flex; align-items: center; gap: 0.75rem; color: var(--lime); font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; }
                .btn-v3-primary {
                    background: #111827; color: white; padding: 1rem 2.5rem; border-radius: 12px; font-weight: 800; border: none; cursor: pointer;
                    transition: all 0.2s; box-shadow: 0 10px 20px -5px rgba(17, 24, 39, 0.2); display: flex; align-items: center; gap: 0.75rem;
                }
                .btn-v3-primary:hover { transform: translateY(-2px); box-shadow: 0 15px 30px -10px rgba(17, 24, 39, 0.3); }
                .btn-v3-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
                .btn-v3-ghost { background: transparent; color: #111827; padding: 1rem 2.5rem; border-radius: 12px; font-weight: 800; border: 1px solid #e5e7eb; cursor: pointer; transition: all 0.2s; }
                .btn-v3-ghost:hover { background: #f9fafb; border-color: #111827; }

                .hero-visual { display: flex; justifyContent: center; align-items: center; }
                .orb-container { position: relative; width: 200px; height: 200px; }
                .orb { position: absolute; border-radius: 50%; filter: blur(40px); }
                .orb-main { width: 100%; height: 100%; background: radial-gradient(circle, var(--lime) 0%, transparent 70%); opacity: 0.3; animation: pulse 4s infinite alternate; }
                .orb-sub { width: 120%; height: 120%; top: -10%; left: -10%; background: radial-gradient(circle, var(--blue) 0%, transparent 70%); opacity: 0.1; animation: pulse 6s infinite alternate-reverse; }
                
                @keyframes pulse { from { transform: scale(1); opacity: 0.2; } to { transform: scale(1.3); opacity: 0.4; } }

                .telemetry-orb {
                    width: 80px; height: 80px; margin: 0 auto; border-radius: 50%;
                    background: var(--blue); box-shadow: 0 0 30px var(--blue);
                    animation: telemetry 2s infinite ease-in-out;
                }
                @keyframes telemetry { 0% { opacity: 0.3; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.1); } 100% { opacity: 0.3; transform: scale(0.8); } }

                .dot { width: 8px; height: 8px; border-radius: 50%; background: #e5e7eb; transition: all 0.3s; }
                .dot.active { background: var(--blue); box-shadow: 0 0 10px var(--blue); }

                .disruption-card { background: #111827; border-radius: 20px; padding: 2rem; text-align: center; color: white; }
                .disruption-value { font-size: 3rem; font-weight: 900; color: var(--lime); line-height: 1; }
                .disruption-label { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.4); margin-top: 0.5rem; }

                .capabilities-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
                .capability-card { background: white; border: 1px solid #e5e7eb; border-radius: 20px; padding: 2.25rem; transition: all 0.2s; }
                .result-card:hover { border-color: var(--blue); transform: translateY(-5px); }
                .cap-icon { margin-bottom: 1.5rem; }
                .capability-card h4 { font-size: 1.1rem; font-weight: 800; margin-bottom: 0.75rem; color: #111827; }
                .result-value { font-size: 0.7rem; font-weight: 900; text-transform: uppercase; padding: 3px 8px; background: #f9fafb; border-radius: 6px; }
                .capability-card p { font-size: 0.9rem; color: #6b7280; line-height: 1.6; margin-bottom: 1.5rem; }
                .cap-footer { display: flex; align-items: center; gap: 0.5rem; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; color: #9ca3af; }

                .landscape-card { padding: 0; overflow: hidden; }
                .card-saturated { border: 2px solid #fee2e2; }
                
                .saturated-alert {
                    background: #fee2e2; padding: 1rem 2.5rem; border-bottom: 1px solid #fecaca;
                    display: flex; align-items: center; gap: 2rem;
                }
                .alert-badge {
                    background: #ef4444; color: white; font-size: 0.65rem; font-weight: 900;
                    padding: 4px 10px; border-radius: 4px; display: flex; align-items: center; gap: 0.5rem;
                    white-space: nowrap;
                }
                .saturated-alert p { font-size: 0.85rem; color: #991b1b; font-weight: 600; margin: 0; }

                .landscape-header { 
                    display: flex; justify-content: space-between; align-items: center; 
                    padding: 2rem 2.5rem; border-bottom: 1px solid #f3f4f6; 
                }
                .status-tag { font-size: 0.65rem; font-weight: 800; padding: 6px 12px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.05em; }
                .tag-gold { background: #fffbeb; color: #b45309; border: 1px solid #fef3c7; }
                .tag-danger { background: #fee2e2; color: #ef4444; border: 1px solid #fecaca; }
                .tag-neutral { background: #f9fafb; color: #6b7280; border: 1px solid #e5e7eb; }

                .landscape-body { padding: 2.5rem; }
                .landscape-grid-main { display: grid; grid-template-columns: 350px 1fr; gap: 3rem; }
                
                .group-label { font-size: 0.7rem; font-weight: 800; color: #9ca3af; text-transform: uppercase; margin-bottom: 1.5rem; letter-spacing: 0.05em; }
                
                .competitor-grid { display: grid; grid-template-columns: 1fr; gap: 0.75rem; }
                .competitor-node {
                    background: #f9fafb; border: 1px solid #e5e7eb; padding: 12px 18px; 
                    border-radius: 12px; display: flex; align-items: center; gap: 1rem;
                    font-size: 0.95rem; font-weight: 700; color: #111827; transition: all 0.2s;
                }
                .competitor-node:hover { border-color: #111827; background: white; transform: translateX(5px); }
                .node-dot { width: 6px; height: 6px; border-radius: 50%; background: #9ca3af; }
                .competitor-node:hover .node-dot { background: var(--blue); box-shadow: 0 0 8px var(--blue); }

                .landscape-column { display: flex; flex-direction: column; }
                .vector-card { background: #f9fafb; border-radius: 16px; padding: 1.5rem; margin-bottom: 1rem; }
                .vector-header { display: flex; align-items: center; gap: 0.75rem; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #111827; margin-bottom: 1rem; }
                .vector-card p { font-size: 0.95rem; color: #4b5563; line-height: 1.6; margin: 0; }
                
                .similarities { border: 1px solid #e5e7eb; }
                .differences { border: 1px solid rgba(0, 122, 255, 0.1); background: rgba(0, 122, 255, 0.02); }

                .ai-feedback-box { padding: 2rem; }

                .research-orb { background: var(--blue); box-shadow: 0 0 40px var(--blue); }
                .research-dot.active { background: var(--blue); }

                @media (max-width: 1100px) {
                    .hero-card { grid-template-columns: 1fr; text-align: center; }
                    .landscape-grid-main { grid-template-columns: 1fr; }
                    .capabilities-grid { grid-template-columns: 1fr; }
                    .disruption-card { margin-top: 1rem; }
                    .saturated-alert { flex-direction: column; text-align: center; gap: 1rem; }
                }
            `}</style>
        </div>
    );
}
