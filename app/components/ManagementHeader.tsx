"use client";

import React from "react";

interface ManagementHeaderProps {
    onSearch: (query: string) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    totalCount: number;
}

export default function ManagementHeader({ onSearch, activeTab, setActiveTab, totalCount }: ManagementHeaderProps) {
    const tabs = [
        { id: "all", name: "All Ideas" },
        { id: "Collaborative", name: "Collaborative" },
        { id: "Draft", name: "Drafts" },
    ];

    return (
        <div className="management-header-controls" style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 0",
            borderBottom: "1px solid #e5e7eb",
            marginBottom: "1rem"
        }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <div className="tab-group" style={{
                    display: "flex",
                    background: "#f3f4f6",
                    padding: "4px",
                    borderRadius: "12px",
                    gap: "2px"
                }}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: "0.5rem 1rem",
                                borderRadius: "8px",
                                border: "none",
                                fontSize: "0.85rem",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "all 0.2s",
                                background: activeTab === tab.id ? "white" : "transparent",
                                color: activeTab === tab.id ? "#111827" : "#6b7280",
                                boxShadow: activeTab === tab.id ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                            }}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>
                <span style={{ fontSize: "0.85rem", color: "#9ca3af", fontWeight: 500 }}>
                    {totalCount} total
                </span>
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
                <div style={{ position: "relative" }}>
                    <svg
                        style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}
                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search your ideas..."
                        onChange={(e) => onSearch(e.target.value)}
                        style={{
                            padding: "0.6rem 1rem 0.6rem 2.2rem",
                            borderRadius: "10px",
                            border: "1px solid #e5e7eb",
                            fontSize: "0.9rem",
                            width: "240px",
                            outline: "none",
                            transition: "all 0.2s"
                        }}
                        className="search-input"
                    />
                </div>
            </div>

            <style jsx>{`
                .search-input:focus {
                    border-color: var(--blue);
                    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
                    width: 280px;
                }
            `}</style>
        </div>
    );
}
