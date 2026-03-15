"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
    getCollaborativeIdeas,
    Idea,
    createCollaborationRequest,
    getUserCollaborationRequest,
    getOutboundCollaborationRequests,
    CollaborationRequest
} from "@/lib/supabase-db";
import CollabCard from "@/app/components/CollabCard";
import TeamManagementModal from "@/app/components/TeamManagementModal";
import CollaborationModal from "@/app/components/CollaborationModal";
import "./collaborations.css";

export default function CollaborationsPage() {
    const { user, loading: authLoading } = useAuth();
    const [collaborativeIdeas, setCollaborativeIdeas] = useState<Idea[]>([]);
    const [loading, setLoading] = useState(true);
    const [sentRequests, setSentRequests] = useState<Record<string, 'pending' | 'accepted'>>({});

    // Team Management Modal logic
    const [selectedIdea, setSelectedIdea] = useState<{ id: string, title: string, isOwner: boolean } | null>(null);
    // Join Project Modal logic
    const [joiningIdea, setJoiningIdea] = useState<{ id: string, title: string } | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [ideas, outbound] = await Promise.all([
                getCollaborativeIdeas(),
                user ? getOutboundCollaborationRequests(user.id) : Promise.resolve([])
            ]);

            setCollaborativeIdeas(ideas);

            // Map sent requests for quick lookup (both pending and accepted)
            const requestsMap: Record<string, 'pending' | 'accepted'> = {};
            outbound.forEach(req => {
                if (req.status === 'pending' || req.status === 'accepted') {
                    requestsMap[req.idea_id] = req.status;
                }
            });
            setSentRequests(requestsMap);
        } catch (error) {
            console.error("Error fetching collaborative ideas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!authLoading) {
            fetchData();
        }
    }, [authLoading, user?.id]);

    const handleJoinProject = async (message: string) => {
        if (!user || !joiningIdea) return;

        try {
            const result = await createCollaborationRequest(joiningIdea.id, user.id, message);
            if (result) {
                setSentRequests(prev => {
                    const next = { ...prev };
                    next[joiningIdea.id] = 'pending';
                    return next;
                });
                setJoiningIdea(null);
                alert("Collaboration request sent successfully!");
            }
        } catch (error) {
            console.error("Error joining project:", error);
            alert("Failed to send collaboration request.");
        }
    };

    // Handle data refresh after collaboration changes
    const handleDataRefresh = async () => {
        await fetchData();
    };

    // Filter projects
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
                        Submit Proposal
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
                                        teamProfiles={idea.team_profiles}
                                        onJoin={() => alert("You are already the owner of this project!")}
                                        onManageTeam={() => setSelectedIdea({
                                            id: idea.id!,
                                            title: idea.title,
                                            isOwner: true
                                        })}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Discover Section */}
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
                                        teamProfiles={idea.team_profiles}
                                        isRequested={sentRequests[idea.id!] === 'pending'}
                                        isJoined={sentRequests[idea.id!] === 'accepted'}
                                        onJoin={() => setJoiningIdea({ id: idea.id!, title: idea.title })}
                                        onManageTeam={() => setSelectedIdea({
                                            id: idea.id!,
                                            title: idea.title,
                                            isOwner: false
                                        })}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div style={{ padding: "4rem 2rem", textAlign: "center", background: "#f9fafb", borderRadius: "24px", border: "1px dashed #e5e7eb" }}>
                                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🚀</div>
                                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#111827", marginBottom: "0.5rem" }}>No open collaborations yet</h3>
                                <p style={{ color: "#6b7280", maxWidth: "400px", margin: "0 auto", fontSize: "0.95rem" }}>
                                    Be the visionary who starts the next great project. Click "Start a Collaborative Project" to begin.
                                </p>
                            </div>
                        )}
                    </section>
                </div>
            )}

            {/* Team Management Modal Overlay */}
            {selectedIdea && (
                <TeamManagementModal
                    isOpen={!!selectedIdea}
                    onClose={() => setSelectedIdea(null)}
                    ideaId={selectedIdea.id}
                    ideaTitle={selectedIdea.title}
                    isOwner={selectedIdea.isOwner}
                    onUpdate={handleDataRefresh}
                />
            )}

            {/* Join Project Modal Overlay */}
            {joiningIdea && (
                <CollaborationModal
                    isOpen={!!joiningIdea}
                    onClose={() => setJoiningIdea(null)}
                    ideaTitle={joiningIdea.title}
                    onSend={handleJoinProject}
                />
            )}
        </div>
    );
}
