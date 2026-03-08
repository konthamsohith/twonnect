"use client";

import React from "react";
import Link from "next/link";

// Fallback SVGs since lucide-react might not be installed, using explicit SVGs
const TwitterIcon = () => (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);
const LinkedinIcon = () => (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);
const GithubIcon = () => (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.4 5.4 0 0 0-.1-3.7s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.5 5 1.9 5 1.9a5.4 5.4 0 0 0-.1 3.7A5.4 5.4 0 0 0 3 9.4c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" /><path d="M9 18c-4.5 1.5-5-2.5-7-3" /></svg>
);

export default function Footer() {
    return (
        <footer className="ip-footer">
            <div className="ip-footer-top container">
                <div className="ip-footer-brand">
                    <Link href="/" className="ip-footer-logo" style={{ color: 'var(--primary)' }}>
                        <div className="twonnect-logo">
                            TWONN<span className="logo-char-e" style={{ color: 'var(--accent)' }}><div className="logo-e-bar" /><div className="logo-e-bar" /><div className="logo-e-bar" /></span>CT
                        </div>
                    </Link>
                    <p className="ip-footer-tagline">
                        Bridging the gap between <span className="ip-footer-accent">real-world problems</span> and <span className="ip-footer-accent">startup solutions</span>.
                    </p>
                    <div className="ip-footer-socials">
                        <a href="https://twitter.com/twonnect" className="ip-social-icon" aria-label="Twitter">
                            <TwitterIcon />
                        </a>
                        <a href="https://linkedin.com/company/twonnect" className="ip-social-icon" aria-label="LinkedIn">
                            <LinkedinIcon />
                        </a>
                        <a href="https://github.com/twonnect" className="ip-social-icon" aria-label="GitHub">
                            <GithubIcon />
                        </a>
                    </div>
                </div>

                <div className="ip-footer-nav" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '2rem' }}>
                    <div className="ip-footer-col">
                        <h4>Platform</h4>
                        <ul>
                            <li><Link href="#explore">Explore</Link></li>
                            <li><Link href="/pricing">Pricing</Link></li>
                        </ul>
                    </div>
                    <div className="ip-footer-col">
                        <h4>Company</h4>
                        <ul>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/blog">Blog</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="ip-footer-col">
                        <h4>Resources</h4>
                        <ul>
                            <li><Link href="/community">Community</Link></li>
                            <li><Link href="/help">Help Center</Link></li>
                        </ul>
                    </div>
                    <div className="ip-footer-col">
                        <h4>Legal</h4>
                        <ul>
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                            <li><Link href="/terms">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="ip-footer-bottom container">
                <p>&copy; {new Date().getFullYear()} TWONNECT. All rights reserved.</p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Designed with <span style={{ color: 'var(--secondary-accent)' }}>❤️</span> for Builders.</p>
            </div>
        </footer>
    );
}
