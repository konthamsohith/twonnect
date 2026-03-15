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

            <nav className="navbar-wrapper">
                {/* Navbar Blueprint Lines */}
                <div className="blueprint-line-v" style={{ left: 'calc(50% - 575px)', height: '100vh', top: 0, width: '0.5px', opacity: 0.6 }} />
                <div className="blueprint-line-v" style={{ right: 'calc(50% - 575px)', height: '100vh', top: 0 }} />

                {/* Intersection squares at navbar bottom */}
                <div className="intersection-dot" style={{ top: '100%', left: 'calc(50% - 575px)', transform: 'translate(-50%, -50%)' }} />
                <div className="intersection-dot" style={{ top: '100%', left: 'calc(50% + 575px)', transform: 'translate(-50%, -50%)' }} />

                <div className="navbar-container">
                    <Link href={user ? "/dashboard" : "/"} className="navbar-logo">
                        <Logo />
                    </Link>

                    <div className="navbar-links">
                        <Link href="/#about" className="nav-link">About</Link>
                        <Link href="/#features" className="nav-link">Feature</Link>
                        <Link href="/blog" className="nav-link">Testimonials</Link>
                        <Link href="/faq" className="nav-link">FAQs</Link>
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
                                        <div className="nav-avatar initials-avatar">
                                            {(user.user_metadata?.full_name || user.email || "U")
                                                .split(' ')
                                                .map((n: string) => n[0])
                                                .join('')
                                                .toUpperCase()
                                                .slice(0, 2)}
                                        </div>
                                    )}
                                    <button className="btn-signout" onClick={handleLogout}>Sign Out</button>
                                </div>
                            ) : (
                                <div className="nav-auth-buttons">
                                    <Link href="/signin">
                                        <button className="btn-signin">Sign In</button>
                                    </Link>
                                    <Link href="/auth">
                                        <button className="btn-black-pill">Get Started</button>
                                    </Link>
                                </div>
                            )
                        ) : (
                            <div className="nav-loading-placeholder" />
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
