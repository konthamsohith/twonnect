"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getInboundCollaborationRequests, updateCollaborationRequestStatus, CollaborationRequest } from "@/lib/supabase-db";

const IconCheck = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);
const IconX = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
);
const IconClock = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);
const IconShield = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
);

export default function AdminRequestsPage() {
    const { user } = useAuth();
    const [requests, setRequests] = useState<CollaborationRequest[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        if (!user?.id) return;
        setLoading(true);
        const data = await getInboundCollaborationRequests(user.id);
        setRequests(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchRequests();
    }, [user?.id]);

    const handleAction = async (requestId: number, status: 'accepted' | 'rejected') => {
        const success = await updateCollaborationRequestStatus(requestId, status);
        if (success) {
            setRequests(prev => prev.filter(r => r.id !== requestId));
        }
    };

    return (
        <div className="admin-page elite-dashboard">
            <header className="page-header">
                <div className="header-icon"><IconShield /></div>
                <div>
                    <h1>Collaboration Requests</h1>
                    <p>Manage partnership proposals for your ventures.</p>
                </div>
            </header>

            <section className="requests-container">
                {loading ? (
                    <div className="loading-state">Syncing secure registry...</div>
                ) : requests.length > 0 ? (
                    <div className="requests-grid">
                        {requests.map((req) => (
                            <div key={req.id} className="request-card">
                                <div className="card-header">
                                    <div className="idea-info">
                                        <span className="idea-tag">Venture Node</span>
                                        <h3>{req.idea_title}</h3>
                                    </div>
                                    <div className="time-meta">
                                        <IconClock /> {new Date(req.created_at).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="request-body">
                                    <div className="user-info">
                                        <span className="label">PROPOSER ID</span>
                                        <span className="value">{req.user_id.slice(0, 8)}...</span>
                                    </div>
                                    <div className="proposal-content">
                                        <span className="label">STRATEGIC PROPOSAL</span>
                                        <p>{req.message || "No proposal message provided."}</p>
                                    </div>
                                </div>

                                <div className="card-actions">
                                    <button
                                        className="btn-reject"
                                        onClick={() => handleAction(req.id, 'rejected')}
                                    >
                                        <IconX /> Decline
                                    </button>
                                    <button
                                        className="btn-accept"
                                        onClick={() => handleAction(req.id, 'accepted')}
                                    >
                                        <IconCheck /> Authorize
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-requests">
                        <IconClock />
                        <h3>Queue Cleared</h3>
                        <p>No pending collaboration requests found for your registry.</p>
                    </div>
                )}
            </section>

            <style jsx>{`
                .admin-page {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2rem;
                }
                .page-header {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    margin-bottom: 3rem;
                }
                .header-icon {
                    background: #111827;
                    color: #bbf451;
                    padding: 1rem;
                    border-radius: 14px;
                }
                .page-header h1 {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #111827;
                    letter-spacing: -0.04em;
                    margin: 0;
                }
                .page-header p {
                    color: #6b7280;
                    margin: 0.2rem 0 0 0;
                    font-size: 1.1rem;
                }

                .requests-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
                    gap: 1.5rem;
                }

                .request-card {
                    background: white;
                    border: 1px solid #e5e7eb;
                    border-radius: 20px;
                    padding: 1.8rem;
                    display: flex;
                    flex-direction: column;
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .request-card:hover {
                    box-shadow: 0 20px 40px -15px rgba(0,0,0,0.05);
                }

                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1.5rem;
                }
                .idea-tag {
                    font-size: 0.65rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    color: #007aff;
                    background: rgba(0,122,255,0.05);
                    padding: 2px 8px;
                    border-radius: 6px;
                    margin-bottom: 0.5rem;
                    display: inline-block;
                }
                .idea-info h3 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #111827;
                    margin: 0;
                    letter-spacing: -0.02em;
                }
                .time-meta {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    font-size: 0.8rem;
                    color: #9ca3af;
                    font-weight: 600;
                }

                .request-body {
                    flex-grow: 1;
                    margin-bottom: 2rem;
                }
                .label {
                    display: block;
                    font-size: 0.65rem;
                    font-weight: 800;
                    color: #9ca3af;
                    letter-spacing: 0.05em;
                    margin-bottom: 0.4rem;
                }
                .user-info { margin-bottom: 1.25rem; }
                .value {
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: #4b5563;
                }
                .proposal-content p {
                    font-size: 1rem;
                    line-height: 1.6;
                    color: #374151;
                    margin: 0;
                }

                .card-actions {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }
                .card-actions button {
                    padding: 0.9rem;
                    border-radius: 12px;
                    font-weight: 700;
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.6rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .btn-reject {
                    background: transparent;
                    border: 1px solid #e5e7eb;
                    color: #ef4444;
                }
                .btn-reject:hover {
                    background: #fef2f2;
                    border-color: #fee2e2;
                }
                .btn-accept {
                    background: #111827;
                    border: 1px solid #111827;
                    color: white;
                }
                .btn-accept:hover {
                    background: #000;
                }

                .empty-requests {
                    text-align: center;
                    padding: 5rem 2rem;
                    background: #fafafa;
                    border: 2px dashed #e5e7eb;
                    border-radius: 30px;
                    color: #9ca3af;
                }
                .empty-requests h3 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #4b5563;
                    margin: 1.5rem 0 0.5rem;
                }
                .loading-state {
                    text-align: center;
                    padding: 4rem;
                    color: #6b7280;
                    font-weight: 600;
                    letter-spacing: 0.05em;
                }
            `}</style>
        </div>
    );
}
