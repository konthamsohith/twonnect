"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import HeroBg from "./components/HeroBg";
import FeaturedProblems from "./components/FeaturedProblems";
import WhyBuild from "./components/WhyBuild";
import Testimonials from "./components/Testimonials";
import FAQSection from "./components/FAQ";

export default function Home() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push("/dashboard");
        }
    }, [user, loading, router]);
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "TWONNECT",
        "url": "https://twonnect.me",
        "logo": "https://twonnect.me/assests/TWONNECTcircle.png",
        "description": "Connecting early-stage startup founders with validated problem statements and angel investors to build Y Combinator-ready companies.",
        "sameAs": [
            "https://twitter.com/twonnect",
            "https://linkedin.com/company/twonnect"
        ]
    };

    if (loading || user) {
        return <div style={{ minHeight: "100vh", background: "#050505" }} />;
    }

    return (
        <main className="avanza-home">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <HeroBg />

            <section className="avanza-hero text-center">
                <div className="badge-pill mb-4 mx-auto">
                    <span className="badge-new">NEW</span>
                    <span>AI-Powered Startup Refinement</span>
                </div>

                <h1 className="hero-title">
                    Master Startup Building & <br />
                    Connect with Angel Investors
                </h1>

                <p className="hero-subtitle">
                    The bridge between real-world problem statements and Y Combinator-ready solutions.
                    Collaborate, validate, and scale with TWONNECT.
                </p>

                <div className="hero-actions">
                    <Link href="/explore"><button className="btn-black btn-lg">Explore Problems</button></Link>
                    <Link href="/dump"><button className="btn-lime btn-lg">Submit Problem Statement</button></Link>
                </div>
            </section>

            <section className="bento-container container">
                <h2 className="sr-only">Platform Benefits and Success Metrics</h2>
                <div className="bento-grid">

                    {/* Card 1: Platform Highlights */}
                    <div className="bento-card bento-highlights">
                        <div className="card-header-clean">
                            <h3>Startup Ecosystem Highlights</h3>
                            <p>Direct access to validated market gaps and investor-ready metrics.</p>
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
                                    <p>Validated problem statements</p>
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
                                    <p>Angel investment secured</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 4: Success Stories */}
                    <div className="bento-card bento-success">
                        <h3>Founder Success Stories</h3>
                        <div className="success-image-placeholder"></div>
                        <div className="success-quote">
                            <p>&quot;95% of our validated startup ideas secure co-founders or angel investment within 6 months.&quot;</p>
                            <div className="author-info">
                                <strong>Selena Arthur</strong>
                                <span>Lead Startup Mentor at TWONNECT</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 5: Affordable Learning */}
                    <div className="bento-card bento-affordable">
                        <div className="affordable-text">
                            <h3>Y Combinator Preparation</h3>
                            <p>Build the specific traction and validation required for top-tier accelerators like YC.</p>
                        </div>
                        <div className="affordable-btn">
                            <button className="btn-lime">Contact Mentor</button>
                        </div>
                    </div>

                </div>
            </section>

            <FeaturedProblems />
            <div id="why-build">
                <h2 className="sr-only">Why Build on TWONNECT?</h2>
                <WhyBuild />
            </div>
            <Testimonials />
            <div id="faq-section">
                <h2 className="sr-only">Frequently Asked Questions</h2>
                <FAQSection />
            </div>
        </main>
    );
}
