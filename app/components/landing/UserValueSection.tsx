"use client";

import React from "react";
import { motion } from "framer-motion";

export default function UserValueSection() {
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
        <section className="user-value-section" style={{ padding: '8rem 1rem', background: '#fafafa' }}>
            <div className="container">
                <div className="section-header">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="section-title"
                    >
                        Built for the Entire Ecosystem
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="section-subtitle"
                    >
                        TWONNECT architecturally unites the three pillars of a successful startup.
                    </motion.p>
                </div>

                <motion.div
                    className="grid-3"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <motion.div variants={itemVariants} className="value-card">
                        <div className="value-icon-wrapper" style={{ background: '#fef3c7', color: '#d97706' }}>
                            <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                        </div>
                        <h3 className="value-title">Domain Experts</h3>
                        <p className="value-description">Share your industry pain points and find technical partners who can execute your vision.</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="value-card">
                        <div className="value-icon-wrapper" style={{ background: '#dbeafe', color: '#2563eb' }}>
                            <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" /></svg>
                        </div>
                        <h3 className="value-title">Elite Builders</h3>
                        <p className="value-description">Discover validated, real-world problems and collaborate with others to build solutions that matter.</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="value-card">
                        <div className="value-icon-wrapper" style={{ background: '#ecfdf5', color: '#059669' }}>
                            <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                        </div>
                        <h3 className="value-title">Strategic Investors</h3>
                        <p className="value-description">Discover early-stage startups solving real-world problems with verified traction and dedicated teams.</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
