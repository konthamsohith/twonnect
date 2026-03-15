"use client";

import React, { useState } from "react";
import Link from "next/link";

const IconSearch = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
);

const IconPlus = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
);

export default function SearchPage() {
    const [query, setQuery] = useState("");

    return (
        <div className="dashboard-page">
            <header className="dashboard-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem" }}>
                <div>
                    <h1>Search</h1>
                    <p>Find problems, solutions, and talent across the marketplace.</p>
                </div>
                <Link href="/dashboard/submit" className="btn-blue" style={{ display: "flex", alignItems: "center", gap: "0.5rem", borderRadius: "10px", padding: "0.8rem 1.4rem", fontWeight: 700 }}>
                    <IconPlus /> Submit Proposal
                </Link>
            </header>

            <div className="input-wrapper" style={{ position: "relative", maxWidth: "600px" }}>
                <input
                    type="text"
                    className="base-input"
                    placeholder="Search for problems, tags, or people..."
                    style={{ paddingLeft: "3rem", borderRadius: "16px" }}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}>
                    <IconSearch />
                </div>
            </div>

            <div style={{ marginTop: "3rem", textAlign: "center", color: "#9ca3af" }}>
                {query ? `Searching for "${query}"...` : "Start typing to search the ecosystem"}
            </div>
        </div>
    );
}
