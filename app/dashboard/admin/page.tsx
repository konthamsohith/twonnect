"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getInboundCollaborationRequests, getOutboundCollaborationRequests, updateCollaborationRequestStatus, CollaborationRequest } from "@/lib/supabase-db";

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
const IconInbox = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>
);
const IconSend = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polyline points="22 2 15 22 11 13 2 9 22 2" /></svg>
);

export default function AdminRequestsPage() {
    const { user } = useAuth();
    const [inboundRequests, setInboundRequests] = useState<CollaborationRequest[]>([]);
    const [outboundRequests, setOutboundRequests] = useState<CollaborationRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [direction, setDirection] = useState<'inbound' | 'outbound'>('inbound');
    const [activeTab, setActiveTab] = useState<'pending' | 'accepted' | 'rejected'>('pending');
    const [selectedRequest, setSelectedRequest] = useState<CollaborationRequest | null>(null);

    const fetchAllRequests = async () => {
        if (!user?.id) return;
        setLoading(true);
        const [inbound, outbound] = await Promise.all([
            getInboundCollaborationRequests(user.id),
            getOutboundCollaborationRequests(user.id)
        ]);
        setInboundRequests(inbound);
        setOutboundRequests(outbound);
        setLoading(false);
    };

    useEffect(() => {
        fetchAllRequests();
    }, [user?.id]);

    const handleAction = async (requestId: number, status: 'accepted' | 'rejected') => {
        const success = await updateCollaborationRequestStatus(requestId, status);
        if (success) {
            setInboundRequests(prev => prev.map(r => r.id === requestId ? { ...r, status } : r));
            if (selectedRequest?.id === requestId) {
                setSelectedRequest({ ...selectedRequest, status });
            }
        }
    };

    const currentRequests = direction === 'inbound' ? inboundRequests : outboundRequests;
    const filteredRequests = currentRequests.filter(r => r.status === activeTab);

    return (
        <div className="admin-page elite-dashboard">
            <header className="page-header">
                <div className="header-icon"><IconShield /></div>
                <div className="header-text">
                    <h1>Network Console</h1>
                    <p>Manage strategic partnerships and inbound/outbound proposals.</p>
                </div>
            </header>

            <div className="direction-toggle">
                <button
                    className={`dir-btn ${direction === 'inbound' ? 'active' : ''}`}
                    onClick={() => { setDirection('inbound'); setActiveTab('pending'); }}
                >
                    <IconInbox /> Inbound Proposals
                </button>
                <button
                    className={`dir-btn ${direction === 'outbound' ? 'active' : ''}`}
                    onClick={() => { setDirection('outbound'); setActiveTab('pending'); }}
                >
                    <IconSend /> Outbound Requests
                </button>
            </div>

            <div className="tabs-container">
                <button
                    className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
                    onClick={() => setActiveTab('pending')}
                >
                    Pending {currentRequests.filter(r => r.status === 'pending').length > 0 && <span className="count-badge">{currentRequests.filter(r => r.status === 'pending').length}</span>}
                </button>
                <button
                    className={`tab-btn ${activeTab === 'accepted' ? 'active' : ''}`}
                    onClick={() => setActiveTab('accepted')}
                >
                    Approved
                </button>
                <button
                    className={`tab-btn ${activeTab === 'rejected' ? 'active' : ''}`}
                    onClick={() => setActiveTab('rejected')}
                >
                    Archive
                </button>
            </div>

            <section className="requests-container">
                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <span>Syncing Registry...</span>
                    </div>
                ) : filteredRequests.length > 0 ? (
                    <div className="requests-grid">
                        {filteredRequests.map((req) => (
                            <div key={req.id} className="request-card" onClick={() => setSelectedRequest(req)}>
                                <div className="card-top">
                                    <div className="proposer-avatar">
                                        {direction === 'inbound' ? (
                                            req.user_avatar_url ? <img src={req.user_avatar_url} alt="" /> : <span>{req.user_full_name?.[0] || 'U'}</span>
                                        ) : (
                                            <span>{req.idea_title?.[0] || 'V'}</span>
                                        )}
                                    </div>
                                    <div className="meta">
                                        <span className="idea-tag">{req.idea_title}</span>
                                        <h3>{direction === 'inbound' ? (req.user_full_name || "Anonymous Founder") : "Venture Partnership"}</h3>
                                    </div>
                                    <div className="time-badge">
                                        {new Date(req.created_at).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="card-preview">
                                    <p>{req.message ? (req.message.length > 100 ? req.message.substring(0, 100) + "..." : req.message) : "No proposal message provided."}</p>
                                </div>

                                {req.status === 'pending' && direction === 'inbound' && (
                                    <div className="card-footer-actions">
                                        <button
                                            className="btn-action-decline"
                                            onClick={(e) => { e.stopPropagation(); handleAction(req.id, 'rejected'); }}
                                        >
                                            Decline
                                        </button>
                                        <button
                                            className="btn-action-accept"
                                            onClick={(e) => { e.stopPropagation(); handleAction(req.id, 'accepted'); }}
                                        >
                                            Authorize
                                        </button>
                                    </div>
                                )}

                                <div className={`view-details-indicator ${req.status !== 'pending' ? 'status-only' : ''}`}>
                                    {req.status === 'pending' ? (direction === 'outbound' ? 'Awaiting node authorization' : 'Review strategic profile') : `Status: ${req.status.toUpperCase()}`}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-requests">
                        <div className="empty-icon"><IconClock /></div>
                        <h3>No {activeTab} registrations</h3>
                        <p>Your network registry has no records in this sector.</p>
                    </div>
                )}
            </section>

            {/* Modal for detail view */}
            {selectedRequest && (
                <div className="modal-overlay" onClick={() => setSelectedRequest(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="mh-left">
                                <div className="proposer-avatar lg">
                                    {direction === 'inbound' ? (
                                        selectedRequest.user_avatar_url ? <img src={selectedRequest.user_avatar_url} alt="" /> : <span>{selectedRequest.user_full_name?.[0] || 'U'}</span>
                                    ) : (
                                        <span>{selectedRequest.idea_title?.[0]}</span>
                                    )}
                                </div>
                                <div className="mh-title">
                                    <h2>{direction === 'inbound' ? (selectedRequest.user_full_name || "Proposer Profile") : "Outbound Proposal"}</h2>
                                    <span className="mh-subtitle">{direction === 'inbound' ? `ID: ${selectedRequest.user_id.slice(0, 12)}...` : `Venture: ${selectedRequest.idea_title}`}</span>
                                </div>
                            </div>
                            <button className="close-btn" onClick={() => setSelectedRequest(null)}><IconX /></button>
                        </div>

                        <div className="modal-body">
                            <div className="detail-section">
                                <label>VENTURE CONTEXT</label>
                                <div className="venture-badge">{selectedRequest.idea_title}</div>
                            </div>

                            <div className="detail-section">
                                <label>STRATEGIC PROPOSAL</label>
                                <div className="proposal-text">
                                    {selectedRequest.message || "No message provided."}
                                </div>
                            </div>

                            <div className="detail-section">
                                <label>REGISTRATION DATE</label>
                                <div className="date-value">{new Date(selectedRequest.created_at).toLocaleString()}</div>
                            </div>

                            <div className="detail-section">
                                <label>NODE STATUS</label>
                                <div className={`status-pill pill-${selectedRequest.status}`}>
                                    {selectedRequest.status.toUpperCase()}
                                </div>
                            </div>

                            {direction === 'outbound' && selectedRequest.status === 'pending' && (
                                <div className="wait-notice">
                                    <IconClock /> Current status is "Awaiting Approval" from the venture owner.
                                </div>
                            )}
                        </div>

                        {selectedRequest.status === 'pending' && direction === 'inbound' && (
                            <div className="modal-footer">
                                <button
                                    className="btn-modal-reject"
                                    onClick={() => handleAction(selectedRequest.id, 'rejected')}
                                >
                                    Decline Proposal
                                </button>
                                <button
                                    className="btn-modal-accept"
                                    onClick={() => handleAction(selectedRequest.id, 'accepted')}
                                >
                                    Approve & Initialize
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style jsx>{`
                .admin-page {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 3rem 2rem;
                    min-height: 100vh;
                }
                .page-header {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    margin-bottom: 3.5rem;
                }
                .header-icon {
                    background: #111827;
                    color: #bbf451;
                    padding: 1.25rem;
                    border-radius: 18px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                }
                .header-text h1 {
                    font-size: 2.5rem;
                    font-weight: 800;
                    color: #111827;
                    letter-spacing: -0.05em;
                    margin: 0;
                    line-height: 1;
                }
                .header-text p {
                    color: #6b7280;
                    margin: 0.5rem 0 0 0;
                    font-size: 1.15rem;
                    font-weight: 500;
                }

                .direction-toggle {
                    display: flex;
                    background: #f1f5f9;
                    padding: 0.4rem;
                    border-radius: 16px;
                    width: fit-content;
                    margin-bottom: 2.5rem;
                    gap: 0.25rem;
                }
                .dir-btn {
                    padding: 0.8rem 1.5rem;
                    border-radius: 12px;
                    border: none;
                    background: transparent;
                    color: #64748b;
                    font-weight: 700;
                    font-size: 0.95rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    transition: all 0.2s;
                }
                .dir-btn.active {
                    background: white;
                    color: #0f172a;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
                }

                .tabs-container {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 2.5rem;
                    border-bottom: 1px solid #e5e7eb;
                    padding-bottom: 0.5rem;
                }
                .tab-btn {
                    padding: 0.75rem 1.5rem;
                    font-size: 0.95rem;
                    font-weight: 700;
                    color: #94a3b8;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    position: relative;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                }
                .tab-btn.active {
                    color: #111827;
                }
                .tab-btn.active::after {
                    content: '';
                    position: absolute;
                    bottom: -0.5rem;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: #111827;
                }
                .count-badge {
                    background: #ef4444;
                    color: white;
                    font-size: 0.7rem;
                    padding: 2px 6px;
                    border-radius: 10px;
                    margin-left: 0.5rem;
                }

                .requests-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
                    gap: 2rem;
                }

                .request-card {
                    background: white;
                    border: 1px solid #e5e7eb;
                    border-radius: 24px;
                    padding: 1.8rem;
                    display: flex;
                    flex-direction: column;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    position: relative;
                }
                .request-card:hover {
                    border-color: #111827;
                    transform: translateY(-8px);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
                }

                .card-top {
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                    margin-bottom: 1.5rem;
                }
                .proposer-avatar {
                    width: 48px;
                    height: 48px;
                    border-radius: 14px;
                    background: #f1f5f9;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    font-weight: 700;
                    color: #1e293b;
                    flex-shrink: 0;
                }
                .proposer-avatar img { width: 100%; height: 100%; object-fit: cover; }
                .proposer-avatar.lg { width: 64px; height: 64px; border-radius: 18px; font-size: 1.5rem; }

                .meta h3 {
                    font-size: 1.15rem;
                    font-weight: 700;
                    color: #1f2937;
                    margin: 0;
                    letter-spacing: -0.02em;
                }
                .idea-tag {
                    font-size: 0.6rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    color: #007aff;
                    background: rgba(0,122,255,0.08);
                    padding: 2px 8px;
                    border-radius: 6px;
                    margin-bottom: 0.4rem;
                    display: inline-block;
                }
                .time-badge {
                    margin-left: auto;
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #9ca3af;
                }

                .card-preview p {
                    font-size: 0.95rem;
                    line-height: 1.6;
                    color: #4b5563;
                    margin: 0;
                }

                .card-footer-actions {
                    margin-top: 1.8rem;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }
                .card-footer-actions button {
                    padding: 0.8rem;
                    border-radius: 12px;
                    font-weight: 700;
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .btn-action-decline {
                    background: transparent;
                    border: 1px solid #e5e7eb;
                    color: #ef4444;
                }
                .btn-action-decline:hover { background: #fef2f2; }
                .btn-action-accept {
                    background: #111827;
                    border: 1px solid #111827;
                    color: white;
                }
                .btn-action-accept:hover { background: #000; }

                .view-details-indicator {
                    margin-top: 1.25rem;
                    text-align: center;
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: #cbd5e1;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                }
                .view-details-indicator.status-only { color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 1rem; }

                /* Modal */
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.6);
                    backdrop-filter: blur(8px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 2rem;
                }
                .modal-content {
                    background: white;
                    width: 100%;
                    max-width: 650px;
                    border-radius: 32px;
                    overflow: hidden;
                    box-shadow: 0 40px 100px -20px rgba(0,0,0,0.2);
                    animation: modalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                @keyframes modalIn {
                    from { transform: scale(0.95) translateY(20px); opacity: 0; }
                    to { transform: scale(1) translateY(0); opacity: 1; }
                }
                .modal-header {
                    padding: 2.5rem;
                    background: #f8fafc;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #e2e8f0;
                }
                .mh-left { display: flex; align-items: center; gap: 1.5rem; }
                .mh-title h2 { font-size: 1.8rem; font-weight: 800; margin: 0; letter-spacing: -0.04em; }
                .mh-subtitle { font-size: 0.85rem; color: #94a3b8; font-weight: 600; }
                .close-btn { background: white; border: 1px solid #e2e8f0; padding: 0.6rem; border-radius: 12px; cursor: pointer; color: #64748b; }

                .modal-body { padding: 2.5rem; }
                .detail-section { margin-bottom: 2rem; }
                .detail-section:last-child { margin-bottom: 0; }
                .detail-section label {
                    display: block;
                    font-size: 0.65rem;
                    font-weight: 900;
                    letter-spacing: 0.1em;
                    color: #94a3b8;
                    margin-bottom: 0.75rem;
                }
                .venture-badge {
                    display: inline-block;
                    padding: 0.5rem 1rem;
                    background: #eff6ff;
                    color: #1d4ed8;
                    border-radius: 10px;
                    font-weight: 700;
                    font-size: 1rem;
                }
                .proposal-text {
                    font-size: 1.1rem;
                    line-height: 1.7;
                    color: #334155;
                    white-space: pre-wrap;
                    background: #f8fafc;
                    padding: 1.5rem;
                    border-radius: 16px;
                    border: 1px solid #f1f5f9;
                }
                .status-pill {
                    display: inline-block;
                    padding: 0.4rem 1rem;
                    border-radius: 8px;
                    font-weight: 800;
                    font-size: 0.75rem;
                }
                .pill-pending { background: #fef3c7; color: #92400e; }
                .pill-accepted { background: #dcfce7; color: #166534; }
                .pill-rejected { background: #fee2e2; color: #991b1b; }
                
                .wait-notice {
                    margin-top: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 1rem;
                    background: #fdfaf2;
                    border: 1px solid #fef3c7;
                    border-radius: 12px;
                    font-size: 0.9rem;
                    color: #92400e;
                    font-weight: 600;
                }

                .modal-footer {
                    padding: 2rem 2.5rem;
                    display: grid;
                    grid-template-columns: 1fr 1.5fr;
                    gap: 1.5rem;
                    background: #f8fafc;
                    border-top: 1px solid #e2e8f0;
                }
                .modal-footer button {
                    padding: 1rem;
                    border-radius: 14px;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .btn-modal-reject {
                    background: white;
                    border: 1px solid #cbd5e1;
                    color: #ef4444;
                }
                .btn-modal-accept {
                    background: #111827;
                    border: none;
                    color: white;
                }

                .empty-requests {
                    text-align: center;
                    padding: 6rem 2rem;
                    background: #f9fafb;
                    border: 2px dashed #e5e7eb;
                    border-radius: 32px;
                    color: #94a3b8;
                }
                .empty-icon { font-size: 3rem; margin-bottom: 1.5rem; opacity: 0.5; }
                .empty-requests h3 { font-size: 1.5rem; color: #475569; margin-bottom: 0.5rem; }

                .loading-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.5rem;
                    padding: 6rem;
                }
                .spinner {
                    width: 40px;
                    height: 40px;
                    border: 4px solid #f3f4f6;
                    border-top: 4px solid #111827;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}
