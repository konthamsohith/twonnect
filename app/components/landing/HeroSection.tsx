"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import "./Landing.css";

const IconLightbulb = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>
);
const IconCode = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
);
const IconBox = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
);
const IconRocket = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
);
const IconTrendingUp = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
);

export default function HeroSection() {
    return (
        <section className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="container relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="badge-pill mb-4 mx-auto"
                >
                    <span className="badge-new">NEW</span>
                    <span>AI-Powered Startup Refinement</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="hero-title"
                >
                    Turn Real Problems <br />
                    <span className="text-secondary-accent" style={{ color: 'var(--accent)' }}>Into Real Startups</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="hero-subtitle"
                >
                    The platform where problem givers, builders, and investors unite.
                    Share challenges, collaborate on solutions, and fund the next big thing.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="btn-group"
                >
                    <Link href="/auth">
                        <button className="btn-primary btn-lg">Get Started</button>
                    </Link>
                    <Link href="#explore">
                        <button className="btn-outline btn-lg">Explore Problems</button>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flow-container mx-auto"
                >
                    <div className="flow-item">
                        <div className="flow-icon"><IconLightbulb /></div>
                        Problem
                    </div>
                    <div className="flow-connector" />
                    <div className="flow-item">
                        <div className="flow-icon"><IconCode /></div>
                        Builder
                    </div>
                    <div className="flow-connector" />
                    <div className="flow-item">
                        <div className="flow-icon"><IconBox /></div>
                        Solution
                    </div>
                    <div className="flow-connector" />
                    <div className="flow-item">
                        <div className="flow-icon"><IconRocket /></div>
                        Startup
                    </div>
                    <div className="flow-connector" />
                    <div className="flow-item">
                        <div className="flow-icon"><IconTrendingUp /></div>
                        Investor
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
