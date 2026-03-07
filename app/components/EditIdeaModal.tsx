"use client";

import React, { useState, useEffect } from "react";
import { Idea } from "@/lib/supabase-db";

interface EditIdeaModalProps {
    idea: Idea;
    onClose: () => void;
    onUpdate: (id: string, data: Partial<Idea>) => Promise<void>;
}

export default function EditIdeaModal({ idea, onClose, onUpdate }: EditIdeaModalProps) {
    const [title, setTitle] = useState(idea.title);
    const [description, setDescription] = useState(idea.description);
    const [impact, setImpact] = useState(idea.impact);
    const [isCollaborative, setIsCollaborative] = useState(idea.status === "Collaborative");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onUpdate(idea.id!, {
                title,
                description,
                impact,
                status: isCollaborative ? "Collaborative" : "Draft"
            });
            onClose();
        } catch (error) {
            console.error("Update failed:", error);
            alert("Update failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay" style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem"
        }}>
            <div className="chart-card" style={{
                width: "100%",
                maxWidth: "600px",
                background: "white",
                position: "relative"
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "1rem",
                        right: "1rem",
                        background: "none",
                        border: "none",
                        fontSize: "1.5rem",
                        cursor: "pointer",
                        color: "#9ca3af"
                    }}
                >
                    &times;
                </button>

                <h2 style={{ marginBottom: "1.5rem" }}>Edit Idea</h2>

                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label className="input-label">Title</label>
                        <input
                            type="text"
                            className="base-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-wrapper">
                        <label className="input-label">Description</label>
                        <textarea
                            className="base-input"
                            style={{ minHeight: "120px", resize: "vertical" }}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="input-wrapper">
                        <label className="input-label">Impact</label>
                        <input
                            type="text"
                            className="base-input"
                            value={impact}
                            onChange={(e) => setImpact(e.target.value)}
                        />
                    </div>

                    <div className="input-wrapper" style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "1rem" }}>
                        <input
                            type="checkbox"
                            id="edit-collab-check"
                            checked={isCollaborative}
                            onChange={(e) => setIsCollaborative(e.target.checked)}
                            style={{ width: "18px", height: "18px" }}
                        />
                        <label htmlFor="edit-collab-check" className="input-label" style={{ marginBottom: 0, cursor: "pointer" }}>
                            Open for Collaboration
                        </label>
                    </div>

                    <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", justifyContent: "flex-end" }}>
                        <button
                            type="button"
                            className="btn-ghost"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-blue"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
