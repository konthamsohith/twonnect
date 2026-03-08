"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getCollaborativeIdeas, Idea, createCollaborationRequest, getUserCollaborationRequest } from "@/lib/supabase-db";
import CollabCard from "@/app/components/CollabCard";
import "./collaborations.css";

export default function CollaborationsPage() {
    const { user, loading: authLoading } = useAuth();
    const [collaborativeIdeas, setCollaborativeIdeas] = useState<Idea[]>([]);
    const [loading, setLoading] = useState(true);
    const [sentRequests, setSentRequests] = useState<Set<string>>(new Set());
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const ideas = await getCollaborativeIdeas();
                setCollaborativeIdeas(ideas);

                if (user?.id) {
                    // Check for existing requests to show "Requested" state
                    const requests = await Promise.all(
                        ideas.map(async (idea) => {
                            const req = await getUserCollaborationRequest(idea.id!, user.id);
                            return req ? idea.id! : null;
                        })
                    );
                    setSentRequests(new Set(requests.filter((id): id is string => id !== null)));
                }
            } catch (error) {
                console.error("Error fetching collaborative ideas:", error);
            } finally {
                setLoading(false);
            }
        }

        if (!authLoading) {
            fetchData();
        }
    }, [authLoading, user?.id]);

    const handleJoinRequest = async (ideaId: string) => {
        if (!user?.id) return;

        setActionLoading(ideaId);
        try {
            const success = await createCollaborationRequest(ideaId, user.id, "Interested in joining this elite venture.");
            if (success) {
                setSentRequests(prev => new Set([...Array.from(prev), ideaId]));
                alert("Collaboration request sent! The project owner will be notified.");
            } else {
                alert("Failed to send request. You might have already requested collaboration.");
            }
        } catch (error) {
            console.error("Error sending join request:", error);
        } finally {
            setActionLoading(null);
        }
    };

    // Filter projects for "Your Teams" (user is author)
    const yourTeams = collaborativeIdeas.filter(idea => idea.author_id === user?.id);
    const discoverTeams = collaborativeIdeas.filter(idea => idea.author_id !== user?.id);

    return (
        <div className="dashboard-page">
            <header className="collab-header-premium">
                <div className="header-content">
                    <h1 className="header-title">Collaborations</h1>
                    <p className="header-subtitle">Build the next big thing with our community of makers.</p>
                </div>
                <div className="header-actions">
                    <button className="btn-premium-action" onClick={() => window.location.href = "/dashboard/submit"}>
                        Start a Collaborative Project
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                </div>
            </header>

            {loading ? (
                <div style={{ padding: "2rem", textAlign: "center", color: "#6b7280" }}>
                    Loading active projects...
                </div>
            ) : (
                <div className="collaborations-container">
                    {/* Your Teams Section */}
                    {yourTeams.length > 0 && (
                        <section style={{ marginBottom: "5rem" }}>
                            <h2 className="section-title">Projects You Lead</h2>
                            <div className="collab-grid">
                                {yourTeams.map((idea) => (
                                    <CollabCard
                                        key={idea.id}
                                        title={idea.title}
                                        description={idea.description}
                                        impact={idea.impact}
                                        author="You"
                                        collaborators={idea.collaborators || 0}
                                        onJoin={() => alert("You are already the owner of this project!")}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Discovery Section */}
                    <section>
                        <h2 className="section-title">Discover Open Collaborations</h2>
                        {discoverTeams.length > 0 ? (
                            <div className="collab-grid">
                                {discoverTeams.map((idea) => (
                                    <CollabCard
                                        key={idea.id}
                                        title={idea.title}
                                        description={idea.description}
                                        impact={idea.impact}
                                        author={idea.author_name}
                                        collaborators={idea.collaborators || 0}
                                        onJoin={() => handleJoinRequest(idea.id!)}
                                        isRequested={sentRequests.has(idea.id!)}
                                        isLoading={actionLoading === idea.id}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="card" style={{ textAlign: "center", padding: "5rem 2rem", background: "rgba(255,255,255,0.5)", borderStyle: "dashed" }}>
                                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚀</div>
                                <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem" }}>No open collaborations yet</h3>
                                <p style={{ color: "#6b7280", maxWidth: "400px", margin: "0 auto" }}>Be the visionary who starts the next great project. Click "Start a Collaborative Project" to begin.</p>
                            </div>
                        )}
                    </section>
                </div>
            )}
        </div>
    );
}
