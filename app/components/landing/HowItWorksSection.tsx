"use client";

import React from "react";
import { motion } from "framer-motion";

export default function HowItWorksSection() {
    return (
        <section className="landing-section" id="how-it-works">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="section-title">How the Platform Works</h2>
                    <p className="section-subtitle">A seamless journey from a simple frustration to a funded company.</p>
                </div>

                <div className="grid-3" style={{ gap: '3rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="step-card"
                    >
                        <div className="step-number" style={{ color: 'var(--accent)', background: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.2)' }}>01</div>
                        <h3 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '1.25rem 0 0.75rem', letterSpacing: '-0.01em' }}>Share a Problem</h3>
                        <p className="text-muted" style={{ lineHeight: 1.6 }}>Users post real-world challenges, industry inefficiencies, or pain points they experience daily.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="step-card"
                    >
                        <div className="step-number" style={{ color: 'var(--accent)', background: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.2)' }}>02</div>
                        <h3 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '1.25rem 0 0.75rem', letterSpacing: '-0.01em' }}>Builders Collaborate</h3>
                        <p className="text-muted" style={{ lineHeight: 1.6 }}>Developers, designers, and innovators form teams to build software solutions for validated problems.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="step-card"
                    >
                        <div className="step-number" style={{ color: 'var(--accent)', background: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.2)' }}>03</div>
                        <h3 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '1.25rem 0 0.75rem', letterSpacing: '-0.01em' }}>Launch Startups</h3>
                        <p className="text-muted" style={{ lineHeight: 1.6 }}>Successful solutions evolve into MVPs, gain early traction, and attract angel investors directly on the platform.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
