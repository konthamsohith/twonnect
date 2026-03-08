"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [progress, setProgress] = useState(0);
    const { user, loading, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 24);

            // Scroll progress 0→1
            const docH = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(docH > 0 ? Math.min(y / docH, 1) : 0);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (pathname?.startsWith("/dashboard")) return null;

    return (
        <>
            {/* Scroll progress bar */}
            <div className="scroll-progress" style={{ width: `${progress * 100}%` }} />

            <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
                <div className="navbar-container">
                    <Link href={user ? "/dashboard" : "/"} className="navbar-logo">
                        <Logo />
                    </Link>
                    <div className="navbar-links">
                        <Link href="/#about">About</Link>
                        <Link href="/blog">Blog</Link>
                        <Link href="/faq">FAQ</Link>
                    </div>
                    <div className="navbar-actions">
                        {!loading ? (
                            user ? (
                                <div className="nav-user-profile">
                                    {user.user_metadata?.avatar_url ? (
                                        <img
                                            src={user.user_metadata.avatar_url}
                                            alt={user.user_metadata.full_name || ""}
                                            className="nav-avatar"
                                        />
                                    ) : (
                                        <div className="nav-avatar initials-avatar" style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            background: "var(--primary)",
                                            color: "white",
                                            fontSize: "0.8rem",
                                            fontWeight: "600",
                                            borderRadius: "50%"
                                        }}>
                                            {(user.user_metadata?.full_name || user.email || "U")
                                                .split(' ')
                                                .map((n: string) => n[0])
                                                .join('')
                                                .toUpperCase()
                                                .slice(0, 2)}
                                        </div>
                                    )}
                                    <button className="btn-ghost" onClick={handleLogout} style={{ fontWeight: 500 }}>Sign Out</button>
                                </div>
                            ) : (
                                <>
                                    <Link href="/signin">
                                        <button className="btn-ghost" style={{ marginRight: "0.25rem", padding: "0.5rem 1rem", fontWeight: 500 }}>Sign In</button>
                                    </Link>
                                    <Link href="/get-started">
                                        <button className="btn-primary" style={{ padding: "0.5rem 1.25rem" }}>Get Started</button>
                                    </Link>
                                </>
                            )
                        ) : (
                            // Fixed width placeholder to prevent layout shift
                            <div style={{ width: "160px" }} />
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
