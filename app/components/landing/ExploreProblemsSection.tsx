"use client";

import React from "react";
import { motion } from "framer-motion";

const exampleProblems = [
    {
        title: "Real-time Supply Chain Visibility for SMBs",
        category: "Logistics",
        builders: 4,
        desc: "Small manufacturers have no affordable way to track raw material shipments in real-time, leading to production delays."
    },
    {
        title: "Automated Clinical Trial Matching",
        category: "Healthcare",
        builders: 7,
        desc: "Patients struggle to find and qualify for clinical trials. Doctors don't have the time to manually search databases for their patients."
    },
    {
        title: "AI-Driven Developer Onboarding",
        category: "DevTools",
        builders: 12,
        desc: "New engineers take 3-4 weeks to become productive in large codebases. We need an AI that explains architecture based on codebase analysis."
    }
];

export default function ExploreProblemsSection() {
    return (
        <section className="explore-problems-section" id="explore" style={{ padding: '10rem 1rem', background: 'white' }}>
            <div className="container">
                <div className="section-header" style={{ textAlign: 'left', marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
                    <div style={{ maxWidth: '600px' }}>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="section-title"
                            style={{ textAlign: 'left' }}
                        >
                            Explore Validated Problems
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="section-subtitle"
                            style={{ textAlign: 'left', margin: '0' }}
                        >
                            Submit your burning frustrations and watch top engineering talent architect solutions.
                        </motion.p>
                    </div>
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="btn-outline"
                    >
                        View All Problems
                    </motion.button>
                </div>

                <div className="grid-3">
                    {exampleProblems.map((problem, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as any }}
                            className="problem-card"
                        >
                            <div className="problem-category">{problem.category}</div>
                            <h3 className="problem-title">{problem.title}</h3>
                            <p className="problem-desc">{problem.desc}</p>
                            <div className="problem-meta">
                                <span style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 500 }}>
                                    <strong style={{ color: 'var(--primary)', fontWeight: 800 }}>{problem.builders}</strong> Builders Interested
                                </span>
                                <button className="btn-get-started" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', borderRadius: 'var(--radius-sm)' }}>Solve This</button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
