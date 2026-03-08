"use client";

import React from "react";

interface CollabCardProps {
    title: string;
    description: string;
    impact: string;
    author: string;
    collaborators: number;
    onJoin: () => void;
    isRequested?: boolean;
    isLoading?: boolean;
}

export default function CollabCard({ title, description, impact, author, collaborators, onJoin, isRequested, isLoading }: CollabCardProps) {
    const initials = author ? author.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : "??";

    return (
        <div className="premium-collab-card">
            <div className="card-status-badge">
                ACTIVE
            </div>

            <div className="card-category">Venture</div>
            <h3 className="card-title">{title}</h3>

            <div className="card-author">
                <div className="author-avatar">{initials}</div>
                <span className="author-name">by <strong>{author === "You" ? "You" : author}</strong></span>
            </div>

            <p className="card-description">
                {description.length > 140 ? description.substring(0, 137) + "..." : description}
            </p>

            <div className="card-meta">
                <div className="meta-item">
                    <span className="meta-label">Team size</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span className="meta-value">{collaborators} Members</span>
                        {collaborators > 0 && (
                            <div className="team-avatars">
                                {[...Array(Math.min(collaborators, 3))].map((_, i) => (
                                    <div key={i} className="team-avatar-icon" style={{ zIndex: 3 - i }} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="meta-item" style={{ alignItems: "flex-end" }}>
                    <span className="meta-label">Impact</span>
                    <span className="meta-value impact-badge">{impact.substring(0, 15)}</span>
                </div>
            </div>

            <button
                className={`btn-collab-join ${isRequested ? 'requested' : ''}`}
                onClick={onJoin}
                disabled={isRequested || isLoading}
            >
                {isLoading ? (
                    <>
                        <span className="loading-spinner"></span>
                        Sending...
                    </>
                ) : isRequested ? (
                    <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Request Sent
                    </>
                ) : (
                    <>
                        Join Project
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </>
                )}
            </button>
        </div>
    );
}
