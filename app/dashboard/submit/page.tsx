"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const IconPlus = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
);

const IconSparkles = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.912 5.813h6.111l-4.943 3.591 1.887 5.85L12 14.663l-4.967 3.591 1.887-5.85-4.943-3.591h6.111L12 3z" /></svg>
);

export default function SubmitIdeaPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [impact, setImpact] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

        try {
            const response = await fetch(`${apiURL}/api/ideas`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description, impact }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Submission success:", result);
                setIsSubmitting(false);
                router.push("/dashboard/ideas");
            } else {
                throw new Error("Failed to submit idea");
            }
        } catch (error) {
            console.error("Submission error:", error);
            setIsSubmitting(false);
            alert("Submission failed. Please check if the backend is running.");
        }
    };

    return (
        <div className="dashboard-page">
            <header className="dashboard-header">
                <h1>Submit New Idea</h1>
                <p>Dump your problem statement and let "IdeaAI" help you refine it.</p>
            </header>

            <div className="chart-card" style={{ maxWidth: "800px" }}>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label className="input-label">Problem Title</label>
                        <input
                            type="text"
                            className="base-input"
                            placeholder="e.g. Inefficient Waste Management in Urban Areas"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-wrapper">
                        <label className="input-label">Describe the Problem</label>
                        <textarea
                            className="base-input"
                            style={{ minHeight: "150px", resize: "vertical" }}
                            placeholder="Provide details about the challenge, who it affects, and why it needs solving..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="input-wrapper">
                        <label className="input-label">Potential Impact</label>
                        <input
                            type="text"
                            className="base-input"
                            placeholder="e.g. Reduces operational costs by 30% for municipalities"
                            value={impact}
                            onChange={(e) => setImpact(e.target.value)}
                        />
                    </div>

                    <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
                        <button
                            type="submit"
                            className="btn-blue"
                            style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.8rem 2rem" }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : <><IconPlus /> Submit Problem</>}
                        </button>
                        <button
                            type="button"
                            className="btn-black"
                            style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.8rem 2rem" }}
                        >
                            <IconSparkles /> Refine with AI First
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
