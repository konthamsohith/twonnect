"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
    {
        question: "What is Idea Platform?",
        answer: "Idea Platform is a hub where founders, builders, and investors collaborate on real-world validated problems. You can submit ideas, find co-builders, and get AI-powered refinement to sharpen your concept.",
    },
    {
        question: "Can I use validated problems to build client projects?",
        answer: "Absolutely! All problems you validate are yours to act on. Many builders go on to pitch solutions to clients or launch startups directly from their validated ideas.",
    },
    {
        question: "Is the community supportive?",
        answer: "Yes! Our community is made up of builders, designers, and domain experts who actively give feedback, join teams, and share resources to help each other succeed.",
    },
    {
        question: "Are there live sessions or just async content?",
        answer: "Both — we run weekly live problem deep-dives and office hours with industry mentors, alongside async tools like AI refinement, builder boards, and problem threads.",
    },
    {
        question: "Are the problems updated regularly?",
        answer: "New validated problems are added every week across categories like AI & Tech, Social Impact, and Open Source. Subscribe to our newsletter to get first access.",
    },
    {
        question: "What makes Idea Platform different from other platforms?",
        answer: "We focus exclusively on real-world, vetted problems—not theoretical exercises. Every listing has been validated for market relevance so you're always building something that matters.",
    },
];

const avatarColors = ["#3b82f6", "#f97316", "#a855f7"];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="faq2-section">
            <div className="faq2-inner container">

                {/* ── Left column ── */}
                <div className="faq2-left">
                    {/* Label */}
                    <div className="faq2-label">
                        <span className="faq2-label-icon">?</span>
                        <span>Faq Hub</span>
                    </div>

                    {/* Heading */}
                    <h2 className="faq2-title">Frequently Asked<br />Questions!</h2>

                    {/* Contact card */}
                    <div className="faq2-card">
                        <h3 className="faq2-card-title">Still Have Questions?</h3>
                        <p className="faq2-card-sub">
                            <Link href="/contact" className="faq2-contact-link">Contact Us</Link>
                            {", "}We are happy to help you
                        </p>
                        <div className="faq2-avatars">
                            {avatarColors.map((c, i) => (
                                <div key={i} className="faq2-avatar" style={{ background: c, zIndex: avatarColors.length - i }} />
                            ))}
                        </div>
                        <Link href="/explore">
                            <button className="faq2-cta">Start Building Now</button>
                        </Link>
                    </div>
                </div>

                {/* ── Right column: accordion ── */}
                <div className="faq2-right">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className={`faq2-item ${openIndex === i ? "faq2-item-open" : ""}`}
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        >
                            <div className="faq2-item-header">
                                <span className="faq2-item-q">{faq.question}</span>
                                <span className="faq2-item-icon">
                                    {openIndex === i ? "−" : "+"}
                                </span>
                            </div>
                            {openIndex === i && (
                                <div className="faq2-item-ans">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
