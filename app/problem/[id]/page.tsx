import React from 'react';
import { mockProblems } from '../../data/mock-problems';
import { Button } from '../../components/Button';
import { Card, CardBody, CardHeader } from '../../components/Card';
import './problem.css';

export default async function ProblemDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const problem = mockProblems.find(p => p.id === id);

    if (!problem) {
        return <main className="container"><h2>Problem not found</h2></main>;
    }

    return (
        <main className="container problem-details-page">
            <div className="problem-header">
                <div className="meta-pills">
                    <span className="category-pill">{problem.category}</span>
                    <span className="status-pill">{problem.status}</span>
                </div>
                <h1>{problem.title}</h1>
                <div className="author-details">
                    Posted by <strong>{problem.author}</strong> ({problem.authorRole}) on {new Date(problem.createdAt).toLocaleDateString()}
                </div>
            </div>

            <div className="problem-content-layout">
                <div className="main-col">
                    <section className="problem-description card">
                        <h2>The Challenge</h2>
                        <p className="description-text">{problem.description}</p>
                    </section>

                    <section className="solutions-section">
                        <div className="section-header">
                            <h2>Proposed Solutions ({problem.solutionsCount})</h2>
                            <Button variant="primary" size="sm">Pitch a Solution</Button>
                        </div>
                        {/* Mock Solutions */}
                        <div className="solutions-list">
                            <Card className="solution-card">
                                <CardHeader>
                                    <div className="solution-meta">
                                        <h4>Hardware Starter Kit Strategy</h4>
                                        <span className="builder-name">Alex M. · Builder</span>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <p>A marketplace specifically indexing verified engineers with portoflios on CAD and PCB design...</p>
                                </CardBody>
                            </Card>
                        </div>
                    </section>
                </div>

                <div className="side-col">
                    <Card>
                        <CardHeader><h3>AI Insight</h3></CardHeader>
                        <CardBody>
                            <p className="ai-text">
                                <strong>Market Potential:</strong> High<br />
                                <strong>Target Audience:</strong> Hardware startups, independent engineers.<br />
                                <strong>Complexity:</strong> Medium
                            </p>
                            <Button variant="outline" fullWidth>Generate Step-by-Step Plan</Button>
                        </CardBody>
                    </Card>

                    <Card className="mt-4">
                        <CardHeader><h3>Engagement</h3></CardHeader>
                        <CardBody>
                            <div className="engagement-stats">
                                <div className="stat">👍 {problem.upvotes} Upvotes</div>
                                <div className="stat">👀 420 Views</div>
                            </div>
                            <Button variant="secondary" fullWidth className="mt-4">Upvote Problem</Button>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </main>
    );
}
