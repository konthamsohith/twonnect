import React from 'react';
import { mockStartups } from '../data/mock-startups';
import { Card, CardHeader, CardBody, CardFooter } from '../components/Card';
import { Button } from '../components/Button';
import './investors.css';

export default function InvestorsPage() {
    return (
        <main className="container investors-page">
            <header className="page-header text-center">
                <h1>Investor Hub</h1>
                <p>Discover early-stage startups that were born from real, validated problems.</p>
            </header>

            <div className="metrics-overview">
                <div className="metric-box">
                    <h3>12</h3>
                    <p>Startups Funded</p>
                </div>
                <div className="metric-box">
                    <h3>$2.4M</h3>
                    <p>Capital Deployed</p>
                </div>
                <div className="metric-box">
                    <h3>A.I. Vetted</h3>
                    <p>All pitches are verified against problem traction</p>
                </div>
            </div>

            <div className="startups-grid mt-4">
                {mockStartups.map(startup => (
                    <Card key={startup.id} className="startup-card border-glow">
                        <CardHeader>
                            <div className="startup-header">
                                <h3>{startup.name}</h3>
                                <span className={`stage-badge stage-${startup.stage.toLowerCase()}`}>{startup.stage}</span>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <p className="tagline">{startup.tagline}</p>
                            <div className="traction-box">
                                <strong>Traction:</strong> {startup.traction}
                            </div>
                            <div className="team-info mt-4">
                                <span className="text-muted">Team size: {startup.teamSize} · </span>
                                {startup.seekingFunding && <span className="funding-tag">Seeking Seed Funding</span>}
                            </div>
                        </CardBody>
                        <CardFooter>
                            <Button variant="primary" fullWidth>Request Deck & Meeting</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </main>
    );
}
