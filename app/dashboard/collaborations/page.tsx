"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getCollaborativeIdeas, Idea } from "@/lib/supabase-db";
import CollabCard from "@/app/components/CollabCard";

export default function CollaborationsPage() {
    const { user, loading: authLoading } = useAuth();
    const [collaborativeIdeas, setCollaborativeIdeas] = useState<Idea[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const ideas = await getCollaborativeIdeas();
                setCollaborativeIdeas(ideas);
            } catch (error) {
                console.error("Error fetching collaborative ideas:", error);
            } finally {
                setLoading(false);
            }
        }

        if (!authLoading) {
            fetchData();
        }
    }, [authLoading]);

    const handleJoinRequest = (ideaId: string) => {
        alert("Collaboration request sent! The project owner will be notified.");
    };

    // Filter projects for "Your Teams" (user is author)
    const yourTeams = collaborativeIdeas.filter(idea => idea.author_id === user?.id);
    const discoverTeams = collaborativeIdeas.filter(idea => idea.author_id !== user?.id);

    return (
        <div className="dashboard-page">
            <header className="dashboard-header">
                <div>
                    <h1>Collaborations</h1>
                    <p>Build the next big thing with our community of makers.</p>
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <button className="btn-blue" onClick={() => window.location.href = "/dashboard/submit"}>
                        Start a Collaborative Project
                    </button>
                </div>
            </header>

            {loading ? (
                <div style={{ padding: "2rem", textAlign: "center", color: "#6b7280" }}>
                    Loading active projects...
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
                    {/* Your Teams Section */}
                    {yourTeams.length > 0 && (
                        <section>
                            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem" }}>Projects You Lead</h2>
                            <div className="stats-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
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
                        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem" }}>Discover Open Collaborations</h2>
                        {discoverTeams.length > 0 ? (
                            <div className="stats-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
                                {discoverTeams.map((idea) => (
                                    <CollabCard
                                        key={idea.id}
                                        title={idea.title}
                                        description={idea.description}
                                        impact={idea.impact}
                                        author={idea.author_name}
                                        collaborators={idea.collaborators || 0}
                                        onJoin={() => handleJoinRequest(idea.id!)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="chart-card" style={{ textAlign: "center", padding: "3rem" }}>
                                <p style={{ color: "#6b7280" }}>No open collaborations found. Be the first to start one!</p>
                            </div>
                        )}
                    </section>
                </div>
            )}
        </div>
    );
}
