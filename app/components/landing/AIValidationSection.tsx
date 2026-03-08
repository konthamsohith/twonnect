"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIValidationSection() {
    return (
        <section className="landing-section bg-muted">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="section-title">AI Idea Validation</h2>
                    <p className="section-subtitle">Before writing a single line of code, our AI Agent analyzes your problem against the market to ensure it's worth solving.</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="ai-mockup"
                >
                    <div className="ai-header" style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', paddingLeft: '1.25rem' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
                        </div>
                        <span style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 500, marginLeft: '0.5rem' }}>TWONNECT AI Analysis</span>
                    </div>
                    <div className="ai-body" style={{ background: '#ffffff', padding: '2.5rem', fontFamily: 'var(--font-geist-mono), monospace' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>// Problem Statement Input</div>
                            <div style={{ color: 'var(--primary)', fontSize: '0.95rem', lineHeight: 1.6, paddingLeft: '1rem', borderLeft: '2px solid var(--accent)' }}>
                                "I have an idea for a platform that connects freelance plumbers with immediate local emergency jobs."
                            </div>
                        </div>

                        <div>
                            <div style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>// Market Analysis Output</div>
                            <div style={{ background: 'var(--muted-bg)', borderRadius: '8px', padding: '1.5rem', border: '1px solid var(--border-color)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#10b981', fontWeight: 600, fontSize: '0.9rem' }}>
                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7" /></svg>
                                    Analysis Complete
                                </div>
                                <ul style={{ margin: 0, paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', color: 'var(--primary)', lineHeight: 1.6 }}>
                                    <li><strong style={{ color: 'var(--muted)' }}>Competitors:</strong> TaskRabbit, Thumbtack, Angi.</li>
                                    <li><strong style={{ color: 'var(--muted)' }}>Current Disadvantages:</strong> High latency for emergencies (often takes 2+ hours). High platform fees for contractors.</li>
                                    <li><strong style={{ color: 'var(--accent)' }}>Identified Gap:</strong> An "Uber-style" dispatch system with sub-15 min SLAs for critical emergencies.</li>
                                </ul>

                                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}>Publish Verified Problem</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
