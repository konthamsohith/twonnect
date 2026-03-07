"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getUserIdeas, Idea, updateIdea, deleteIdea } from "@/lib/supabase-db";
import EditIdeaModal from "@/app/components/EditIdeaModal";
import IdeaTableRow from "@/app/components/IdeaTableRow";
import ManagementHeader from "@/app/components/ManagementHeader";

const IconPlus = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
);

export default function MyIdeasPage() {
    const { user, loading: authLoading } = useAuth();
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingIdea, setEditingIdea] = useState<Idea | null>(null);

    // Filtering states
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");

    const fetchIdeas = async () => {
        setLoading(true);
        try {
            if (user?.id) {
                const userIdeas = await getUserIdeas(user.id);
                setIdeas(userIdeas);
            }
        } catch (err) {
            console.error("Fetch ideas failed:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!authLoading) {
            fetchIdeas();
        }
    }, [user, authLoading]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this idea?")) return;
        try {
            await deleteIdea(id);
            setIdeas(currentIdeas => currentIdeas.filter(i => i.id !== id));
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete idea. Please try again.");
        }
    };

    const handleUpdate = async (id: string, data: Partial<Idea>) => {
        try {
            await updateIdea(id, data);
            await fetchIdeas();
        } catch (error) {
            console.error("Update failed:", error);
            throw error;
        }
    };

    // Filtered data
    const filteredIdeas = ideas.filter(idea => {
        const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === "all" || idea.status === activeTab;
        return matchesSearch && matchesTab;
    });

    // Stats
    const totalIdeas = ideas.length;
    const collaborativeCount = ideas.filter(i => i.status === "Collaborative").length;
    const draftCount = totalIdeas - collaborativeCount;

    return (
        <div className="dashboard-page control-center">
            <header className="dashboard-header" style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                        <h1 style={{ fontSize: "32px", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: "1" }}>Idea Control Center</h1>
                        <p style={{ opacity: 0.8 }}>Professional management suite for your startup registry.</p>
                    </div>
                    <Link href="/dashboard/submit" className="btn-blue" style={{ display: "flex", alignItems: "center", gap: "0.5rem", borderRadius: "10px", padding: "0.8rem 1.4rem", fontWeight: 700 }}>
                        <IconPlus /> Add Proposal
                    </Link>
                </div>
            </header>

            {/* Quick Stats Summary */}
            <div className="stats-summary" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", marginBottom: "2rem" }}>
                <div className="stat-plate" style={{ background: "white", padding: "1.25rem", borderRadius: "16px", border: "1px solid #e5e7eb" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", marginBottom: "0.25rem" }}>Total Proposals</div>
                    <div style={{ fontSize: "20px", fontWeight: 600, color: "#111827", letterSpacing: "-0.03em" }}>{loading ? "..." : totalIdeas}</div>
                </div>
                <div className="stat-plate" style={{ background: "white", padding: "1.25rem", borderRadius: "16px", border: "1px solid #e5e7eb" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", marginBottom: "0.25rem" }}>Collaborative</div>
                    <div style={{ fontSize: "20px", fontWeight: 600, color: "var(--lime)", letterSpacing: "-0.03em" }}>{loading ? "..." : collaborativeCount}</div>
                </div>
                <div className="stat-plate" style={{ background: "white", padding: "1.25rem", borderRadius: "16px", border: "1px solid #e5e7eb" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", marginBottom: "0.25rem" }}>Draft Backlog</div>
                    <div style={{ fontSize: "20px", fontWeight: 600, color: "var(--blue)", letterSpacing: "-0.03em" }}>{loading ? "..." : draftCount}</div>
                </div>
            </div>

            <ManagementHeader
                onSearch={setSearchQuery}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                totalCount={filteredIdeas.length}
            />

            <div className="management-container" style={{
                background: "white",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
                overflow: "hidden",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
            }}>
                {/* Table Header */}
                <div className="management-header-labels" style={{
                    display: "grid",
                    gridTemplateColumns: "140px 1fr 180px 100px 140px",
                    padding: "0.75rem 1.5rem",
                    background: "#f9fafb",
                    borderBottom: "1px solid #e5e7eb",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: "#9ca3af",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em"
                }}>
                    <div>Status</div>
                    <div>Concept & Description</div>
                    <div>Health Metrics</div>
                    <div>Added</div>
                    <div style={{ textAlign: "right" }}>Management</div>
                </div>

                {(loading || authLoading) ? (
                    [1, 2, 3].map((i) => (
                        <div key={i} className="skeleton-row" style={{ height: "72px", borderBottom: "1px solid #f3f4f6", padding: "1rem 1.5rem" }}>
                            <div style={{ height: "16px", width: "120px", background: "#f3f4f6", borderRadius: "4px" }}></div>
                        </div>
                    ))
                ) : filteredIdeas.length > 0 ? (
                    filteredIdeas.map((idea) => (
                        <IdeaTableRow
                            key={idea.id}
                            idea={idea}
                            onEdit={() => setEditingIdea(idea)}
                            onDelete={() => handleDelete(idea.id!)}
                            onAudit={() => alert("AI Audit is analyzing your idea...")}
                        />
                    ))
                ) : (
                    <div style={{ padding: "4rem 2rem", textAlign: "center", color: "#6b7280" }}>
                        <p>No proposals match your current filters.</p>
                    </div>
                )}
            </div>

            {!loading && !authLoading && ideas.length === 0 && (
                <div className="chart-card" style={{ textAlign: "center", padding: "4rem 2rem", marginTop: "2rem" }}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem" }}>
                        Registry Empty
                    </h3>
                    <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
                        Your professional startup ideas will be managed here once submitted.
                    </p>
                    <Link href="/dashboard/submit" className="btn-blue" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.8rem 2rem" }}>
                        <IconPlus /> New Submission
                    </Link>
                </div>
            )}

            {editingIdea && (
                <EditIdeaModal
                    idea={editingIdea}
                    onClose={() => setEditingIdea(null)}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
}
