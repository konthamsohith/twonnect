"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../Logo";

export default function Footer() {
    const pathname = usePathname();
    if (pathname?.startsWith("/dashboard")) return null;

    return (
        <div className="ip-footer-wrapper">
            {/* Blueprint Framing Lines */}
            <div className="blueprint-line-v" style={{ left: 'calc(50% - 575px)', height: '100%', top: 0, width: '0.5px', opacity: 0.6 }} />
            <div className="blueprint-line-v" style={{ right: 'calc(50% - 575px)', height: '100%', top: 0, width: '0.5px', opacity: 0.6 }} />
            
            {/* Intersection Dots at the top corner of footer */}
            <div className="intersection-dot" style={{ top: 0, left: 'calc(50% - 575px)', transform: 'translate(-50%, -50%)' }} />
            <div className="intersection-dot" style={{ top: 0, left: 'calc(50% + 575px)', transform: 'translate(-50%, -50%)' }} />

            <footer className="ip-footer-container">
                <div className="ip-footer-content">
                    <div className="ip-footer-left">
                        <div className="ip-footer-brand" style={{ marginBottom: '1.5rem' }}>
                            <Logo style={{ fontSize: "1.45rem" }} />
                        </div>
                        <p className="ip-footer-description">
                            The all-in-one ecosystem for founders & builders. Architecting the future of startups through <span style={{ color: 'var(--brand-blue)', fontWeight: 600 }}>validated problems.</span>
                        </p>
                        <div className="ip-footer-socials" style={{ marginTop: '1.5rem', display: 'flex', gap: '14px' }}>
                            <a href="https://x.com" target="_blank" rel="noopener" aria-label="X" className="ip-social-icon" style={{ color: '#4B5563', transition: 'color 0.2s' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn" className="ip-social-icon" style={{ color: '#4B5563', transition: 'color 0.2s' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="3" />
                                    <path d="M8 11v5M8 8v.01M12 16v-5m0 0c0-1.1.9-2 2-2s2 .9 2 2v5" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="ip-footer-right">
                        <div className="ip-footer-column">
                            <span className="ip-footer-col-title">Platform</span>
                            <Link href="/" className="ip-footer-link">Home</Link>
                            <Link href="/#explore" className="ip-footer-link">Problems</Link>
                            <Link href="/blog" className="ip-footer-link">Blog</Link>
                            <Link href="/contact" className="ip-footer-link">Contact</Link>
                        </div>
                        <div className="ip-footer-column">
                            <span className="ip-footer-col-title">Legal</span>
                            <Link href="/privacy" className="ip-footer-link">Privacy Policy</Link>
                            <Link href="/terms" className="ip-footer-link">Terms of Service</Link>
                            <Link href="/faq" className="ip-footer-link">FAQ</Link>
                        </div>
                        <div className="ip-footer-column">
                            <span className="ip-footer-col-title">Connect</span>
                            <Link href="/signup" className="ip-footer-link">Join as Builder</Link>
                            <Link href="/login" className="ip-footer-link">Investor Portal</Link>
                        </div>
                    </div>
                </div>

                <div className="ip-footer-bottom">
                    <div className="ip-footer-bottom-left">
                        &copy; {new Date().getFullYear()} TWONNECT Engine. All rights reserved.
                    </div>
                    <div className="ip-footer-bottom-right" style={{ opacity: 0.8, fontSize: '0.825rem', fontWeight: 500 }}>
                        Built for the Next Generation of Architects.
                    </div>
                </div>
            </footer>
        </div>
    );
}
