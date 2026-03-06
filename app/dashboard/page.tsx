"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getAllIdeas, Idea } from "@/lib/supabase-db";

// ── Premium SVG Icons ──────────────────────────────────────────
const IconPlus = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
);
const IconList = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
);
const IconCollab = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
const IconSparkles = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.912 5.813h6.111l-4.943 3.591 1.887 5.85L12 14.663l-4.967 3.591 1.887-5.85-4.943-3.591h6.111L12 3z" /></svg>
);
const IconRocket = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.71-2.13.09-2.91a2.18 2.18 0 0 0-3.09-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2.5 5-2.5" /><path d="M12 15v5s3.03-.55 4.5-2c1.63-1.62 2.5-5 2.5-5" /></svg>
);

export default function DashboardPage() {
    const { user } = useAuth();
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMarketplace() {
            try {
                const allIdeas = await getAllIdeas();
                setIdeas(allIdeas);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
            setLoading(false);
        }
        fetchMarketplace();
    }, []);

    const userIdeasCount = ideas.filter(i => i.author_id === user?.id).length;

    const stats = [
        { title: "Problems Dumped", value: ideas.length.toString(), icon: <IconList /> },
        { title: "Your Contributions", value: userIdeasCount.toString(), icon: <IconCollab /> },
        { title: "AI Refinement Active", value: "Enabled", icon: <IconSparkles /> },
        { title: "Potential Ventures", value: "Beta", icon: <IconRocket /> },
    ];

    return (
        <div className="dashboard-page">
            <header className="dashboard-header">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                        <h1>Idea Marketplace</h1>
                        <p>Bridging real-world problems with actionable execution.</p>
                    </div>
                    <button className="btn-blue" style={{ borderRadius: "12px", padding: "0.8rem 1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <IconPlus /> Dump a Problem
                    </button>
                </div>
            </header>

            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                            <div className="stat-title">{stat.title}</div>
                            <div style={{ color: "var(--blue)", opacity: 0.8 }}>{stat.icon}</div>
                        </div>
                        <div className="stat-value">{stat.value}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem", marginBottom: "2.5rem" }}>
                <div className="chart-card" style={{ height: "fit-content" }}>
                    <div className="chart-header">
                        <div className="chart-title">
                            <h3>Trending Problem Statements</h3>
                            <p>Recent challenges looking for builders &amp; innovators</p>
                        </div>
                    </div>

                    <div className="dashboard-list">
                        {loading ? (
                            <p style={{ padding: "1rem", color: "#6b7280" }}>Fetching latest ideas...</p>
                        ) : (
                            ideas.slice(0, 5).map((idea, index) => (
                                <div key={idea.id || index} className="list-item">
                                    <div className="item-main">
                                        <div className="item-tag">{idea.status}</div>
                                        <h4>{idea.title}</h4>
                                        <p>{idea.description.substring(0, 100)}...</p>
                                    </div>
                                    <div className="item-meta">
                                        <span>{idea.collaborators} collaborators</span>
                                        <button className="btn-ghost">View Details</button>
                                    </div>
                                </div>
                            ))
                        )}
                        {!loading && ideas.length === 0 && (
                            <p style={{ padding: "1rem", color: "#6b7280" }}>No ideas found. Be the first to dump a problem!</p>
                        )}
                    </div>
                </div>

                <div className="chart-card ai-summary-card">
                    <div className="chart-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <h3>AI Strategy Assistant</h3>
                            <p>Powered by IdeaAI</p>
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.1)", padding: "8px", borderRadius: "12px" }}>
                            <IconSparkles />
                        </div>
                    </div>
                    <div className="ai-content">
                        <div className="ai-bubble">
                            &quot;I noticed you&apos;re interested in <strong>Supply Chain Transparency</strong>. I can help refine your solution strategy.&quot;
                        </div>
                        <button className="btn-black" style={{ width: "100%", marginTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                            <IconRocket /> Start Refinement
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem" }}>Your Active Collaborations</h3>
                <div className="stats-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                    <div className="stat-card collab-card">
                        <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Smart Grid Optimization</div>
                        <div style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "1rem" }}>Phase: Prototype Development</div>
                        <div className="progress-bar-sm"><div style={{ width: "65%" }}></div></div>
                    </div>
                    <div className="stat-card collab-card">
                        <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Eco-Sync Waste Mgmt</div>
                        <div style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "1rem" }}>Phase: Idea Validation</div>
                        <div className="progress-bar-sm"><div style={{ width: "30%" }}></div></div>
                    </div>
                    <div className="stat-card collab-card" style={{ display: "flex", alignItems: "center", justifyContent: "center", borderStyle: "dashed", background: "transparent" }}>
                        <span style={{ color: "var(--blue)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <IconPlus /> Find New Project
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
