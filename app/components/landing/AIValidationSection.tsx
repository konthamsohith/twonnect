"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIValidationSection() {
    return (
        <section className="ai-validation-section" style={{ padding: '8rem 1rem', background: '#fafafa' }}>
            <div className="container">
                <div className="section-header">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="section-title"
                    >
                        AI-Powered Validation
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="section-subtitle"
                    >
                        Our AI Agent architecturally analyzes your problem against global markets
                        to ensure it's a foundation worth building upon.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
                    className="ai-mockup"
                >
                    <div className="preview-header glass" style={{ borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.5rem' }}>
                        <div className="preview-dots">
                            <div className="preview-dot" style={{ background: '#ff5f56' }} />
                            <div className="preview-dot" style={{ background: '#ffbd2e' }} />
                            <div className="preview-dot" style={{ background: '#27c93f' }} />
                        </div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600, marginLeft: '0.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>TWONNECT Analysis Engine v2.0</span>
                    </div>
                    <div className="preview-content" style={{ padding: '3rem', background: 'white' }}>
                        <div style={{ marginBottom: '2.5rem' }}>
                            <div style={{ color: 'var(--muted)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>// Input Query</div>
                            <div style={{ color: 'var(--primary)', fontSize: '1.125rem', fontWeight: 500, lineHeight: 1.5, paddingLeft: '1.25rem', borderLeft: '3px solid var(--brand-lime)' }}>
                                "Decentralized autonomous logistics for local plumbers facing emergency hardware shortages."
                            </div>
                        </div>

                        <div className="analysis-result-box" style={{ background: 'var(--secondary)', borderRadius: '16px', padding: '2rem', border: '1px solid var(--border-color)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: '#10b981', fontWeight: 700, fontSize: '0.95rem' }}>
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                ANALYSIS COMPLETE: HIGH POTENTIAL
                            </div>

                            <div className="result-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                                <div className="result-item">
                                    <div style={{ color: 'var(--muted)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Competitor Saturation</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>LOW (12.4%)</div>
                                </div>
                                <div className="result-item">
                                    <div style={{ color: 'var(--muted)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Pain Score</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ef4444' }}>CRITICAL (9.2/10)</div>
                                </div>
                                <div className="result-item">
                                    <div style={{ color: 'var(--muted)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Est. TAM</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--brand-blue)' }}>$8.4B</div>
                                </div>
                            </div>

                            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(15, 23, 42, 0.05)' }}>
                                <div style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                                    <strong style={{ color: 'var(--primary)' }}>Core Opportunity:</strong> Current marketplaces like Thumbtack fail on inventory logistics.
                                    Integrating a peer-to-peer parts ledger would decouple job speed from supply chain latency.
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="btn-get-started" style={{ padding: '0.8rem 2rem' }}>Publish Verified Problem</button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
