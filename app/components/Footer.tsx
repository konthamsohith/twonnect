export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <h2>Idea<span>Platform</span></h2>
                    <p>Bridging the gap between real-world problems and actionable startup solutions.</p>
                </div>
                <div className="footer-links">
                    <div>
                        <h3>Platform</h3>
                        <ul>
                            <li><a href="/explore">Explore Problems</a></li>
                            <li><a href="/dump">Submit Problem</a></li>
                            <li><a href="/builders">For Builders</a></li>
                            <li><a href="/investors">For Investors</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3>Resources</h3>
                        <ul>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/blog">Blog</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Idea Platform. All rights reserved.</p>
            </div>
        </footer>
    );
}
