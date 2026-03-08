"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutSection() {
    return (
        <section className="landing-section" id="about">
            <div className="container text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">About TWONNECT</h2>
                    <p className="section-subtitle mb-8" style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>
                        TWONNECT is a platform designed to transform real-world problems into innovative startups by connecting problem givers, builders, and investors.
                    </p>

                    <div style={{ background: 'var(--card-bg)', padding: '2.5rem', borderRadius: '12px', marginBottom: '4rem', textAlign: 'left', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--primary)' }}>Our Mission</h3>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--muted)' }}>
                            Our mission is to create a community-driven ecosystem where real problems lead to collaboration, innovation, and startup creation. We believe the best companies are born not from brainstorming sessions, but from solving genuine pain points experienced by real people.
                        </p>
                    </div>

                    <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '2.5rem', letterSpacing: '-0.02em', color: 'var(--primary)' }}>How the Platform Ecosystem Works</h3>
                    <div className="grid-3" style={{ textAlign: 'left', gap: '2rem' }}>
                        <div className="card">
                            <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: 700, color: 'var(--muted)', opacity: 0.5, marginBottom: '0.75rem' }}>01</span>
                            <strong style={{ display: 'block', marginBottom: '0.75rem', fontSize: '1.1rem', color: 'var(--primary)' }}>People Share Real Problems</strong>
                            <p className="text-muted text-sm" style={{ lineHeight: 1.6 }}>Industry experts, employees, and everyday users submit detailed pain points.</p>
                        </div>
                        <div className="card">
                            <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: 700, color: 'var(--muted)', opacity: 0.5, marginBottom: '0.75rem' }}>02</span>
                            <strong style={{ display: 'block', marginBottom: '0.75rem', fontSize: '1.1rem', color: 'var(--primary)' }}>AI Validation</strong>
                            <p className="text-muted text-sm" style={{ lineHeight: 1.6 }}>Our AI analyzes ideas and checks market competition before execution.</p>
                        </div>
                        <div className="card">
                            <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: 700, color: 'var(--muted)', opacity: 0.5, marginBottom: '0.75rem' }}>03</span>
                            <strong style={{ display: 'block', marginBottom: '0.75rem', fontSize: '1.1rem', color: 'var(--primary)' }}>Builders Collaborate</strong>
                            <p className="text-muted text-sm" style={{ lineHeight: 1.6 }}>Teams form around validated problems and start building prototypes.</p>
                        </div>
                        <div className="card">
                            <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: 700, color: 'var(--muted)', opacity: 0.5, marginBottom: '0.75rem' }}>04</span>
                            <strong style={{ display: 'block', marginBottom: '0.75rem', fontSize: '1.1rem', color: 'var(--primary)' }}>Teams Ship Solutions</strong>
                            <p className="text-muted text-sm" style={{ lineHeight: 1.6 }}>MVPs are released, tested with the original problem givers, and refined.</p>
                        </div>
                        <div className="card">
                            <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: 700, color: 'var(--muted)', opacity: 0.5, marginBottom: '0.75rem' }}>05</span>
                            <strong style={{ display: 'block', marginBottom: '0.75rem', fontSize: '1.1rem', color: 'var(--primary)' }}>Investors Discover Startups</strong>
                            <p className="text-muted text-sm" style={{ lineHeight: 1.6 }}>Investors find promising traction and fund the successful teams.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
