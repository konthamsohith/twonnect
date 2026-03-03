import Link from "next/link";

export default function Footer() {
    return (
        <footer className="ip-footer">
            {/* ── Top section ─────────────────────────────── */}
            <div className="ip-footer-top">
                {/* Brand col */}
                <div className="ip-footer-brand">
                    <div className="ip-footer-logo">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle cx="12" cy="12" r="10" stroke="#007aff" strokeWidth="2.2" />
                            <path d="M8 12h8M12 8v8" stroke="#007aff" strokeWidth="2.2" strokeLinecap="round" />
                        </svg>
                        <span>Idea Platform</span>
                    </div>
                    <p className="ip-footer-tagline">
                        All-in-one hub for founders &amp; builders.{" "}
                        <span className="ip-footer-accent">Validate ideas,</span> find co-founders
                        &amp; build with real-world problems.
                    </p>
                    <div className="ip-footer-socials">
                        {/* Instagram */}
                        <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" className="ip-social-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                            </svg>
                        </a>
                        {/* LinkedIn */}
                        <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn" className="ip-social-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="3" />
                                <path d="M8 11v5M8 8v.01M12 16v-5m0 0c0-1.1.9-2 2-2s2 .9 2 2v5" />
                            </svg>
                        </a>
                        {/* X / Twitter */}
                        <a href="https://x.com" target="_blank" rel="noopener" aria-label="X" className="ip-social-icon">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Link columns */}
                <nav className="ip-footer-nav">
                    <div className="ip-footer-col">
                        <h4>Sitemap</h4>
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/explore">Explore</Link></li>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/blog">Blog</Link></li>
                            <li><Link href="/contact">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className="ip-footer-col">
                        <h4>Build</h4>
                        <ul>
                            <li><Link href="/explore">All Problems</Link></li>
                            <li><Link href="/dump">Submit Idea</Link></li>
                            <li><Link href="/explore?tag=ai">AI &amp; Tech</Link></li>
                            <li><Link href="/explore?tag=free">Open Source</Link></li>
                        </ul>
                    </div>
                    <div className="ip-footer-col">
                        <h4>Account</h4>
                        <ul>
                            <li><Link href="/signup">Sign Up</Link></li>
                            <li><Link href="/login">Sign In</Link></li>
                            <li><Link href="/reset-password">Reset Password</Link></li>
                        </ul>
                    </div>
                    <div className="ip-footer-col">
                        <h4>Information</h4>
                        <ul>
                            <li><Link href="/faq">FAQ</Link></li>
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                            <li><Link href="/terms">Terms &amp; Conditions</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>

            {/* ── Bottom bar ──────────────────────────────── */}
            <div className="ip-footer-bottom">
                <span className="ip-footer-copy">&copy; Copyright Idea Platform {new Date().getFullYear()}. All rights reserved.</span>
            </div>
        </footer>
    );
}
