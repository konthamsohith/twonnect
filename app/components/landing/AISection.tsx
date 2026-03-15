"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AISection() {
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section className="ai-section" id="ai-features" style={{ padding: '6rem 1rem', background: '#fafafa', borderBottom: '1px solid #e5e7eb' }}>
            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                
                {/* Section Header */}
                <motion.div 
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
                    style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '600px' }}
                >
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111827', marginBottom: '1rem', letterSpacing: '-0.025em' }}>
                        The future, enhanced by AI
                    </h2>
                    <p style={{ color: '#6b7280', fontSize: '1.05rem', lineHeight: '1.6' }}>
                        Harnessing the power of artificial intelligence to revolutionize co-founder matching, readines audits, and institutional funding cycles.
                    </p>
                </motion.div>

                {/* Grid Wrapper */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                    {/* Row 1: 1fr | 1fr | 1fr */}
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        
                        {/* Card 1: Co-Founder Agent */}
                        <motion.div 
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
                            style={{ flex: 1, minWidth: '280px', background: '#ffffff', borderRadius: '24px', padding: '2.5rem', border: '1px solid #f3f4f6', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', minHeight: '380px', height: 'auto' }}
                        >
                            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111827', marginBottom: '0.4rem' }}>Co-Founder Agent</h3>
                            <p style={{ color: '#6b7280', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: '1.4' }}>
                                AI continuously scans top skill profiles to match you seamlessly with complementary builders.
                            </p>
                            
                            <div style={{ flex: 1, background: '#f8fafc', borderRadius: '16px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '8px', border: '1px solid #e2e8f0' }}>
                                <div style={{ background: '#ffffff', padding: '8px 10px', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.02)', display: 'flex', gap: '5px', alignItems: 'flex-start' }}>
                                    <div style={{ color: '#0066ff', marginTop: '1px', flexShrink: 0 }}>
                                         <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                                    </div>
                                    <div style={{ fontSize: '0.58rem', color: '#374151', lineHeight: '1.3' }}>Match me with elite founders having Fintech exits.</div>
                                </div>
                                <div style={{ background: '#0066ff', color: '#ffffff', padding: '8px 10px', borderRadius: '12px', alignSelf: 'flex-end', maxWidth: '95%', fontSize: '0.58rem', lineHeight: '1.3', boxShadow: '0 3px 8px rgba(0,102,255,0.15)' }}>
                                    Found 3 matching anchors. 98% compatibility algorithm applied.
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 2: Personalization */}
                        <motion.div 
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
                            style={{ flex: 1, minWidth: '280px', background: '#ffffff', borderRadius: '24px', padding: '2.5rem', border: '1px solid #f3f4f6', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', minHeight: '380px', height: 'auto' }}
                        >
                            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111827', marginBottom: '0.4rem' }}>Smart Pitch Adapts</h3>
                            <p style={{ color: '#6b7280', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: '1.4' }}>
                                AI tailors pitch decks dynamically to each angel investor's historical thesis records.
                            </p>
                            
                            <div style={{ flex: 1, background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                <div style={{ width: '130px', height: '130px', borderRadius: '50%', border: '4px dashed #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#0066ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '1.25rem', boxShadow: '0 8px 16px rgba(0,102,255,0.2)' }}>
                                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                                    </div>
                                    <div style={{ position: 'absolute', top: '-10px', right: '10px', width: '30px', height: '30px', borderRadius: '50%', background: '#a3e635', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>
                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 12c.5 0 1 .5 1 1v2c0 .5-.5 1-1 1H6c-.5 0-1-.5-1-1v-2c0-.5.5-1 1-1"/><path d="M12 2A10 10 0 0 0 2 12c0 2.5.8 4.7 2.2 6.5"/><path d="M22 12A10 10 0 0 0 12 2"/><path d="M19.8 18.5A10 10 0 0 1 12 22"/></svg>
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '10px', left: '-5px', width: '30px', height: '30px', borderRadius: '50%', background: '#facc15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>
                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 3: Autonomous Grade */}
                        <motion.div 
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
                            style={{ flex: 1, minWidth: '280px', background: '#ffffff', borderRadius: '24px', padding: '1.75rem 2.25rem 2.25rem 2.25rem', border: '1px solid #f3f4f6', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', minHeight: '380px', height: 'auto' }}
                        >
                            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111827', marginBottom: '0.4rem' }}>Autonomous Diligence</h3>
                            <p style={{ color: '#6b7280', fontSize: '0.92rem', marginBottom: '0.75rem', lineHeight: '1.4' }}>
                                AI continuously audits and keeps your startup parameters relevant and optimized for scaling.
                            </p>
                            
                            <div style={{ flex: 1, background: '#f8fafc', borderRadius: '16px', padding: '0.85rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#ffffff', padding: '5px 8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                                     <div style={{ color: '#0066ff', flexShrink: 0 }}>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                                     </div>
                                     <div style={{ fontSize: '0.58rem', color: '#6b7280' }}>Ask AI to evaluate cap table...</div>
                                </div>
                                <div style={{ marginTop: '3px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    {['Audit cap structure', 'Verify validation data', 'Rate investor thesis'].map((item, idx) => (
                                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '5px 8px', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                                            <span style={{ fontSize: '0.58rem', color: '#374151', fontWeight: 500 }}>{item}</span>
                                            <span style={{ fontSize: '0.58rem', color: '#0066ff' }}>→</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                    </div>

                    {/* Row 2: 1fr | 2fr */}
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        
                        {/* Card 4: Traction Velocity */}
                        <motion.div 
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
                            style={{ flex: 1, minWidth: '280px', background: '#ffffff', borderRadius: '24px', padding: '2.5rem', border: '1px solid #f3f4f6', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', minHeight: '360px', height: 'auto' }}
                        >
                            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111827', marginBottom: '0.4rem' }}>Traction Velocity</h3>
                            <p style={{ color: '#6b7280', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: '1.4' }}>
                                AI tracks velocity speed analysis, letting your team focus actionable setups.
                            </p>
                            
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
                                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0' }}>
                                    <div>
                                        <div style={{ fontSize: '0.65rem', color: '#6b7280', fontWeight: 600 }}>MATCH SPEED</div>
                                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827' }}>+45%</div>
                                    </div>
                                    <div style={{ color: '#22c55e' }}>
                                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                                    </div>
                                </div>
                                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0' }}>
                                    <div>
                                        <div style={{ fontSize: '0.65rem', color: '#6b7280', fontWeight: 600 }}>CAP AUDIT TIME</div>
                                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827' }}>-80%</div>
                                    </div>
                                    <div style={{ color: '#22c55e' }}>
                                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 5: Actionable Diligence */}
                        <motion.div 
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
                            style={{ flex: 2, minWidth: '350px', background: '#ffffff', borderRadius: '24px', padding: '2.5rem', border: '1px solid #f3f4f6', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', minHeight: '360px', height: 'auto' }}
                        >
                            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111827', marginBottom: '0.4rem' }}>Actionable Diagnostics</h3>
                            <p style={{ color: '#6b7280', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: '1.4' }}>
                                AI analyzes user behavior match metrics, traffic grade, and conversions to optimize your rating.
                            </p>
                            
                            <div style={{ flex: 1, background: '#f8fafc', borderRadius: '16px', padding: '1.25rem', border: '1px solid #e2e8f0', display: 'flex', gap: '20px', alignItems: 'center' }}>
                                 <div style={{ textAlign: 'center' }}>
                                      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', marginBottom: '8px' }}>
                                           <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                      </div>
                                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>Lead Founder</div>
                                      <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Fintech Specialty</div>
                                 </div>
                                 <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                      <div style={{ background: '#ffffff', padding: '12px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                                           <div>
                                                <div style={{ fontSize: '0.65rem', color: '#6b7280' }}>Investor Readiness Score</div>
                                                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0066ff' }}>94.2</div>
                                           </div>
                                           <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f0f7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066ff' }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                                           </div>
                                      </div>
                                      <div style={{ background: '#ffffff', padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                                           <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4b5563' }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                           </div>
                                           <div>
                                                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#111827' }}>Verified for YC W26</div>
                                                <div style={{ fontSize: '0.65rem', color: '#6b7280' }}>Audit rating: Institutional</div>
                                           </div>
                                      </div>
                                 </div>
                            </div>
                        </motion.div>

                    </div>

                </div>

            </div>
        </section>
    );
}
