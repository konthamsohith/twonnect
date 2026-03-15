"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
    {
        question: "What is TWONNECT?",
        answer: "TWONNECT connects early-stage co-founders with validated startup ideas and early capital. We specialize in operational readiness for institutional rounds."
    },
    {
        question: "How does the AI Matchmaking algorithm work?",
        answer: "Our proprietary AI continuously scans top skill demographics, industry history, and absolute operational compatibility to match you with complementary co-builders seamlessly."
    },
    {
        question: "Is Twonnect open to any startup stage?",
        answer: "We specialize in Idea, Build, and Invest readiness cycles. Whether you have a validated problem statement or are reading cap table diligence for accredited investors, we scale with you."
    },
    {
         question: "How do I prepare for institutional Cap Table audits?",
         answer: "You can use the Unified Workspace dynamic audit diagnostic analyzer, which executes continuous operational review loops keeping your parameters fully optimized 24/7."
    },
    {
         question: "How can angle investors get involved?",
         answer: "Accredited angel investors can access our Deal Flow match stream, providing accredited pathways into highly validated cap tables with certified diagnostics."
    }
];

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section className="faq-section" id="faq" style={{ padding: '2rem 1rem 0 1rem', background: '#ffffff' }}>
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                
                {/* Section Header */}
                <motion.div 
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
                    style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '600px' }}
                >
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111827', marginBottom: '1rem', letterSpacing: '-0.025em' }}>
                        Frequently Asked Questions
                    </h2>
                    <p style={{ color: '#6b7280', fontSize: '1.05rem', lineHeight: '1.6' }}>
                        Everything you need to know about TWONNECT, from co-founder matching to investor readiness cycles.
                    </p>
                </motion.div>

                {/* FAQ List Accordions */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {faqData.map((item, index) => (
                        <motion.div 
                            key={index}
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
                            style={{ 
                                background: '#fcfcfc', 
                                border: '1px solid #f3f4f6', 
                                borderRadius: '16px', 
                                overflow: 'hidden', 
                                transition: 'all 0.2s',
                                boxShadow: activeIndex === index ? '0 10px 20px rgba(0,0,0,0.02)' : 'none'
                             }}
                        >
                            {/* Question Header */}
                            <button 
                                onClick={() => toggleAccordion(index)}
                                style={{ 
                                    width: '100%', 
                                    padding: '1.5rem', 
                                    background: 'transparent', 
                                    border: 'none', 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center', 
                                    cursor: 'pointer',
                                    textAlign: 'left'
                                 }}
                            >
                                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827' }}>
                                    {item.question}
                                </span>
                                <motion.div 
                                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ color: '#0066ff', flexShrink: 0 }}
                                >
                                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                </motion.div>
                            </button>

                            {/* Answer Body */}
                            <AnimatePresence initial={false}>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                    >
                                        <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', color: '#4b5563', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
