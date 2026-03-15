"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

export default function Footer() {
    const pathname = usePathname();
    if (pathname?.startsWith("/dashboard")) return null;

    return (
        <footer className="ip-footer" style={{ borderTop: '1px solid var(--border-color)', background: 'white' }}>
            <div className="ip-footer-top">
                <div className="ip-footer-brand">
                    <div className="ip-footer-logo" style={{ marginBottom: '1.5rem' }}>
                        <Logo style={{ fontSize: "1.4rem" }} />
                    </div>
                    <p className="ip-footer-tagline" style={{ color: 'var(--muted)', maxWidth: '320px', lineHeight: 1.6 }}>
                        The all-in-one ecosystem for founders & builders.
                        Architecting the future of startups through <span style={{ color: 'var(--brand-blue)', fontWeight: 600 }}>validated problems.</span>
                    </p>
                    <div className="ip-footer-socials" style={{ marginTop: '2rem' }}>
                        <a href="https://x.com" target="_blank" rel="noopener" aria-label="X" className="ip-social-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn" className="ip-social-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="3" />
                                <path d="M8 11v5M8 8v.01M12 16v-5m0 0c0-1.1.9-2 2-2s2 .9 2 2v5" />
                            </svg>
                        </a>
                    </div>
                </div>

                <nav className="ip-footer-nav">
                    <div className="ip-footer-col">
                        <h4 style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem' }}>Platform</h4>
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/#explore">Problems</Link></li>
                            <li><Link href="/blog">Blog</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="ip-footer-col">
                        <h4 style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem' }}>Legal</h4>
                        <ul>
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                            <li><Link href="/terms">Terms of Service</Link></li>
                            <li><Link href="/faq">FAQ</Link></li>
                        </ul>
                    </div>
                    <div className="ip-footer-col">
                        <h4 style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem' }}>Connect</h4>
                        <ul>
                            <li><Link href="/signup">Join as Builder</Link></li>
                            <li><Link href="/login">Investor Portal</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>

            <div className="ip-footer-bottom" style={{ borderTop: '1px solid rgba(15, 23, 42, 0.05)', padding: '2rem 0' }}>
                <span className="ip-footer-copy" style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                    &copy; {new Date().getFullYear()} TWONNECT Engine. Built for the next generation of architects.
                </span>
            </div>
        </footer>
    );
}
