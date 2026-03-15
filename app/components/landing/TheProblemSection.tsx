"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TheProblemSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } }
    };

    return (
        <section className="problem-section" style={{ padding: '8rem 1rem', background: 'var(--background)' }}>
            <div className="container">
                <div className="section-header">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="section-title"
                    >
                        The Innovation Disconnect
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="section-subtitle"
                    >
                        Most builders struggle to find meaningful problems to work on, ending up building toys.
                        Industry experts suffer through inefficiencies because they can't code.
                    </motion.p>
                </div>

                <motion.div
                    className="grid-2"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <motion.div variants={itemVariants} className="card interactive-card">
                        <div className="card-icon-wrapper" style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.08)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: 'auto' }}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>The Gap</h3>
                        <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
                            Great developers often build products nobody wants because they lack domain expertise.
                            Industry experts suffer manual processes because they can't bridge the technical gap.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="card interactive-card">
                        <div className="card-icon-wrapper" style={{ color: 'var(--brand-blue)', background: 'rgba(59, 130, 246, 0.08)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: 'auto' }}><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>The Bridge</h3>
                        <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
                            TWONNECT architecturally unites them. Share your burning problem, let elite engineers
                            build the solution, and attract institutional capital to scale.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
