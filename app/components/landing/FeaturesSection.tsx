"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FeaturesSection() {
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section className="features-section" id="features" style={{ padding: '6rem 1rem', background: '#fcfcfc', borderBottom: '1px solid #e5e7eb' }}>
            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                
                {/* Section Header */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={itemVariants}
                    style={{ textAlign: 'center', marginBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    <h2 style={{ fontSize: '2.8rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.04em', marginBottom: '0.75rem' }}>
                        Why build with TWONNECT?
                    </h2>
                    <p style={{ maxWidth: '600px', fontSize: '1.05rem', color: '#6b7280', lineHeight: '1.5' }}>
                        Crafted to take you from direct domain expert friction to deep institutional-grade validation.
                    </p>
                </motion.div>

                {/* Bento Grid layout */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
                    
                    {/* Row 1: 2fr | 1fr | 1fr */}
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        
                        {/* Card 1: Vetted Domain Experts */}
                        <motion.div 
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
                            style={{ flex: 2, minWidth: '350px', background: '#ffffff', borderRadius: '24px', padding: '2.5rem', border: '1px solid #f3f4f6', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: '360px' }}
                        >
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '0.4rem' }}>Vetted Domain Experts</h3>
                            <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                                Connect with domain experts who submit real-world problem statements and budget-aligned market needs.
                            </p>
                            <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="240" height="240" viewBox="0 0 240 240" style={{ opacity: 0.8 }}>
                                    <circle cx="120" cy="120" r="90" stroke="#f1f5f9" strokeWidth="1.5" strokeDasharray="6 6" fill="none" />
                                    <circle cx="120" cy="120" r="60" stroke="#f1f5f9" strokeWidth="1.5" strokeDasharray="6 6" fill="none" />
                                    <circle cx="120" cy="120" r="30" stroke="#f1f5f9" strokeWidth="1.5" strokeDasharray="6 6" fill="none" />
                                </svg>
                                <img src="https://i.pravatar.cc/100?u=a" style={{ position: 'absolute', top: '15%', left: '30%', width: '36px', height: '36px', borderRadius: '50%', border: '2px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} alt="" />
                                <img src="https://i.pravatar.cc/100?u=b" style={{ position: 'absolute', top: '50%', left: '15%', width: '36px', height: '36px', borderRadius: '50%', border: '2px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} alt="" />
                                <img src="https://i.pravatar.cc/100?u=c" style={{ position: 'absolute', top: '70%', right: '25%', width: '36px', height: '36px', borderRadius: '50%', border: '2px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} alt="" />
                                <img src="https://i.pravatar.cc/100?u=d" style={{ position: 'absolute', top: '30%', right: '35%', width: '36px', height: '36px', borderRadius: '50%', border: '2px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} alt="" />
                            </div>
                        </motion.div>

                        {/* Card 2: Interactive Sandbox (Lime) */}
                        <motion.div 
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
                            style={{ flex: 1, minWidth: '250px', background: '#bef264', borderRadius: '24px', padding: '2.5rem', display: 'flex', flexDirection: 'column', minHeight: '360px', position: 'relative', overflow: 'hidden' }}
                        >
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '0.4rem' }}>AI Validation</h3>
                            <p style={{ color: '#4b5563', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                                Run AI-powered simulations to validate problem intensity and investor demand securely before building.
                            </p>
                            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', gap: '8px', padding: '1rem', background: 'rgba(255,255,255,0.2)', borderRadius: '16px', position: 'relative' }}>
                                {[...Array(9)].map((_, i) => (
                                    <div key={i} style={{ background: 'rgba(255,255,255,0.4)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
                                ))}
                                <div style={{ position: 'absolute', top: '42%', left: '42%', background: '#ffffff', padding: '0.5rem', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    💡
                                </div>
                            </div>
                        </motion.div>                        {/* Card 3: Co-Founder Matching */}
                        <motion.div 
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
                            style={{ flex: 1, minWidth: '250px', background: '#ffffff', borderRadius: '24px', padding: '2.5rem', border: '1px solid #f3f4f6', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', minHeight: '360px', overflow: 'hidden' }}
                        >
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '0.4rem' }}>Co-Founder Match</h3>
                            <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: '1.25rem', lineHeight: '1.5' }}>
                                Seamlessly connect with top-tier domain experts and elite engineers to launch high-growth companies.
                            </p>
                             <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', width: '100%', marginTop: 'auto' }}>
                                 {/* Item 1: Profile 1 */}
                                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                                     <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', flexShrink: 0 }}>
                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                     </div>
                                     <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#111827', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>Domain Expert</div>
                                     <div style={{ fontSize: '0.55rem', color: '#16a34a', background: '#d1fae5', padding: '1px 5px', borderRadius: '4px', fontWeight: 600 }}>Ideas</div>
                                 </div>

                                 {/* Connection Line */}
                                 <div style={{ flex: 1, display: 'flex', alignItems: 'center', position: 'relative' }}>
                                      <div style={{ flex: 1, borderTop: '2px dashed #93c5fd' }}></div>
                                 </div>

                                 {/* Item 2: Profile 2 */}
                                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                                     <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0 }}>
                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                     </div>
                                     <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#111827', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>Elite Builder</div>
                                     <div style={{ fontSize: '0.55rem', color: '#0066ff', background: '#dbeafe', padding: '1px 5px', borderRadius: '4px', fontWeight: 600 }}>Codes</div>
                                 </div>
                             </div>
                         </motion.div>
                    </div>

                    {/* Row 2: 1fr | 1fr | 2fr */}
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                                              {/* Card 4: Venture Readiness (Black) */}
                        <motion.div 
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
                            style={{ flex: 1, minWidth: '220px', background: '#000000', borderRadius: '24px', padding: '2.5rem', display: 'flex', flexDirection: 'column', color: '#ffffff', height: '340px', position: 'relative', overflow: 'hidden' }}
                        >
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.4rem' }}>Venture Ready</h3>
                            <p style={{ color: '#9ca3af', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                                Get a verified audit report to prepare your cap table and data room for institutional fundraising.
                            </p>
                        </motion.div>

                        {/* Card 5: 24/7 Chat Support */}
                        <motion.div 
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
                            style={{ flex: 1, minWidth: '220px', background: '#ffffff', borderRadius: '24px', padding: '2.5rem', border: '1px solid #f3f4f6', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', height: '340px', position: 'relative', overflow: 'hidden' }}
                        >
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '0.4rem' }}>Idea. Build. Invest.</h3>
                            <p style={{ color: '#6b7280', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: '1.4' }}>
                                Access the TWONNECT index to maintain structural momentum and validate your growth cycle.
                            </p>
                            <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 'auto' }}>
                                 {/* Invest */}
                                 <div style={{ position: 'absolute', bottom: '10px', right: '12px', width: '60px', height: '60px', background: '#22c55e', borderRadius: '16px', transform: 'rotate(12deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(34,197,94,0.2)' }}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
                                 </div>
                                 {/* Idea */}
                                 <div style={{ position: 'absolute', bottom: '10px', left: '12px', width: '60px', height: '60px', background: '#facc15', borderRadius: '16px', transform: 'rotate(-12deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(250,204,21,0.2)' }}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                                 </div>
                                 {/* Build */}
                                 <div style={{ width: '60px', height: '60px', background: '#3b82f6', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(59,130,246,0.2)', position: 'relative', zIndex: 1, color: '#ffffff' }}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg>
                                 </div>
                            </div>
                        </motion.div>

                        {/* Card 6: Equity & Build (Blue) */}
                        <motion.div 
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
                            style={{ flex: 2, minWidth: '350px', background: '#ffffff', border: '1px solid #f3f4f6', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', borderRadius: '24px', padding: '2.5rem', display: 'flex', flexDirection: 'column', color: '#111827', height: '340px', overflow: 'hidden' }}
                        >
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.4rem' }}>Unified Workspace</h3>
                            <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                                Connect instantly with your matches through integrated communication tools.
                            </p>
                            <div style={{ flex: 1, display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center', marginTop: 'auto' }}>
                                {/* Chat */}
                                <div style={{ flex: 1, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', transition: 'all 0.2s' }}>
                                    <div style={{ color: '#0066ff' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                                    </div>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#111827' }}>Chat</div>
                                </div>
                                {/* Voice */}
                                <div style={{ flex: 1, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', transition: 'all 0.2s' }}>
                                    <div style={{ color: '#0066ff' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27 a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                    </div>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#111827' }}>Voice</div>
                                </div>
                                {/* Video */}
                                <div style={{ flex: 1, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', transition: 'all 0.2s' }}>
                                    <div style={{ color: '#0066ff' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
                                    </div>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#111827' }}>Video</div>
                                </div>
                            </div>
                        </motion.div>

                    </div>



                </div>
            </div>
        </section>
    );
}
