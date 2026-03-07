"use client";

import React from "react";

const IconInvestors = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>
);

export default function InvestorsPage() {
    return (
        <div className="dashboard-page">
            <header className="dashboard-header">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                        <h1>Investor Portal</h1>
                        <p>Get matched with Angel Investors and Venture Capitalists.</p>
                    </div>
                    <span className="badge-pill" style={{ background: "rgba(0,0,0,0.05)", color: "#000", fontWeight: 700 }}>
                        <span style={{ marginRight: "0.4rem" }}>🔐</span> EXCLUSIVE
                    </span>
                </div>
            </header>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                <div className="chart-card" style={{ opacity: 0.5 }}>
                    <h3>Investment Readiness</h3>
                    <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>Metrics required to unlock investor visibility.</p>
                    <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {[
                            { label: "Idea Validation Score", value: "Locked", color: "#eee" },
                            { label: "Community Traction", value: "Locked", color: "#eee" },
                            { label: "Technical Blueprint", value: "Locked", color: "#eee" },
                        ].map((m, i) => (
                            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem", border: "1px dashed #ddd", borderRadius: "12px" }}>
                                <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{m.label}</span>
                                <span style={{ color: "#999" }}>{m.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="chart-card" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                    <div style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
                        <IconInvestors />
                    </div>
                    <h3 style={{ fontWeight: 800 }}>Scale to YC and Beyond</h3>
                    <p style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                        The Investor Portal is unlocked once your project hits a validation score of 85+.
                        Build your traction first in the Marketplace.
                    </p>
                    <button className="btn-black">View Submission Guide</button>
                </div>
            </div>
        </div>
    );
}
