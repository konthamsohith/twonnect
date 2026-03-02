"use client";

import { useState } from "react";

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "Do I have to give up equity to post a problem?",
        answer: "No. Posting problems is completely free. If a team builds a solution to your problem, they own the equity, but may offer you an advisory role or equity based on your continued involvement."
    },
    {
        question: "How does the AI Refinement work?",
        answer: "When you dump a problem, our LLM agent analyzes the text, asks clarifying questions, and structures it into a technical requirements doc for builders to consume."
    },
    {
        question: "Who can join the Builder directory?",
        answer: "Anyone! Whether you are a full-stack engineer, a UX designer, or a domain-expert researcher, you can create a profile and join teams working on validated problems."
    },
    {
        question: "How are investors integrated into the platform?",
        answer: "Startups that form around validated problems are showcased in the Investor Hub. Investors can view traction metrics, team composition, and directly request meetings within the platform."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="faq-container">
            {faqs.map((faq, index) => (
                <div
                    key={index}
                    className={`faq-item ${openIndex === index ? 'open' : ''}`}
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                    <div className="faq-question">
                        <h4>{faq.question}</h4>
                        <span className="faq-toggle">{openIndex === index ? '−' : '+'}</span>
                    </div>
                    {openIndex === index && (
                        <div className="faq-answer">
                            <p>{faq.answer}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
