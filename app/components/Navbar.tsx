import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link href="/" className="navbar-logo">
                    <span style={{ color: "var(--blue)" }}>Idea</span><span style={{ color: "var(--foreground)" }}>Platform</span>
                </Link>
                <div className="navbar-links">
                    <Link href="/explore">Explore</Link>
                    <Link href="/dump">Dump Idea</Link>
                    <Link href="/builders">Builders</Link>
                    <Link href="/investors">Investors</Link>
                </div>
                <div className="navbar-actions">
                    <button className="btn-blue" style={{ marginRight: '0.5rem' }}>Sign In</button>
                    <button className="btn-lime">Get Started</button>
                </div>
            </div>
        </nav >
    );
}
