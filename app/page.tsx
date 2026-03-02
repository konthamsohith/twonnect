import Link from "next/link";
import './landing.css';

export default function Home() {
    return (
        <main className="avanza-home">
            <div className="avanza-bg-mesh">
                <div className="mesh-color mesh-blue"></div>
                <div className="mesh-color mesh-pink"></div>
                <div className="mesh-color mesh-yellow"></div>
                <div className="mesh-color mesh-green"></div>
            </div>

            <section className="avanza-hero text-center">
                <div className="badge-pill mb-4 mx-auto">
                    <span className="badge-new">NEW</span>
                    <span>AI Refinement now available</span>
                </div>

                <h1 className="hero-title">
                    Master Building & <br />
                    Startups with Idea Platform
                </h1>

                <p className="hero-subtitle">
                    Collaborate, refine, and build in one place — practical, modern, and built to help you advance and scale your solutions.
                </p>

                <div className="hero-actions">
                    <Link href="/explore"><button className="btn-black btn-lg">Explore Problems</button></Link>
                    <Link href="/dump"><button className="btn-lime btn-lg">Start Building Now</button></Link>
                </div>
            </section>

            <section className="bento-container container">
                <div className="bento-grid">

                    {/* Card 1: Platform Highlights */}
                    <div className="bento-card bento-highlights">
                        <div className="card-header-clean">
                            <h3>Platform Highlights</h3>
                            <p>A sneak peek into the skills and traction you'll gain inside.</p>
                        </div>
                        <div className="highlights-mosaic">
                            <div className="mosaic-box box-1">
                                <div className="fake-ui-line"></div>
                                <div className="fake-ui-bar w-50"></div>
                                <div className="fake-ui-bar w-75"></div>
                            </div>
                            <div className="mosaic-box box-2">
                                <div className="bignumber">14K</div>
                            </div>
                            <div className="mosaic-box box-3">
                                <div className="pie-chart"></div>
                            </div>
                            <div className="mosaic-box box-4">
                                <div className="fake-avatar"></div>
                                <div className="fake-avatar"></div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column */}
                    <div className="bento-col-middle">
                        {/* Card 2: 30K+ Students */}
                        <div className="bento-card bento-stat">
                            <div className="stat-flex">
                                <div>
                                    <h3>4,200+</h3>
                                    <p>Active problems listed</p>
                                </div>
                                <div className="avatars-group">
                                    <div className="avatar bg-blue"></div>
                                    <div className="avatar bg-orange"></div>
                                    <div className="avatar bg-purple"></div>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: 1200+ Hours */}
                        <div className="bento-card bento-image-stat">
                            <div className="image-bg-placeholder">
                                <div className="stat-overlay">
                                    <h3>$12M+</h3>
                                    <p>Capital deployed</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 4: Success Stories */}
                    <div className="bento-card bento-success">
                        <h3>Success Stories</h3>
                        <div className="success-image-placeholder"></div>
                        <div className="success-quote">
                            <p>&quot;95% of validated problems secure builder teams or get freelance grants within 6 months.&quot;</p>
                            <div className="author-info">
                                <strong>Selena Arthur</strong>
                                <span>Lead Investor at Avanza</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 5: Affordable Learning */}
                    <div className="bento-card bento-affordable">
                        <div className="affordable-text">
                            <h3>Open Collaboration</h3>
                            <p>High-quality verified statements at a fraction of traditional enterprise consulting cost.</p>
                        </div>
                        <div className="affordable-btn">
                            <button className="btn-lime">Contact us</button>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}
