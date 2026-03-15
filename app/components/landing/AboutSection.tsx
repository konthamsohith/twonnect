"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutSection() {
    return (
        <section className="about-section" id="about" style={{ padding: '6rem 1rem', background: '#ffffff' }}>
            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    <div style={{ background: '#f3f4f6', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, color: '#4b5563', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '1.25rem' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#111827' }}><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
                        About us
                    </div>
                    <p style={{ maxWidth: '600px', fontSize: '1.4rem', color: '#111827', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: '1.4', marginBottom: '2.5rem' }}>
                        TWONNECT is an end-to-end ecosystem where Domain Experts validate real-world problem statements, matching with Elite Builders and Angel Investors to launch fundable startups before writing arbitrary code.
                    </p>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.6rem', maxWidth: '600px' }}>
                        <span style={{ padding: '0.4rem 0.85rem', borderRadius: '20px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', fontSize: '0.75rem', fontWeight: 600 }}>Problem Validation</span>
                        <span style={{ padding: '0.4rem 0.85rem', borderRadius: '20px', background: '#f5f3ff', color: '#7c3aed', border: '1px solid #ddd6fe', fontSize: '0.75rem', fontWeight: 600 }}>Founder Sync</span>
                        <span style={{ padding: '0.4rem 0.85rem', borderRadius: '20px', background: '#fff7ed', color: '#ea580c', border: '1px solid #fed7aa', fontSize: '0.75rem', fontWeight: 600 }}>Angel Matching</span>
                        <span style={{ padding: '0.4rem 0.85rem', borderRadius: '20px', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', fontSize: '0.75rem', fontWeight: 600 }}>Venture Scouting</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.6rem', maxWidth: '600px', marginTop: '0.6rem' }}>
                        <span style={{ padding: '0.4rem 0.85rem', borderRadius: '20px', background: '#fdf2f8', color: '#db2777', border: '1px solid #fbcfe8', fontSize: '0.75rem', fontWeight: 600 }}>Startup Sandbox</span>
                        <span style={{ padding: '0.4rem 0.85rem', borderRadius: '20px', background: '#ecfeff', color: '#0891b2', border: '1px solid #a5f3fc', fontSize: '0.75rem', fontWeight: 600 }}>AI Scouting</span>
                        <span style={{ padding: '0.4rem 0.85rem', borderRadius: '20px', background: '#fdf4ff', color: '#c026d3', border: '1px solid #f5d0fe', fontSize: '0.75rem', fontWeight: 600 }}>Marketplace Gaps</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
