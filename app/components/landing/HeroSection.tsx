"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import "./Landing.css";
import BlueprintLines from "./BlueprintLines";

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
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
    };

    return (
        <section className="hero-section" style={{ background: '#ffffff', position: 'relative', marginTop: '-2rem' }}>
            <BlueprintLines />
            <motion.div
                className="container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >


                <motion.h1 variants={itemVariants} className="hero-title">
                    The Unified <br />
                    Startup Ecosystem
                </motion.h1>

                <motion.p variants={itemVariants} className="hero-subtitle" style={{ marginBottom: '0.5rem' }}>
                    Where domain experts share problems, engineers build solutions, and investors fund growth. <br />
                    Accelerate your roadmap and secure backing with smart refining support.
                </motion.p>

                <motion.div variants={itemVariants} style={{ marginTop: '0.75rem' }}>
                    <Link href="/auth">
                        <button className="btn-get-started-lime" style={{ 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            gap: '0.5rem', 
                            padding: '0.6rem 1.75rem', 
                            fontFamily: '"Instrument Sans", sans-serif',
                            fontWeight: 500,
                            color: 'rgb(13, 41, 0)',
                            fontSize: '16px',
                            lineHeight: '24px',
                            border: '1px solid rgb(131, 202, 22)',
                            backgroundColor: 'rgb(162, 228, 53)',
                            width: '100%',
                            borderRadius: '999px',
                            boxShadow: 'inset 0px 2px 0px 0px rgb(189, 241, 100), 0px 2px 4px -2px rgba(100, 162, 13, 0.5), 0px 4px 8px -4px rgba(100, 162, 13, 0.5)',
                            opacity: 1,
                            willChange: 'auto'
                        }}>
                            Get started
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s ease' }}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </button>
                    </Link>
                </motion.div>

                {/* Refined Social Proof Pill */}
                <motion.div variants={itemVariants} className="social-proof-pill">
                    <div className="avatar-group">
                        <img src="https://i.pravatar.cc/100?u=1" className="avatar-group-item" alt="" />
                        <img src="https://i.pravatar.cc/100?u=2" className="avatar-group-item" alt="" />
                        <img src="https://i.pravatar.cc/100?u=3" className="avatar-group-item" alt="" />
                        <span className="social-proof-text" style={{ marginLeft: '1rem', fontFamily: '"Instrument Sans", sans-serif', fontWeight: 500, color: 'rgb(27, 27, 33)', fontSize: '14px', lineHeight: '20px' }}>20K+</span>
                    </div>
                    <div style={{ width: '1px', height: '16px', background: '#e2e8f0' }} />
                    <div className="social-proof-text" style={{ fontFamily: '"Instrument Sans", sans-serif', fontWeight: 500, color: 'rgb(27, 27, 33)', fontSize: '14px', lineHeight: '20px' }}>Trusted by 59k+ users</div>
                    <div style={{ width: '1px', height: '16px', background: '#e2e8f0' }} />
                    <div className="social-proof-stars">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                        <span style={{ marginLeft: '0.4rem', fontFamily: '"Instrument Sans", sans-serif', fontWeight: 500, color: 'rgb(27, 27, 33)', fontSize: '14px', lineHeight: '20px' }}>5.0</span>
                    </div>
                </motion.div>

                {/* Pixel-Perfect Workspace Mockup */}
                <motion.div variants={itemVariants} className="workspace-mockup" style={{ 
                    backgroundColor: '#F8FAF6', 
                    border: '1px solid #0d29000d', 
                    borderRadius: '24px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    position: 'relative', 
                    overflow: 'hidden' 
                }}>
                    {/* Window Chrome */}
                    <div className="mockup-header">
                        <div className="window-controls">
                            <div className="dot dot-red" />
                            <div className="dot dot-yellow" />
                            <div className="dot dot-green" />
                        </div>
                        <div className="mockup-address-bar">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg> https://twonnect.me/dashboard/ideas
                        </div>
                    </div>

                    <div style={{ padding: '0rem 1rem 1rem 1rem', width: '100%', background: '#F8FAF6', display: 'flex', flex: 1 }}>
                        <div className="mockup-body" style={{ width: '100%', height: '100%', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', background: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'grid', gridTemplateColumns: '240px 1fr' }}>
                        {/* Sidebar */}
                        <aside className="mockup-sidebar" style={{ background: '#ffffff' }}>
                            <div className="sidebar-logo">

                                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>TWONNECT</span>
                            </div>
                            <div className="sidebar-link">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                                Marketplace
                            </div>

                            <div className="sidebar-link" style={{ background: '#f8fafc', color: '#0f172a', fontWeight: 600, borderRadius: '8px' }}>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#000' }}><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" /></svg>
                                My Ideas
                            </div>

                            <div className="sidebar-link">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                Collaborations
                            </div>

                            <div className="sidebar-link">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2V4" /><path d="M12 20V22" /><path d="M4.93 4.93L6.34 6.34" /><path d="M17.66 17.66L19.07 19.07" /><path d="M2 12H4" /><path d="M20 12H22" /><path d="M4.93 19.07L6.34 17.66" /><path d="M17.66 6.34L19.07 4.93" /><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /></svg>
                                AI Sandbox
                            </div>

                            <div className="sidebar-link">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>
                                Investor Portal
                            </div>

                            <div className="sidebar-link">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                Network Console
                            </div>

                            <div className="sidebar-link">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                Messages
                            </div>

                            <div className="sidebar-link" style={{ background: 'transparent', cursor: 'default', color: '#94a3b8', fontWeight: 700, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem', marginTop: '1rem' }}>
                                Settings
                            </div>

                            <div className="sidebar-link">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                Account
                            </div>
<div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.4rem 0.6rem' }}>
                                       <img src="/rahul_verma_profile_new.png" alt="Profile" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                         <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Rahul Verma</span>
                                         <span style={{ fontSize: '0.65rem', color: '#64748b' }}>rahulverma@gmail.com</span>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <main className="mockup-content" style={{ position: 'relative', display: 'flex', flexDirection: 'column', background: '#F9FAFB' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>Idea Control Center</h3>
                                    <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Track, refine, and connect with optimal resources.</p>
                                </div>
                                <button style={{ background: '#000000', color: '#fff', fontSize: '0.75rem', fontWeight: 600, padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ fontSize: '1rem', fontWeight: 500 }}>+</span> New Proposal</button>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ background: '#fff', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', flex: 1 }}>
                                    <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '0.25rem' }}>Active Proposals</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>12</div>
                                </div>
                                <div style={{ background: '#fff', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', flex: 1 }}>
                                    <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '0.25rem' }}>Collaborations</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>5</div>
                                </div>
                                <div style={{ background: '#fff', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', flex: 1 }}>
                                    <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '0.25rem' }}>Approved/Funded</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>2</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                                <div style={{ padding: '0.5rem 1rem', borderBottom: '2px solid #0f172a', color: '#0f172a', fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer' }}>Active</div>
                                <div style={{ padding: '0.5rem 1rem', color: '#64748b', fontSize: '0.75rem', cursor: 'pointer' }}>Under Review</div>
                                <div style={{ padding: '0.5rem 1rem', color: '#64748b', fontSize: '0.75rem', cursor: 'pointer' }}>Drafts</div>
                                <div style={{ padding: '0.5rem 1rem', color: '#64748b', fontSize: '0.75rem', cursor: 'pointer' }}>Closed</div>
                            </div>

                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                {/* Row 1 */}
                                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>AI-Powered Supply Chain Optimizer</div>
                                        <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '2px' }}>Submitted Oct 14, 2026 • 3 matches</div>
                                    </div>
                                    <span style={{ padding: '0.25rem 0.6rem', borderRadius: '20px', background: '#fef3c7', color: '#d97706', fontSize: '0.65rem', fontWeight: 600 }}>In Review</span>
                                </div>
                                
                                {/* Row 2 */}
                                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>Decentralized Microgrid Edge Controller</div>
                                        <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '2px' }}>Submitted Oct 08, 2026 • 1 match</div>
                                    </div>
                                    <span style={{ padding: '0.25rem 0.6rem', borderRadius: '20px', background: '#f3f4f6', color: '#4b5563', fontSize: '0.65rem', fontWeight: 600 }}>Draft</span>
                                </div>

                                {/* Row 3 */}
                                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>Next-Gen Medical Ledger Sync</div>
                                        <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '2px' }}>Submitted Sep 22, 2026 • 8 matches</div>
                                    </div>
                                    <span style={{ padding: '0.25rem 0.6rem', borderRadius: '20px', background: '#d1fae5', color: '#059669', fontSize: '0.65rem', fontWeight: 600 }}>Approved</span>
                                </div>
                            </div>
                        </main>
                        </div>
                    </div>


                </motion.div>
                

            </motion.div>
        </section>
    );
}
