"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getCollaborativeIdeas, Idea } from "@/lib/supabase-db";

// ── Icons ──────────────────────────────────────────────────────
const IconPlus = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
);
const IconSearch = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
);
const IconArrowRight = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
);
const IconSparkles = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.912 5.813h6.111l-4.943 3.591 1.887 5.85L12 14.663l-4.967 3.591 1.887-5.85-4.943-3.591h6.111L12 3z" /></svg>
);
const IconZap = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
);
const IconShield = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
);
const IconTrendingUp = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
);

export default function DashboardPage() {
    const { user, loading: authLoading } = useAuth();
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchMarketplace() {
            try {
                const marketplaceIdeas = await getCollaborativeIdeas();
                setIdeas(marketplaceIdeas);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
            setLoading(false);
        }
        fetchMarketplace();
    }, []);

    const userIdeasCount = ideas.filter(i => i.author_id === user?.id).length;

    return (
        <div className="dashboard-page clean-elite-v3">
            <header className="dashboard-header" style={{ marginBottom: "2.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                        <h1 style={{ fontSize: "101px", fontWeight: 400, color: "#111827", letterSpacing: "-0.05em", lineHeight: "1" }}>Idea Marketplace</h1>
                        <p style={{ color: "#6b7280", marginTop: "0.4rem", fontSize: "1.05rem" }}>Bridging real-world problems with actionable execution.</p>
                    </div>
                    <Link href="/dashboard/submit" className="btn-blue" style={{ borderRadius: "12px", padding: "0.8rem 1.6rem", display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700 }}>
                        <IconPlus /> Submit Proposal
                    </Link>
                </div>
            </header>

            {/* High-Density Stats Matrix */}
            <div className="stats-matrix" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem", marginBottom: "3rem" }}>
                <div className="stat-card">
                    <div className="stat-label"><span style={{ color: "var(--lime)", fontWeight: 800 }}>+12%</span> MARKET REGISTRY</div>
                    <div className="stat-value">{loading ? "..." : ideas.length}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label"><span style={{ color: "var(--blue)", fontWeight: 800 }}>ACTIVE</span> PERSONAL NODES</div>
                    <div className="stat-value">{loading ? "..." : userIdeasCount}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label"><span style={{ color: "var(--lime)", fontWeight: 800 }}>LIVE</span> IDEAAI INTELLIGENCE</div>
                    <div className="stat-value">Verified</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label"><span style={{ color: "#111827", fontWeight: 800 }}>ELITE</span> SCALE TRAJECTORY</div>
                    <div className="stat-value">Locked</div>
                </div>
            </div>

            <div className="main-content-layout" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "2.5rem" }}>
                {/* Venture Discovery Section */}
                <section className="discovery-pane">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: 800 }}>Venture Discovery</h3>
                        <div className="search-box">
                            <IconSearch />
                            <input type="text" placeholder="Search Registry..." />
                        </div>
                    </div>

                    <div className="venture-list" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {loading ? (
                            [1, 2, 3].map(i => <div key={i} className="venture-row-skeleton" />)
                        ) : ideas.length > 0 ? (
                            ideas.map((idea) => (
                                <div key={idea.id} className="venture-row">
                                    <div className="row-main">
                                        <div className="row-top">
                                            <span className="status-pill">Collaborative</span>
                                            <span className="collab-meta">{idea.collaborators} collaborators</span>
                                        </div>
                                        <h4>{idea.title}</h4>
                                        <p>{idea.description.substring(0, 120)}...</p>
                                    </div>
                                    <Link href={`/dashboard/ideas?id=${idea.id}`} className="btn-workspace">
                                        View Workspace <IconArrowRight />
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <p>No collaborative ventures available in the registry.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* AI & Momentum Sidebar */}
                <aside className="sidebar-pane" style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                    {/* AI Strategy Assistant removed */}

                    {/* Project Momentum */}
                    <div className="sidebar-card momentum-card">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                            <h4 style={{ margin: 0, fontWeight: 800 }}>Project Momentum</h4>
                            <span style={{ fontSize: "0.65rem", fontWeight: 800, color: "#9ca3af" }}>2 ACTIVE SESSIONS</span>
                        </div>
                        <div className="momentum-list" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                            {[
                                { title: "Smart Grid Optimization", phase: "Prototype", status: "Active", progress: 65 },
                                { title: "Eco-Sync Waste Mgmt", phase: "Validation", status: "On Hold", progress: 30 }
                            ].map((proj, i) => (
                                <div key={i} className="momentum-item">
                                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "0.5rem" }}>
                                        <span style={{ color: "#9ca3af" }}>{proj.phase}</span>
                                        <span style={{ color: proj.status === "Active" ? "var(--lime)" : "#9ca3af" }}>● {proj.status}</span>
                                    </div>
                                    <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.75rem" }}>{proj.title}</div>
                                    <div className="progress-bg"><div style={{ width: `${proj.progress}%` }} /></div>
                                </div>
                            ))}
                            <button className="btn-ghost-plus">
                                <IconPlus /> Find New Project
                            </button>
                        </div>
                    </div>
                </aside>
            </div>


            <style jsx>{`
                .clean-elite-v3 {
                    max-width: 1400px;
                    margin: 0 auto;
                }
                .stat-card {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 16px;
                    border: 1px solid #e5e7eb;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.02);
                }
                .stat-label {
                    font-size: 0.65rem;
                    font-weight: 700;
                    color: #9ca3af;
                    letter-spacing: 0.05em;
                    margin-bottom: 0.5rem;
                }
                .stat-value {
                    font-size: 1.75rem;
                    font-weight: 900;
                    color: #111827;
                }
                
                .search-box {
                    background: #f9fafb;
                    border: 1px solid #e5e7eb;
                    border-radius: 10px;
                    padding: 0.5rem 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    width: 300px;
                }
                .search-box input {
                    background: transparent;
                    border: none;
                    outline: none;
                    font-size: 0.9rem;
                    width: 100%;
                }
                
                .venture-row {
                    background: white;
                    border: 1px solid #e5e7eb;
                    border-radius: 16px;
                    padding: 1.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    transition: all 0.2s;
                }
                .venture-row:hover {
                    border-color: var(--blue);
                    box-shadow: 0 10px 20px -10px rgba(0,0,0,0.03);
                }
                .row-top {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 0.5rem;
                }
                .status-pill {
                    font-size: 0.65rem;
                    font-weight: 800;
                    color: var(--blue);
                    background: rgba(0,122,255,0.05);
                    padding: 2px 8px;
                    border-radius: 6px;
                    text-transform: uppercase;
                }
                .collab-meta {
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #9ca3af;
                }
                .row-main h4 {
                    font-size: 1.1rem;
                    font-weight: 800;
                    margin: 0;
                    color: #111827;
                }
                .row-main p {
                    font-size: 0.9rem;
                    color: #6b7280;
                    margin: 0.25rem 0 0;
                    line-height: 1.5;
                }
                .btn-workspace {
                    padding: 0.75rem 1.25rem;
                    border: 1px solid #e5e7eb;
                    border-radius: 10px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    white-space: nowrap;
                    margin-left: 2rem;
                    transition: all 0.2s;
                }
                .btn-workspace:hover {
                    background: #111827;
                    color: white;
                    border-color: #111827;
                }

                .sidebar-card {
                    background: white;
                    border: 1px solid #e5e7eb;
                    border-radius: 16px;
                    padding: 1.8rem;
                }
                .ai-card {
                    border-top: 4px solid var(--blue);
                }
                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1.5rem;
                }
                .icon-box {
                    background: #f9fafb;
                    padding: 10px;
                    border-radius: 12px;
                    color: var(--blue);
                }
                .ai-content p {
                    font-size: 0.95rem;
                    line-height: 1.6;
                    color: #4b5563;
                    margin-bottom: 1.5rem;
                }
                .btn-launch {
                    width: 100%;
                    padding: 0.9rem;
                    background: #111827;
                    color: white;
                    border: none;
                    border-radius: 10px;
                    font-weight: 800;
                    font-size: 0.95rem;
                    cursor: pointer;
                    transition: opacity 0.2s;
                }
                .btn-launch:hover { opacity: 0.9; }

                .momentum-item {
                    padding-bottom: 1.25rem;
                    border-bottom: 1px solid #f3f4f6;
                }
                .momentum-item:last-child { border-bottom: none; }
                .progress-bg {
                    height: 6px;
                    background: #f3f4f6;
                    border-radius: 10px;
                    overflow: hidden;
                }
                .progress-bg div {
                    height: 100%;
                    background: var(--blue);
                    border-radius: 10px;
                }
                .btn-ghost-plus {
                    width: 100%;
                    padding: 1rem;
                    border: 2px dashed #e5e7eb;
                    background: transparent;
                    color: var(--blue);
                    font-weight: 700;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .btn-ghost-plus:hover {
                    background: #f9fafb;
                    border-color: var(--blue);
                }

                @media (max-width: 1200px) {
                    .main-content-layout { grid-template-columns: 1fr !important; }
                    .stats-matrix { grid-template-columns: repeat(2, 1fr) !important; }
                }
                .venture-row-skeleton {
                    height: 100px;
                    background: #f9fafb;
                    border-radius: 16px;
                    border: 1px solid #e5e7eb;
                }



                @media (max-width: 900px) {
                    .pivots-grid { grid-template-columns: 1fr; }
                    .modal-window { padding: 2rem; }
                    .modal-header-v2 h2 { font-size: 1.75rem; }
                }
            `}</style>
        </div>
    );
}
