"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function StatsSection() {
    return (
        <section className="stats-section" style={{ padding: '6rem 1rem', background: 'var(--brand-navy)', color: 'white' }}>
            <div className="container">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                    <AnimatedCounter value={4200} label="Problems Posted" />
                    <AnimatedCounter value={140} label="Builder Teams" />
                    <AnimatedCounter value={75} label="Startups Created" />
                    <AnimatedCounter value={300} label="Active Investors" />
                </div>
            </div>
        </section>
    );
}

function AnimatedCounter({ value, label }: { value: number; label: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const duration = 2000;
            const incrementTime = (duration / end) * 5;

            const timer = setInterval(() => {
                start += Math.ceil(end / 100);
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(start);
                }
            }, incrementTime);
            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }}
            className="stat-box"
            style={{ background: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}
        >
            <div className="stat-number" style={{ color: 'var(--brand-lime)' }}>{count.toLocaleString()}{value > 100 ? '+' : ''}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{label}</div>
        </motion.div>
    );
}
