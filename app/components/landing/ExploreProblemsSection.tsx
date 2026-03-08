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
        <section className="landing-section" id="explore">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div style={{ textAlign: 'left', maxWidth: '650px' }}>
                        <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '0.75rem' }}>Explore Validated Problems</h2>
                        <p className="text-muted text-lg" style={{ lineHeight: 1.6 }}>Real pain points submitted by industry experts, waiting for builders.</p>
                    </div>
                    <button className="btn-outline">View All Problems</button>
                </div>

                <div className="grid-3">
                    {exampleProblems.map((problem, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="problem-card"
                        >
                            <div className="problem-category">{problem.category}</div>
                            <h3 className="problem-title">{problem.title}</h3>
                            <p className="problem-desc">{problem.desc}</p>
                            <div className="problem-meta">
                                <span><strong style={{ color: 'var(--primary)', fontWeight: 700 }}>{problem.builders}</strong> Builders Interested</span>
                                <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Solve This</button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
