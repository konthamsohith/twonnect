"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getUserProfile, updateUserProfile, Profile } from "@/lib/supabase-db";

export default function SettingsPage() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [displayName, setDisplayName] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        async function loadProfile() {
            if (user?.id) {
                const data = await getUserProfile(user.id);
                if (data) {
                    setProfile(data);
                    setDisplayName(data.display_name || "");
                }
            }
        }
        loadProfile();
    }, [user]);

    const handleSave = async () => {
        if (!user?.id) return;
        setIsSaving(true);
        setMessage(null);
        try {
            await updateUserProfile(user.id, { display_name: displayName });
            setMessage({ type: "success", text: "Profile updated successfully." });
        } catch (error) {
            setMessage({ type: "error", text: "Failed to update profile. Please try again." });
        } finally {
            setIsSaving(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    return (
        <div className="dashboard-page" style={{ padding: "4rem 2rem", maxWidth: "1000px", margin: "0 auto" }}>
            <header style={{ marginBottom: "4rem", borderBottom: "1px solid #e2e8f0", paddingBottom: "2rem" }}>
                <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "#0f172a", margin: 0, letterSpacing: "-0.025em" }}>Account Settings</h1>
                <p style={{ fontSize: "1.125rem", color: "#64748b", marginTop: "0.75rem", lineHeight: "1.5" }}>
                    Manage your identity and platform configuration in a centralized workspace.
                </p>
            </header>

            <div style={{ display: "grid", gap: "4rem" }}>
                {/* Personal Information Section */}
                <section>
                    <div style={{ marginBottom: "2rem" }}>
                        <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#0f172a" }}>Personal Information</h2>
                        <p style={{ fontSize: "0.95rem", color: "#64748b", marginTop: "0.25rem" }}>Update your public profile and contact details.</p>
                    </div>

                    <div className="card" style={{ border: "1px solid #e2e8f0", background: "#ffffff", boxShadow: "0 1px 2px rgba(0,0,0,0.05)", padding: "2.5rem", borderRadius: "8px" }}>
                        {message && (
                            <div style={{
                                padding: "1rem",
                                borderRadius: "6px",
                                marginBottom: "2rem",
                                fontSize: "0.9rem",
                                background: message.type === "success" ? "#f0fdf4" : "#fef2f2",
                                color: message.type === "success" ? "#166534" : "#991b1b",
                                border: `1px solid ${message.type === "success" ? "#bbf7d0" : "#fecaca"}`
                            }}>
                                {message.text}
                            </div>
                        )}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
                            <div className="input-wrapper">
                                <label className="input-label" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "#475569", fontWeight: 700, marginBottom: "0.75rem" }}>Full Name</label>
                                <input
                                    type="text"
                                    className="base-input"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    placeholder="Enter your name"
                                    style={{ borderColor: "#cbd5e1", borderRadius: "6px", width: "100%", padding: "0.875rem" }}
                                />
                            </div>
                            <div className="input-wrapper">
                                <label className="input-label" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "#475569", fontWeight: 700, marginBottom: "0.75rem" }}>Email Address</label>
                                <input
                                    type="email"
                                    className="base-input"
                                    value={user?.email || ""}
                                    disabled
                                    style={{ background: "#f1f5f9", borderColor: "#e2e8f0", color: "#64748b", borderRadius: "6px", width: "100%", cursor: "not-allowed", padding: "0.875rem" }}
                                />
                            </div>
                        </div>
                        <div style={{ marginTop: "3rem", display: "flex", justifyContent: "flex-end" }}>
                            <button
                                onClick={handleSave}
                                className="btn-blue"
                                disabled={isSaving}
                                style={{ borderRadius: "6px", padding: "0.75rem 2.5rem", fontSize: "0.95rem", fontWeight: 600, boxShadow: "0 1px 2px rgba(0, 122, 255, 0.2)", opacity: isSaving ? 0.7 : 1 }}
                            >
                                {isSaving ? "Saving..." : "Save Profile Changes"}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Support & Security Row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
                    {/* Professional Help & Support Section */}
                    <section style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ marginBottom: "1.5rem" }}>
                            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0f172a" }}>Assistance & Support</h2>
                        </div>
                        <div className="card" style={{ border: "1px solid #e2e8f0", background: "#f8fafc", padding: "2rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", borderRadius: "8px" }}>
                            <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: "1.6", marginBottom: "2rem" }}>
                                For inquiries regarding platform functionality or technical issues, please consult our documentation or contact our dedicated support division.
                            </p>
                            <div style={{ display: "flex", gap: "1rem" }}>
                                <button className="btn-outline" onClick={() => router.push("/dashboard/help")} style={{ borderRadius: "6px", fontSize: "0.9rem", flex: 1, padding: "0.75rem", fontWeight: 600, background: "#ffffff", border: "1px solid #e2e8f0" }}>
                                    Knowledge Base
                                </button>
                                <button className="btn-outline" onClick={() => window.open("mailto:support@twonnect.com")} style={{ borderRadius: "6px", fontSize: "0.9rem", flex: 1, padding: "0.75rem", fontWeight: 600, background: "#ffffff", border: "1px solid #e2e8f0" }}>
                                    External Support
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Enhanced Security Section */}
                    <section style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ marginBottom: "1.5rem" }}>
                            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0f172a" }}>Authentication</h2>
                        </div>
                        <div className="card" style={{ border: "1px solid #fee2e2", background: "#ffffff", padding: "2rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", borderRadius: "8px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                            <p style={{ fontSize: "0.95rem", color: "#7f1d1d", lineHeight: "1.6", marginBottom: "2rem" }}>
                                Terminate your active session. We emphasize the security of your data—please ensure you log out when using public terminals.
                            </p>
                            <button
                                onClick={handleLogout}
                                className="btn-ghost"
                                style={{
                                    border: "1px solid #fecaca",
                                    color: "#b91c1c",
                                    background: "#fef2f2",
                                    borderRadius: "6px",
                                    padding: "0.75rem",
                                    fontSize: "0.95rem",
                                    fontWeight: 700,
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "0.6rem",
                                    transition: "all 0.15s ease-in-out"
                                }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                                Terminate Session
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
