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
        <section className="landing-section" style={{ padding: '4rem 1.5rem 8rem' }}>
            <div className="container" style={{ padding: 0 }}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        position: 'relative',
                        background: 'var(--primary)', // Midnight Navy centerpiece
                        borderRadius: '24px',
                        overflow: 'hidden',
                        padding: '7rem 2rem',
                        textAlign: 'center',
                        boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.3)',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}
                >
                    {/* Subtle Dot Matrix Pattern */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0.15,
                        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                        pointerEvents: 'none'
                    }} />

                    {/* Floating Collaboration Nodes */}
                    <FloatingNode delay={0} top="15%" left="10%" size={48} type="circle" opacity={0.6} />
                    <FloatingNode delay={1.5} top="65%" left="15%" size={72} type="square" opacity={0.4} />
                    <FloatingNode delay={0.8} top="25%" left="82%" size={56} type="triangle" opacity={0.5} />
                    <FloatingNode delay={2.2} top="70%" left="88%" size={40} type="circle" opacity={0.3} />

                    <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.04em',
                            color: '#ffffff',
                            lineHeight: 1.1,
                            marginBottom: '1.5rem'
                        }}>
                            Start Building Solutions <span style={{ color: 'var(--accent)' }}>That Matter</span>
                        </h2>

                        <p style={{
                            fontSize: '1.25rem',
                            color: 'rgba(255,255,255,0.7)',
                            lineHeight: 1.6,
                            marginBottom: '3rem',
                            fontWeight: 400,
                            maxWidth: '600px',
                            margin: '0 auto 3rem'
                        }}>
                            Whether you have a problem to share, skills to build, or capital to invest, TWONNECT is the ecosystem for you.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href="/auth">
                                <motion.button
                                    whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(245, 158, 11, 0.4)' }}
                                    whileTap={{ y: 0 }}
                                    style={{
                                        background: 'var(--accent)',
                                        color: '#ffffff',
                                        borderRadius: '8px',
                                        padding: '1rem 2.5rem',
                                        fontWeight: 600,
                                        fontSize: '1.05rem',
                                        border: '1px solid var(--accent)',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.2s',
                                    }}
                                >
                                    Get Started
                                </motion.button>
                            </Link>
                            <Link href="#explore">
                                <motion.button
                                    whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                    whileTap={{ y: 0 }}
                                    style={{
                                        background: 'transparent',
                                        color: '#ffffff',
                                        borderRadius: '8px',
                                        padding: '1rem 2.5rem',
                                        fontWeight: 500,
                                        fontSize: '1.05rem',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        cursor: 'pointer',
                                        backdropFilter: 'blur(4px)',
                                        transition: 'border-color 0.2s, background-color 0.2s',
                                    }}
                                >
                                    Explore Problems
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
