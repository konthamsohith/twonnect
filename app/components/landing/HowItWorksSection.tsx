"use client";

import React from "react";
import { motion } from "framer-motion";

export default function HowItWorksSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } }
    };

    return (
        <section className="how-it-works-section" id="how-it-works" style={{ padding: '8rem 1rem', background: '#ffffff' }}>
            <div className="container" style={{ maxWidth: '1150px', margin: '0 auto' }}>
                <div className="section-header" style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <div className="features-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#ffffff', border: '1px solid #e2e8f0', padding: '0.4rem 1.25rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 600, color: '#64748b', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                        🪄 Features
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="section-title"
                        style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.04em', color: '#000', marginBottom: '1rem' }}
                    >
                        The Architectural Journey
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="section-subtitle"
                        style={{ color: '#4b5563', fontSize: '1rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6, opacity: 0.8 }}
                    >
                        Harnessing the power of artificial intelligence to revolutionize industries and enhance human experiences.
                    </motion.p>
                </div>

                <motion.div
                    className="bento-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Card 01: Share a Problem (Adaptive Innovative Platforms) */}
                    <motion.div variants={itemVariants} className="bento-card card-sm">
                        <div className="card-text">
                            <h3>Share a Problem</h3>
                            <p>Users post real-world challenges, industry inefficiencies, or bottlenecks they experience daily.</p>
                        </div>
                        <div className="card-illustration">
                            <div className="mock-chat-window">
                                <div className="mock-chat-header">
                                    <div className="spark-icon">✨</div>
                                    <span>Sure, here is a brand philosophy for a creative agency:</span>
                                </div>
                                <div className="mock-chat-action">
                                    <div className="pill-action">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>
                                        <span>Show transcript</span>
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                                    </div>
                                </div>
                                <p className="mock-chat-footer">At AI Hear, we craft powerful stories that connect emotionally and bring your brand alive.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 02: Form Teams (Adaptive Personalization) */}
                    <motion.div variants={itemVariants} className="bento-card card-sm">
                        <div className="card-text">
                            <h3>Form Teams</h3>
                            <p>Elite engineering teams form around validated problems, grouping to building framing tools.</p>
                        </div>
                        <div className="card-illustration" style={{ background: 'transparent', border: 'none', padding: 0 }}>
                            <div className="mock-wireframe-panel">
                                <div className="wireframe-grid"></div>
                                <div className="wireframe-cursor"></div>
                                <div className="wireframe-gauge">
                                    <svg width="40" height="40" viewBox="0 0 40 40">
                                        <circle cx="20" cy="20" r="16" stroke="#e2e8f0" strokeWidth="3" fill="none" />
                                        <circle cx="20" cy="20" r="16" stroke="#3b82f6" strokeWidth="3" fill="none" strokeDasharray="100" strokeDashoffset="30" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 03: Architect Solution (Adaptive Continual Improvement) */}
                    <motion.div variants={itemVariants} className="bento-card card-sm">
                        <div className="card-text">
                            <h3>Architect Solution</h3>
                            <p>Co-found builders architect solutions addressing verified market gaps with accurate limits.</p>
                        </div>
                        <div className="card-illustration">
                            <div className="mock-check-panel">
                                <div className="mock-search-bar">
                                    <span style={{ color: '#3b82f6' }}>✨</span>
                                    <span style={{ color: '#9ca3af' }}>Ask AI to write</span>
                                </div>
                                <div className="mock-list-box">
                                    <div className="mock-list-item selected">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                                        <span>UI/UX Ideas</span>
                                    </div>
                                    <div className="mock-list-item">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                                        <span>Design Style</span>
                                    </div>
                                    <div className="mock-list-item">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                                        <span>Web design</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 04: Launch MVP (Large Card - Adaptive Efficiency) */}
                    <motion.div variants={itemVariants} className="bento-card card-lg">
                        <div className="card-text">
                            <h3>Launch MVP</h3>
                            <p>Solutions evolve into fully functional MVPs with built-in traction benchmarks turning into dashboards.</p>
                        </div>
                        <div className="card-illustration" style={{ background: 'transparent', border: 'none', padding: 0 }}>
                            <div className="mock-stats-stack">
                                <div className="stats-row">
                                    <div className="stats-info">
                                        <span className="stats-label">Efficiency</span>
                                        <span className="stats-val">+20%</span>
                                    </div>
                                    <svg className="stats-graph" width="80" height="24" viewBox="0 0 80 24">
                                        <path d="M4 16 C 12 12, 16 20, 24 16 C 32 12, 40 4, 48 12 C 56 20, 64 8, 76 4" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                                    </svg>
                                </div>
                                <div className="stats-row">
                                    <div className="stats-info">
                                        <span className="stats-label">Consumption</span>
                                        <span className="stats-val" style={{ fontSize: '0.9rem', fontWeight: 600 }}>163W/km</span>
                                    </div>
                                    <div className="stats-icon-box">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                                    </div>
                                </div>
                                <div className="stats-row">
                                    <div className="stats-info">
                                        <span className="stats-label">This Week</span>
                                        <span className="stats-val" style={{ fontSize: '0.9rem', fontWeight: 600 }}>1.3442km</span>
                                    </div>
                                    <svg className="stats-graph" width="80" height="24" viewBox="0 0 80 24">
                                        <path d="M4 12 C 12 16, 16 8, 24 12 C 32 16, 40 20, 48 12 C 56 4, 64 16, 76 8" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 05: Scale & Funding (Large Card - Adaptive Insights) */}
                    <motion.div variants={itemVariants} className="bento-card card-lg" style={{ background: 'linear-gradient(to right, #ffffff, #fafbfc)', position: 'relative' }}>
                        <div className="card-text">
                            <h3>Scale & Funding</h3>
                            <p>Attract angel and institutional investors directly on the platform with automated scale metrics dashboards.</p>
                        </div>
                        <div className="card-illustration" style={{ background: 'transparent', border: 'none', padding: 0, justifyContent: 'flex-start', alignItems: 'stretch' }}>
                            <div className="mock-insights-content">
                                {/* Left Profile Box */}
                                <div className="box-profile">
                                    <div className="profile-img-placeholder">
                                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" alt="Founder" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.75rem' }} />
                                    </div>
                                    <div className="profile-details">
                                        <h4>Mark Marsh</h4>
                                        <span>Futuristic Style</span>
                                    </div>
                                </div>

                                {/* Right Stats & Alerts Column */}
                                <div className="column-alerts">
                                    <div className="alert-box row-users">
                                        <div className="alert-info">
                                            <span className="alert-lbl">Today's Users</span>
                                            <div className="alert-val">2,400 <span className="green">+10%</span></div>
                                        </div>
                                        <div className="alert-icon-square">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                                        </div>
                                    </div>
                                    <div className="alert-box row-funding">
                                        <div className="flex-row">
                                            <div className="avatar-circle">H</div>
                                            <div className="funding-detail">
                                                <h4>Mark Marsh <span style={{ color: '#9ca3af', fontWeight: 400, fontSize: '0.75rem' }}>Sent you a coin</span></h4>
                                                <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>Sroknggo tuku es anakmu yuo</p>
                                            </div>
                                        </div>
                                        <div className="funding-amt">+400,200 LTC</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
