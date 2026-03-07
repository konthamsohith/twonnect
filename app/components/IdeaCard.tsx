"use client";

import React from "react";
import { Idea } from "@/lib/supabase-db";

const IconEdit = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
);

const IconDelete = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
);

const IconAudit = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.912 5.813h6.111l-4.943 3.591 1.887 5.85L12 14.663l-4.967 3.591 1.887-5.85-4.943-3.591h6.111L12 3z" /></svg>
);

interface IdeaCardProps {
    idea: Idea;
    onEdit: () => void;
    onDelete: () => void;
    onAudit: () => void;
}

export default function IdeaCard({ idea, onEdit, onDelete, onAudit }: IdeaCardProps) {
    const statusColor = idea.status === "Collaborative" ? "#bbf451" : "#007aff";

    return (
        <div className="chart-card idea-item-premium" style={{
            display: "flex",
            flexDirection: "column",
            padding: "1.5rem",
            position: "relative",
            overflow: "hidden",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            cursor: "default"
        }}>
            {/* Status Top Bar */}
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "4px",
                height: "100%",
                backgroundColor: statusColor
            }} />

            <header style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.25rem"
            }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <span style={{
                        background: `${statusColor}15`,
                        color: idea.status === "Collaborative" ? "#749a1d" : "#007aff",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        width: "fit-content",
                        border: `1px solid ${statusColor}30`
                    }}>
                        {idea.status}
                    </span>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0, color: "#111827", lineHeight: "1.2" }}>
                        {idea.title}
                    </h3>
                </div>

                {/* Impact Indicator */}
                <div style={{ textAlign: "right", borderLeft: "1px solid #f3f4f6", paddingLeft: "1rem" }}>
                    <div style={{ fontSize: "0.6rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em" }}>Impact</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#111827", lineHeight: "1" }}>
                        {idea.impact && idea.impact.length > 0 && !isNaN(Number(idea.impact)) ? idea.impact : "85"}
                        <span style={{ fontSize: "0.75rem", color: "#bbf451", marginLeft: "2px" }}>pts</span>
                    </div>
                </div>
            </header>

            <p style={{
                fontSize: "0.9rem",
                lineHeight: "1.5",
                color: "#4b5563",
                flex: 1,
                marginBottom: "1.5rem",
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
                overflow: "hidden"
            }}>
                {idea.description}
            </p>

            <footer style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "1.25rem",
                borderTop: "1px solid #f3f4f6"
            }}>
                <div style={{ display: "flex", gap: "1rem", fontSize: "0.75rem", color: "#6b7280" }}>
                    <span><strong>{idea.collaborators || 0}</strong> Collaborators</span>
                    <span>Created: <strong>{new Date(idea.created_at).toLocaleDateString()}</strong></span>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={onEdit} style={buttonIconStyles} title="Edit">
                        <IconEdit />
                    </button>
                    <button onClick={onDelete} style={{ ...buttonIconStyles, color: "#ef4444" }} title="Delete">
                        <IconDelete />
                    </button>
                    <button onClick={onAudit} style={{ ...buttonIconStyles, background: "#f3f4f6" }} title="AI Audit">
                        <IconAudit />
                    </button>
                </div>
            </footer>
        </div>
    );
}

const buttonIconStyles: React.CSSProperties = {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #e5e7eb",
    background: "white",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease"
};
