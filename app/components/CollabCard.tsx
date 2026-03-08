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
    return (
        <div className="chart-card collab-showcase-card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div className="card-header-clean" style={{ marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h3 style={{
                        fontFamily: 'var(--font-geist-sans), "GeistSans Fallback"',
                        fontSize: "18px",
                        fontWeight: 500,
                        fontStyle: "normal",
                        lineHeight: "normal",
                        color: "rgb(17, 24, 39)",
                        margin: 0
                    }}>{title}</h3>
                    <div className="badge-pill" style={{ background: "rgba(187, 244, 81, 0.1)", color: "#749a1d", fontSize: "0.75rem", padding: "4px 8px" }}>
                        ACTIVE
                    </div>
                </div>
                <p style={{ fontSize: "0.85rem", color: "#6b7280", marginTop: "4px" }}>by <strong>{author}</strong></p>
            </div>

            <p style={{ fontSize: "0.9rem", color: "#4b5563", flex: 1, marginBottom: "1.5rem" }}>
                {description.length > 120 ? description.substring(0, 117) + "..." : description}
            </p>

            <div className="card-footer-stats" style={{ paddingTop: "1rem", borderTop: "1px solid #f3f4f6" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                        <strong>{collaborators}</strong> Team Members
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "var(--blue)", fontWeight: 600 }}>
                        {impact.substring(0, 20)}...
                    </div>
                </div>
                <button
                    className={`btn-black ${isRequested ? 'requested' : ''}`}
                    style={{
                        width: "100%",
                        padding: "0.75rem",
                        fontSize: "0.9rem",
                        backgroundColor: isRequested ? "#bbf451" : "#111827",
                        color: isRequested ? "#111827" : "white",
                        border: "none",
                        opacity: isLoading ? 0.7 : 1
                    }}
                    onClick={onJoin}
                    disabled={isRequested || isLoading}
                >
                    {isLoading ? "Sending..." : isRequested ? "Request Sent" : "Join Project"}
                </button>
            </div>
        </div>
    );
}
