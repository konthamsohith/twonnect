"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// ── Premium SVG Icons ──────────────────────────────────────────
const IconPlus = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
);
const IconMarketplace = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
);
const IconIdeas = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" /></svg>
);
const IconCollaborations = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
const IconAI = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2V4" /><path d="M12 20V22" /><path d="M4.93 4.93L6.34 6.34" /><path d="M17.66 17.66L19.07 19.07" /><path d="M2 12H4" /><path d="M20 12H22" /><path d="M4.93 19.07L6.34 17.66" /><path d="M17.66 6.34L19.07 4.93" /><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /></svg>
);
const IconInvestors = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>
);
const IconMessages = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
);
const IconAccount = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
const IconLogout = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
);
import Logo from "../components/Logo";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    const fullName = user?.user_metadata?.full_name || user?.email || "User";
    const avatarUrl = user?.user_metadata?.avatar_url;

    const userInitials = fullName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const navItems = [
        { name: "Marketplace", href: "/dashboard", icon: <IconMarketplace /> },
        { name: "My Ideas", href: "/dashboard/ideas", icon: <IconIdeas /> },
        { name: "Collaborations", href: "/dashboard/collaborations", icon: <IconCollaborations /> },
        { name: "AI Sandbox", href: "/dashboard/ai-sandbox", icon: <IconAI /> },
        { name: "Investor Portal", href: "/dashboard/investors", icon: <IconInvestors /> },
        { name: "Messages", href: "/dashboard/messages", icon: <IconMessages /> },
    ];

    const secondaryNav = [
        { name: "Account", href: "/dashboard/settings", icon: <IconAccount /> },
    ];

    const isSettingsPage = pathname === "/dashboard/settings";

    return (
        <div className="dashboard-layout">
            {!isSettingsPage && (
                <aside className="sidebar">
                    <Link href="/" className="sidebar-logo">
                        <Logo />
                    </Link>

                    <Link href="/dashboard/submit" style={{ textDecoration: "none" }}>
                        <button className="btn-new" style={{ marginBottom: "1.5rem", width: "100%" }}>
                            <IconPlus /> Submit New Idea
                        </button>
                    </Link>

                    <nav className="sidebar-nav">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`nav-item ${pathname === item.href ? "active" : ""}`}
                            >
                                <span>{item.icon}</span>
                                {item.name}
                            </Link>
                        ))}

                        <div style={{ margin: "1.25rem 0 0.5rem", fontSize: "0.75rem", fontWeight: 700, color: "#9ca3af", paddingLeft: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            Management
                        </div>

                        {secondaryNav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`nav-item ${pathname === item.href ? "active" : ""}`}
                            >
                                <span>{item.icon}</span>
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="sidebar-footer">
                        <div className="sidebar-user-container">
                            <div className="sidebar-user">
                                {avatarUrl && avatarUrl !== "" ? (
                                    <img src={avatarUrl} alt="" className="user-avatar" />
                                ) : (
                                    <div className="user-avatar initials-avatar">{userInitials}</div>
                                )}
                                <div className="user-info">
                                    <span className="user-name">{fullName}</span>
                                    <span className="user-email" title={user?.email || ""}>{user?.email}</span>
                                </div>
                            </div>
                            <button className="logout-btn" onClick={handleLogout} title="Logout">
                                <IconLogout />
                            </button>
                        </div>
                    </div>
                </aside>
            )}

            <main
                className="main-content"
                style={isSettingsPage ? { marginLeft: 0, padding: 0 } : {}}
            >
                {children}
            </main>
        </div>
    );
}
