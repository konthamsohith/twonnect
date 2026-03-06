"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [progress, setProgress] = useState(0);
    const { user, logout } = useAuth();
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
                    <Link href="/" className="navbar-logo">
                        <Logo />
                    </Link>
                    <div className="navbar-links">
                        <Link href="/#why-build">About</Link>
                        <Link href="/blog">Blog</Link>
                        <Link href="/#faq-section">FAQ</Link>
                    </div>
                    <div className="navbar-actions">
                        {user ? (
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
                                        background: "var(--blue)",
                                        color: "white",
                                        fontSize: "0.8rem",
                                        fontWeight: "600"
                                    }}>
                                        {(user.user_metadata?.full_name || user.email || "U")
                                            .split(' ')
                                            .map((n: string) => n[0])
                                            .join('')
                                            .toUpperCase()
                                            .slice(0, 2)}
                                    </div>
                                )}
                                <button className="btn-ghost" onClick={handleLogout}>Sign Out</button>
                            </div>
                        ) : (
                            <>
                                <Link href="/signin">
                                    <button className="btn-blue" style={{ marginRight: "0.5rem" }}>Sign In</button>
                                </Link>
                                <Link href="/get-started">
                                    <button className="btn-lime">Get Started</button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
