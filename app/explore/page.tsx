'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardBody, CardFooter } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { mockProblems } from '../data/mock-problems';
import './explore.css';

export default function ExplorePage() {
    const [search, setSearch] = useState('');

    const filteredProblems = mockProblems.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <main className="container explore-page">
            <header className="page-header">
                <div className="header-content">
                    <h1>Explore Problems</h1>
                    <p>Discover real-world challenges waiting to be solved. Find a problem, propose a solution, or join a team.</p>
                </div>
                <div className="header-actions">
                    <Link href="/dump">
                        <Button variant="primary">Dump a Problem</Button>
                    </Link>
                </div>
            </header>

            <div className="search-section">
                <Input
                    placeholder="Search by keyword, industry, or category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="filters">
                    <Button variant="secondary" size="sm">All</Button>
                    <Button variant="ghost" size="sm">Open</Button>
                    <Button variant="ghost" size="sm">In Progress</Button>
                    <Button variant="ghost" size="sm">Solved</Button>
                </div>
            </div>

            <div className="problems-grid">
                {filteredProblems.map(problem => (
                    <Link key={problem.id} href={`/problem/${problem.id}`}>
                        <Card className="problem-card" onClick={() => { }}>
                            <CardHeader>
                                <div className="card-top-meta">
                                    <span className="category-badge">{problem.category}</span>
                                    <span className={`status-indicator status-${problem.status.replace(' ', '-').toLowerCase()}`}>
                                        {problem.status}
                                    </span>
                                </div>
                                <h3>{problem.title}</h3>
                            </CardHeader>
                            <CardBody>
                                <p>{problem.description.length > 120 ? problem.description.substring(0, 120) + '...' : problem.description}</p>
                            </CardBody>
                            <CardFooter>
                                <div className="meta-info">
                                    <span>👍 {problem.upvotes}</span>
                                    <span>💬 {problem.solutionsCount} solutions</span>
                                </div>
                                <div className="author-info">
                                    By {problem.author} <span className="role-tag">{problem.authorRole}</span>
                                </div>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}

                {filteredProblems.length === 0 && (
                    <div className="no-results">
                        <p>No problems found matching your search. Why not dump one?</p>
                        <Link href="/dump"><Button variant="outline">Dump Idea</Button></Link>
                    </div>
                )}
            </div>
        </main>
    );
}
