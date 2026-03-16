"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { createIdea } from "@/lib/supabase-db";

const IconPlus = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
);

const IconSparkles = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.912 5.813h6.111l-4.943 3.591 1.887 5.85L12 14.663l-4.967 3.591 1.887-5.85-4.943-3.591h6.111L12 3z" /></svg>
);

const IconArrowLeft = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
);

const IconZap = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
);

const IconShield = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
);

export default function SubmitIdeaPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [impact, setImpact] = useState("");
    const [targetAudience, setTargetAudience] = useState<"Developer" | "Investor">("Developer");
    const [valuation, setValuation] = useState("");
    const [fundingRequired, setFundingRequired] = useState("");
    const [equityOffered, setEquityOffered] = useState("");
    const [isCollaborative, setIsCollaborative] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || isSubmitting) return;
        setIsSubmitting(true);
        try {
            await createIdea({
                title,
                description,
                impact,
                author_id: user.id,
                author_name: user?.user_metadata?.full_name || user.email || "Anonymous",
                status: isCollaborative ? "Collaborative" : "Draft",
                target_audience: targetAudience,
                valuation: targetAudience === "Investor" ? valuation : undefined,
                funding_required: targetAudience === "Investor" ? fundingRequired : undefined,
                equity_offered: targetAudience === "Investor" ? equityOffered : undefined
            });
            router.push("/dashboard/ideas");
        } catch (error) {
            console.error("Submission failed:", error);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="submit-workspace-root" style={{ height: "calc(100vh - 100px)", display: "flex", flexDirection: "column" }}>
            {/* Command Bar */}
            <div className="command-bar" style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.75rem 0",
                borderBottom: "1px solid #e5e7eb",
                marginBottom: "1.5rem"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                    <Link href="/dashboard/ideas" className="command-back" style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "#6b7280",
                        textDecoration: "none",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        transition: "color 0.2s"
                    }}>
                        <IconArrowLeft /> Registry
                    </Link>
                    <div style={{ height: "16px", width: "1px", background: "#e5e7eb" }}></div>
                    <h1 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, letterSpacing: "-0.01em" }}>New Venture Pipeline</h1>
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                    <button
                        onClick={() => router.push("/dashboard/ideas")}
                        type="button"
                        style={{ background: "#f3f4f6", border: "none", padding: "0.6rem 1.25rem", borderRadius: "10px", fontSize: "0.85rem", fontWeight: 700, color: "#4b5563", cursor: "pointer" }}
                    >
                        Discard
                    </button>
                    <button
                        form="submit-form"
                        type="submit"
                        disabled={isSubmitting}
                        style={{ background: "var(--blue)", border: "none", padding: "0.6rem 1.5rem", borderRadius: "10px", fontSize: "0.85rem", fontWeight: 700, color: "white", cursor: "pointer", boxShadow: "0 4px 12px rgba(0, 122, 255, 0.2)" }}
                    >
                        {isSubmitting ? "Finalizing..." : "Publish to Registry"}
                    </button>
                </div>
            </div>

            <div className="split-layout" style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 340px", gap: "2.5rem", minHeight: 0 }}>
                {/* Main Submission Form */}
                <div className="submission-column" style={{ overflowY: "auto", paddingRight: "1rem" }}>
                    <form id="submit-form" onSubmit={handleSubmit}>
                        <div className="form-section" style={{ marginBottom: "2.5rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                                <div style={{ background: "#f3f4f6", padding: "4px", borderRadius: "6px" }}><IconZap /></div>
                                <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em" }}>Step 1: Problem Definition</span>
                            </div>

                            <div className="input-field" style={{ marginBottom: "1.5rem" }}>
                                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#000000", marginBottom: "0.5rem" }}>Core Problem Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Inefficient Waste Management in Urban Areas"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    style={{ width: "100%", padding: "0.875rem 1.25rem", borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: "0.95rem", outline: "none", fontWeight: 500 }}
                                    className="system-input"
                                />
                            </div>

                            <div className="input-field">
                                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#000000", marginBottom: "0.5rem" }}>Problem Deep-Dive</label>
                                <textarea
                                    placeholder="Provide details about the challenge, who it affects, and why it needs solving..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    style={{ width: "100%", padding: "1rem 1.25rem", borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: "0.95rem", minHeight: "220px", resize: "none", outline: "none", lineHeight: "1.6" }}
                                    className="system-input"
                                />
                            </div>
                        </div>

                        <div className="form-section" style={{ marginBottom: "2.5rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                                <div style={{ background: "#f3f4f6", padding: "4px", borderRadius: "6px" }}><IconSparkles /></div>
                                <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em" }}>Step 2: Target Audience</span>
                            </div>

                            <div className="target-selection" style={{
                                display: "flex",
                                background: "#f3f4f6",
                                padding: "4px",
                                borderRadius: "12px",
                                marginBottom: "2rem"
                            }}>
                                <button
                                    type="button"
                                    onClick={() => setTargetAudience("Developer")}
                                    style={{
                                        flex: 1,
                                        padding: "0.75rem",
                                        borderRadius: "10px",
                                        border: "none",
                                        fontSize: "0.85rem",
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        background: targetAudience === "Developer" ? "white" : "transparent",
                                        color: targetAudience === "Developer" ? "var(--blue)" : "#6b7280",
                                        boxShadow: targetAudience === "Developer" ? "0 2px 4px rgba(0,0,0,0.05)" : "none",
                                        transition: "all 0.2s"
                                    }}
                                >
                                    Contributors & Developers
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTargetAudience("Investor")}
                                    style={{
                                        flex: 1,
                                        padding: "0.75rem",
                                        borderRadius: "10px",
                                        border: "none",
                                        fontSize: "0.85rem",
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        background: targetAudience === "Investor" ? "white" : "transparent",
                                        color: targetAudience === "Investor" ? "var(--blue)" : "#6b7280",
                                        boxShadow: targetAudience === "Investor" ? "0 2px 4px rgba(0,0,0,0.05)" : "none",
                                        transition: "all 0.2s"
                                    }}
                                >
                                    Funding & Investors
                                </button>
                            </div>

                            {targetAudience === "Investor" && (
                                <div className="investor-fields" style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: "1.5rem",
                                    animation: "slideDown 0.3s ease-out"
                                }}>
                                    <div className="input-field">
                                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#000000", marginBottom: "0.5rem" }}>Project Valuation ($)</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 5,000,000"
                                            value={valuation}
                                            onChange={(e) => setValuation(e.target.value)}
                                            style={{ width: "100%", padding: "0.875rem 1.25rem", borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: "0.95rem", outline: "none" }}
                                            className="system-input"
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#000000", marginBottom: "0.5rem" }}>Funding Required ($)</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 500,000"
                                            value={fundingRequired}
                                            onChange={(e) => setFundingRequired(e.target.value)}
                                            style={{ width: "100%", padding: "0.875rem 1.25rem", borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: "0.95rem", outline: "none" }}
                                            className="system-input"
                                        />
                                    </div>
                                    <div className="input-field" style={{ gridColumn: "span 2" }}>
                                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#000000", marginBottom: "0.5rem" }}>Equity Offered (%)</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 10%"
                                            value={equityOffered}
                                            onChange={(e) => setEquityOffered(e.target.value)}
                                            style={{ width: "100%", padding: "0.875rem 1.25rem", borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: "0.95rem", outline: "none" }}
                                            className="system-input"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="form-section">
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                                <div style={{ background: "#f3f4f6", padding: "4px", borderRadius: "6px" }}><IconShield /></div>
                                <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em" }}>Step 3: Operational Parameters</span>
                            </div>

                            <div className="input-field" style={{ marginBottom: "1.5rem" }}>
                                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#000000", marginBottom: "0.5rem" }}>Targeted Impact Score (Estimated)</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 85 / 100"
                                    value={impact}
                                    onChange={(e) => setImpact(e.target.value)}
                                    style={{ width: "100%", padding: "0.875rem 1.25rem", borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: "0.95rem", outline: "none" }}
                                    className="system-input"
                                />
                            </div>

                            <div className="status-switcher" style={{
                                background: "#f9fafb",
                                padding: "1.25rem",
                                borderRadius: "16px",
                                border: "1px solid #f3f4f6",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: "0.9rem", fontWeight: 700 }}>Collaboration Portal</h4>
                                    <p style={{ margin: "2px 0 0 0", fontSize: "0.75rem", color: "#6b7280" }}>Make this venture visible to potential partners.</p>
                                </div>
                                <div
                                    onClick={() => setIsCollaborative(!isCollaborative)}
                                    style={{
                                        width: "48px",
                                        height: "26px",
                                        background: isCollaborative ? "var(--lime)" : "#e5e7eb",
                                        borderRadius: "20px",
                                        position: "relative",
                                        cursor: "pointer",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                                    }}
                                >
                                    <div style={{
                                        position: "absolute",
                                        top: "3px",
                                        left: isCollaborative ? "25px" : "3px",
                                        width: "20px",
                                        height: "20px",
                                        background: "white",
                                        borderRadius: "50%",
                                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                                    }}></div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* AI Intelligence Column */}
                <div className="intelligence-column">
                    <div className="ai-companion-card" style={{
                        background: "#f9fafb",
                        border: "1px solid #e5e7eb",
                        borderRadius: "24px",
                        padding: "1.75rem",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                            <div style={{ background: "#000000", color: "white", padding: "8px", borderRadius: "10px" }}><IconSparkles /></div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 800 }}>TWONNECT Companion</h3>
                                <span style={{ fontSize: "0.7rem", color: "#6b7280", fontWeight: 600 }}>READY TO REFINE</span>
                            </div>
                        </div>

                        <div style={{ flex: 1 }}>
                            <div className="tip-box" style={{ background: "white", padding: "1.25rem", borderRadius: "16px", border: "1px solid #f3f4f6", marginBottom: "1.25rem" }}>
                                <h5 style={{ margin: 0, fontSize: "0.85rem", fontWeight: 700, color: "var(--blue)", marginBottom: "0.5rem" }}>Executive Tip</h5>
                                <p style={{ margin: 0, fontSize: "0.8rem", color: "#4b5563", lineHeight: "1.5" }}>
                                    The most successful ventures start with a highly specific problem statement. Frame it around **who** loses the most value.
                                </p>
                            </div>

                            <div className="tip-box" style={{ background: "white", padding: "1.25rem", borderRadius: "16px", border: "1px solid #f3f4f6" }}>
                                <h5 style={{ margin: 0, fontSize: "0.85rem", fontWeight: 700, color: "var(--lime)", marginBottom: "0.5rem" }}>Market Insight</h5>
                                <p style={{ margin: 0, fontSize: "0.8rem", color: "#4b5563", lineHeight: "1.5" }}>
                                    Ideas submitted as **Collaborative** attract 4x more engagement within the first 24 hours in our portal.
                                </p>
                            </div>
                        </div>

                        <button type="button" className="refine-btn" style={{
                            width: "100%",
                            padding: "1rem",
                            background: "#000000",
                            color: "white",
                            border: "none",
                            borderRadius: "14px",
                            fontSize: "0.9rem",
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.75rem",
                            cursor: "pointer",
                            transition: "all 0.2s"
                        }}>
                            <IconSparkles /> Refine with AI
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .command-back:hover { color: var(--blue) !important; }
                .system-input:focus {
                    border-color: var(--blue) !important;
                    background: #fcfdfe;
                    box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.08);
                }
                .refine-btn:hover {
                    background: #000;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
                }
                .refine-btn:active { transform: translateY(0); }

                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @media (max-width: 1024px) {
                    .split-layout { grid-template-columns: 1fr; }
                    .intelligence-column { display: none; }
                }
            `}</style>
        </div>
    );
}
