'use client';

import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card, CardBody } from '../components/Card';
import './dump.css';

export default function DumpPage() {
    const [step, setStep] = useState(1);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [aiFeedback, setAiFeedback] = useState('');

    const handleDump = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description) return;

        setIsAnalyzing(true);
        setStep(2);

        // Mock AI Analysis delay
        setTimeout(() => {
            setAiFeedback(
                "AI Analysis Complete: This is a solid problem statement. To make it more actionable for builders, I suggest narrowing the scope to a specific demographic or industry. I have automatically tagged this as 'Logistics' and 'B2B'."
            );
            setIsAnalyzing(false);
        }, 2500);
    };

    return (
        <main className="container dump-page">
            <header className="page-header text-center">
                <h1>Dump a Problem</h1>
                <p>Spotted a friction point in your daily life? Share it. Our AI agent will help refine it before publishing to the community.</p>
            </header>

            <div className="dump-content">
                <div className="form-container">
                    {step === 1 && (
                        <Card>
                            <CardBody>
                                <form onSubmit={handleDump}>
                                    <Input
                                        label="What's the problem in one short sentence?"
                                        placeholder="e.g., Finding freelance hardware engineers is too hard"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />

                                    <div className="input-wrapper full-width">
                                        <label className="input-label">Elaborate on the pain points</label>
                                        <textarea
                                            className="base-input textarea"
                                            rows={6}
                                            placeholder="Why is it hard? What are the current workarounds? Who else suffers from this?"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>

                                    <Button type="submit" variant="primary" fullWidth size="lg">Analyze & Refine Idea</Button>
                                </form>
                            </CardBody>
                        </Card>
                    )}

                    {step === 2 && (
                        <div className="ai-analysis-flow">
                            <Card className="mb-4">
                                <CardBody>
                                    <h3>Your Original Submission</h3>
                                    <p><strong>{title}</strong></p>
                                    <p className="text-muted">{description}</p>
                                </CardBody>
                            </Card>

                            {isAnalyzing ? (
                                <div className="loading-state">
                                    <div className="spinner"></div>
                                    <p>AI Agent is analyzing market potential and refining your statement...</p>
                                </div>
                            ) : (
                                <Card className="ai-feedback-card">
                                    <CardBody>
                                        <div className="ai-header">
                                            <span className="ai-icon">✨</span>
                                            <h3>AI Refinement Suggestions</h3>
                                        </div>
                                        <p className="ai-feedback-text">{aiFeedback}</p>

                                        <div className="action-buttons">
                                            <Button variant="outline" onClick={() => setStep(1)}>Edit Original</Button>
                                            <Button variant="primary">Publish to Marketplace</Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
