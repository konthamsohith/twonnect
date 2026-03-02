import React from 'react';
import { mockBuilders } from '../data/mock-users';
import { Card, CardHeader, CardBody, CardFooter } from '../components/Card';
import { Button } from '../components/Button';
import './builders.css';

export default function BuildersPage() {
    return (
        <main className="container builders-page">
            <header className="page-header text-center">
                <h1>Builder Directory</h1>
                <p>Find co-founders, collaborators, and experts ready to turn real-world problems into scalable products.</p>
                <div className="header-actions">
                    <Button variant="primary">Create Builder Profile</Button>
                </div>
            </header>

            <div className="builders-grid">
                {mockBuilders.map(builder => (
                    <Card key={builder.id} className="builder-card">
                        <CardHeader>
                            <div className="builder-header">
                                <div className="avatar-placeholder">{builder.name.charAt(0)}</div>
                                <div>
                                    <h3>{builder.name}</h3>
                                    <span className="role-badge">{builder.role}</span>
                                    {builder.availableForTeams && <span className="availability-badge">Looking for Team</span>}
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <p className="bio">{builder.bio}</p>
                            <div className="skills-container">
                                {builder.skills.map(skill => (
                                    <span key={skill} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </CardBody>
                        <CardFooter>
                            <div className="stats">
                                <span>🚀 {builder.projectsContributed} Projects</span>
                            </div>
                            <Button variant="outline" size="sm">Invite to Collaborate</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </main>
    );
}
