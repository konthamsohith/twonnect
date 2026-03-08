"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

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
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="stat-box"
        >
            <div className="stat-number">{count}{value > 100 ? '+' : ''}</div>
            <div className="stat-label" style={{ color: 'var(--primary)' }}>{label}</div>
        </motion.div>
    );
}

export default function StatsSection() {
    return (
        <section className="landing-section">
            <div className="container">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                    <AnimatedCounter value={4200} label="Problems Posted" />
                    <AnimatedCounter value={140} label="Builder Teams" />
                    <AnimatedCounter value={75} label="Startups Created" />
                    <AnimatedCounter value={300} label="Active Investors" />
                </div>
            </div>
        </section>
    );
}
