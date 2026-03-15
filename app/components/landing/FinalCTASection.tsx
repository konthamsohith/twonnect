"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Subtle animated nodes representing idea -> builder -> startup
const FloatingNode = ({ delay, top, left, size, opacity = 0.5, type }: { delay: number, top: string, left: string, size: number, opacity?: number, type?: 'circle' | 'square' | 'triangle' }) => {
    return (
        <motion.div
            style={{
                position: 'absolute',
                top,
                left,
                width: size,
                height: size,
                borderRadius: type === 'circle' ? '50%' : type === 'square' ? '12px' : '0',
                background: type !== 'triangle' ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                backdropFilter: type !== 'triangle' ? 'blur(4px)' : 'none',
                border: type !== 'triangle' ? '1px solid rgba(255,255,255,0.1)' : 'none',
                opacity,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            animate={{
                y: [0, -15, 0],
                x: [0, 10, 0],
                rotate: type === 'triangle' ? [0, 15, 0] : [0, 5, 0],
            }}
            transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
            }}
        >
            {type === 'triangle' && (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', color: 'rgba(255,255,255,0.15)' }}>
                    <path d="M12 4L4 20H20L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )}
            {type === 'square' && (
                <div style={{ width: '40%', height: '40%', borderRadius: '4px', background: 'rgba(255,255,255,0.1)' }} />
            )}
        </motion.div>
    );
};

export default function FinalCTASection() {
    return (
        <section className="final-cta-section">
            <div className="final-cta-background" />
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
                    style={{
                        position: 'relative',
                        background: 'var(--brand-navy)',
                        borderRadius: '32px',
                        overflow: 'hidden',
                        padding: '8rem 2rem',
                        textAlign: 'center',
                        boxShadow: '0 40px 100px -20px rgba(15, 23, 42, 0.4)',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                >
                    {/* Floating Collaboration Nodes */}
                    <FloatingNode delay={0} top="15%" left="5%" size={56} type="circle" opacity={0.4} />
                    <FloatingNode delay={1.5} top="75%" left="15%" size={80} type="square" opacity={0.2} />
                    <FloatingNode delay={0.8} top="20%" left="85%" size={64} type="triangle" opacity={0.3} />
                    <FloatingNode delay={2.2} top="70%" left="90%" size={48} type="circle" opacity={0.2} />

                    <div style={{ position: 'relative', zIndex: 10, maxWidth: '700px', margin: '0 auto' }}>
                        <h2 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.04em',
                            color: '#ffffff',
                            lineHeight: 1.1,
                            marginBottom: '2rem'
                        }}>
                            Start Building Solutions <span style={{ color: 'var(--brand-lime)' }}>That Matter</span>
                        </h2>

                        <p style={{
                            fontSize: '1.125rem',
                            color: 'rgba(255, 255, 255, 0.6)',
                            lineHeight: 1.6,
                            marginBottom: '3.5rem',
                            maxWidth: '540px',
                            margin: '0 auto 3.5rem'
                        }}>
                            Whether you have a problem to share, skills to build, or capital to invest, TWONNECT is the ecosystem for you.
                        </p>

                        <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href="/auth">
                                <button className="btn-get-started" style={{ padding: '1rem 3rem', fontSize: '1.05rem', background: 'var(--brand-lime)', color: 'black' }}>
                                    Get Started Free
                                </button>
                            </Link>
                            <Link href="#explore">
                                <button className="btn-outline" style={{ padding: '1rem 3rem', fontSize: '1.05rem', borderColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}>
                                    Explore Problems
                                </button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
