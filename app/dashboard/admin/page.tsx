"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getInboundCollaborationRequests, getOutboundCollaborationRequests, updateCollaborationRequestStatus, CollaborationRequest } from "@/lib/supabase-db";

const IconCheck = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);
const IconX = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
);
const IconClock = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);
const IconInbox = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>
);
const IconSend = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polyline points="22 2 15 22 11 13 2 9 22 2" /></svg>
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
        try {
            const [inbound, outbound] = await Promise.all([
                getInboundCollaborationRequests(user.id),
                getOutboundCollaborationRequests(user.id)
            ]);
            setInboundRequests(inbound);
            setOutboundRequests(outbound);
        } catch (err) {
            console.error("Error fetching console records:", err);
        } finally {
            setLoading(false);
        }
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
        <div className="network-console-integrated">
            <header className="portal-header">
                <div className="exclusive-pill">STRATEGIC OPERATIONS</div>
                <h1>Network Console</h1>
                <p>Manage strategic partnerships and inbound/outbound proposals.</p>
            </header>

            <div className="console-layout">
                {/* ── SIDEBAR LEDGER CONTROLS ── */}
                <aside className="ledger-sidebar">
                    <div className="ledger-group">
                        <label className="ledger-label">INTERACTION PLANE</label>
                        <nav className="ledger-nav">
                            <button
                                className={`ledger-btn ${direction === 'inbound' ? 'active' : ''}`}
                                onClick={() => { setDirection('inbound'); setActiveTab('pending'); }}
                            >
                                <IconInbox /> <span>Inbound Proposals</span>
                            </button>
                            <button
                                className={`ledger-btn ${direction === 'outbound' ? 'active' : ''}`}
                                onClick={() => { setDirection('outbound'); setActiveTab('pending'); }}
                            >
                                <IconSend /> <span>Outbound Requests</span>
                            </button>
                        </nav>
                    </div>

                    <div className="ledger-group">
                        <label className="ledger-label">REGISTRY STATUS</label>
                        <nav className="ledger-nav-flat">
                            <button
                                className={`flat-btn ${activeTab === 'pending' ? 'active' : ''}`}
                                onClick={() => setActiveTab('pending')}
                            >
                                <span>Pending</span>
                                {direction === 'inbound' && inboundRequests.filter(r => r.status === 'pending').length > 0 &&
                                    <span className="ledger-badge">{inboundRequests.filter(r => r.status === 'pending').length}</span>
                                }
                            </button>
                            <button
                                className={`flat-btn ${activeTab === 'accepted' ? 'active' : ''}`}
                                onClick={() => setActiveTab('accepted')}
                            >
                                Approved
                            </button>
                            <button
                                className={`flat-btn ${activeTab === 'rejected' ? 'active' : ''}`}
                                onClick={() => setActiveTab('rejected')}
                            >
                                Archive
                            </button>
                        </nav>
                    </div>
                </aside>

                {/* ── MAIN LEDGER VIEW ── */}
                <main className="ledger-main">
                    <div className="ledger-head">
                        <h2 className="ledger-title">
                            {direction === 'inbound' ? 'Incoming Proposals' : 'Outgoing Requests'}
                        </h2>
                        <div className="ledger-path">/ {activeTab.toUpperCase()}</div>
                    </div>

                    {loading ? (
                        <div className="ledger-loading">
                            <div className="spinner"></div>
                            <span>Syncing Ledger...</span>
                        </div>
                    ) : filteredRequests.length > 0 ? (
                        <div className="ledger-list">
                            {filteredRequests.map((req) => (
                                <div key={req.id} className="ledger-row" onClick={() => setSelectedRequest(req)}>
                                    <div className="ledger-col-avatar">
                                        <div className="avatar-box">
                                            {direction === 'inbound' ? (
                                                req.user_avatar_url ? <img src={req.user_avatar_url} alt="" /> : <span>{req.user_full_name?.[0] || 'U'}</span>
                                            ) : (
                                                <span>{req.idea_title?.[0] || 'V'}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="ledger-col-identity">
                                        <div className="mono-id">#{req.id.toString().padStart(4, '0')}</div>
                                        <h3 className="ledger-row-title">{req.idea_title}</h3>
                                        <div className="ledger-row-subtitle">
                                            {direction === 'inbound' ? (req.user_full_name || "Verified Founder") : "External Venture Node"}
                                        </div>
                                    </div>

                                    <div className="ledger-col-preview">
                                        <p className="preview-text">{req.message || "No execution details provided for this synchronization."}</p>
                                    </div>

                                    <div className="ledger-col-status">
                                        <div className="ledger-time">{new Date(req.created_at).toLocaleDateString()}</div>
                                        <div className={`ledger-status-pill ${req.status}`}>
                                            {req.status}
                                        </div>
                                    </div>

                                    <div className="ledger-col-actions" onClick={e => e.stopPropagation()}>
                                        {req.status === 'pending' && direction === 'inbound' ? (
                                            <>
                                                <button className="icon-action approve" title="Approve" onClick={() => handleAction(req.id, 'accepted')}><IconCheck /></button>
                                                <button className="icon-action reject" title="Reject" onClick={() => handleAction(req.id, 'rejected')}><IconX /></button>
                                            </>
                                        ) : (
                                            <div className="view-indicator">View</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="ledger-empty">
                            <IconClock />
                            <h3>Empty Registry Segment</h3>
                            <p>{activeTab === 'pending' ? 'No pending registrations' : `Your network registry has no records in this sector.`}</p>
                        </div>
                    )}
                </main>
            </div>

            {/* ── PRECISION MODAL ── */}
            {selectedRequest && (
                <div className="ledger-modal-overlay" onClick={() => setSelectedRequest(null)}>
                    <div className="ledger-modal" onClick={e => e.stopPropagation()}>
                        <button className="ledger-modal-close" onClick={() => setSelectedRequest(null)}><IconX /></button>

                        <div className="modal-top">
                            <div className="modal-avatar">
                                {direction === 'inbound' ? (
                                    selectedRequest.user_avatar_url ? <img src={selectedRequest.user_avatar_url} alt="" /> : <span>{selectedRequest.user_full_name?.[0]}</span>
                                ) : (
                                    <span>{selectedRequest.idea_title?.[0]}</span>
                                )}
                            </div>
                            <div className="modal-title-area">
                                <label className="modal-label-mono">NODE ID: {selectedRequest.id.toString().padStart(6, '0')}</label>
                                <h2>{selectedRequest.idea_title}</h2>
                                <p>Origin: {direction === 'inbound' ? (selectedRequest.user_full_name || "Inbound Founder") : "Outbound Operational Request"}</p>
                            </div>
                        </div>

                        <div className="modal-grid">
                            <div className="modal-section full">
                                <label className="modal-label-mono">PAYLOAD CONTENT</label>
                                <div className="payload-surface">
                                    {selectedRequest.message || "No detailed message provided."}
                                </div>
                            </div>

                            <div className="modal-section">
                                <label className="modal-label-mono">TIMESTAMP</label>
                                <div className="modal-data">{new Date(selectedRequest.created_at).toLocaleString()}</div>
                            </div>

                            <div className="modal-section">
                                <label className="modal-label-mono">NODE STATUS</label>
                                <div className={`modal-status ${selectedRequest.status}`}>
                                    {selectedRequest.status.toUpperCase()}
                                </div>
                            </div>
                        </div>

                        {selectedRequest.status === 'pending' && direction === 'inbound' && (
                            <div className="modal-footer">
                                <button className="ledger-btn-main reject" onClick={() => handleAction(selectedRequest.id, 'rejected')}>Decline Node</button>
                                <button className="ledger-btn-main approve" onClick={() => handleAction(selectedRequest.id, 'accepted')}>Approve & Sync</button>
                            </div>
                        )}

                        {direction === 'outbound' && selectedRequest.status === 'pending' && (
                            <div className="modal-notice">
                                <IconClock /> <span>Node awaiting synchronization from the target venture lead.</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style jsx>{`
                .network-console-integrated {
                    padding: 0;
                    margin: 0;
                    min-height: 100vh;
                    background: white;
                    display: flex;
                    flex-direction: column;
                }

                .portal-header {
                    background: white;
                    padding: 3rem;
                    border-bottom: 1px solid #e2e8f0;
                    margin-bottom: 0;
                }

                .portal-header h1 {
                    font-family: var(--font-geist-sans);
                    font-size: 32px;
                    font-weight: 600;
                    letter-spacing: -0.04em;
                    color: #111827;
                    margin: 1rem 0 0.5rem;
                }

                .portal-header p {
                    color: #64748b;
                    font-size: 1.1rem;
                    font-weight: 500;
                }

                .exclusive-pill {
                    display: inline-block;
                    font-family: var(--font-geist-mono);
                    font-size: 0.65rem;
                    font-weight: 800;
                    color: #111827;
                    background: #bbf451;
                    padding: 4px 10px;
                    border-radius: 4px;
                    letter-spacing: 0.1em;
                }

                /* ── LAYOUT ── */
                .console-layout {
                    display: grid;
                    grid-template-columns: 260px 1fr;
                    gap: 0;
                    background: white;
                    overflow: hidden;
                    border-top: 1px solid #e2e8f0;
                    flex: 1;
                }

                /* ── SIDEBAR ── */
                .ledger-sidebar {
                    background: #fcfcfd;
                    padding: 2.5rem 1.5rem;
                    border-right: 1px solid #e2e8f0;
                    display: flex;
                    flex-direction: column;
                    gap: 3rem;
                }

                .ledger-label {
                    display: block;
                    font-family: var(--font-geist-mono);
                    font-size: 0.6rem;
                    font-weight: 800;
                    color: #94a3b8;
                    letter-spacing: 0.15em;
                    margin-bottom: 1rem;
                }

                .ledger-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .ledger-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.875rem 1rem;
                    border-radius: 10px;
                    border: 1px solid transparent;
                    background: transparent;
                    color: #64748b;
                    font-weight: 600;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-align: left;
                }

                .ledger-btn:hover {
                    background: #f8fafc;
                    color: #111827;
                }

                .ledger-btn.active {
                    background: #111827;
                    color: white;
                    border-color: #111827;
                }

                .ledger-nav-flat {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .flat-btn {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.75rem 1rem;
                    border-radius: 8px;
                    background: transparent;
                    border: none;
                    color: #64748b;
                    font-weight: 600;
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .flat-btn:hover {
                    color: #111827;
                    background: #f1f5f9;
                }

                .flat-btn.active {
                    color: #111827;
                    background: #e2e8f0;
                }

                .ledger-badge {
                    background: #ef4444;
                    color: white;
                    font-size: 0.65rem;
                    font-weight: 800;
                    padding: 2px 6px;
                    border-radius: 20px;
                }

                /* ── MAIN LEDGER ── */
                .ledger-main {
                    padding: 2.5rem 3rem;
                    min-height: 600px;
                }

                .ledger-head {
                    display: flex;
                    align-items: baseline;
                    gap: 1rem;
                    margin-bottom: 2.5rem;
                }

                .ledger-title {
                    font-family: var(--font-geist-sans);
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #111827;
                    margin: 0;
                    letter-spacing: -0.02em;
                }

                .ledger-path {
                    font-family: var(--font-geist-mono);
                    font-size: 0.8rem;
                    color: #94a3b8;
                    font-weight: 600;
                }

                .ledger-list {
                    display: flex;
                    flex-direction: column;
                }

                .ledger-row {
                    display: grid;
                    grid-template-columns: 80px 240px 1fr 140px 100px;
                    align-items: center;
                    padding: 1.5rem 0;
                    border-bottom: 1px solid #f1f5f9;
                    cursor: pointer;
                    transition: background 0.2s;
                }

                .ledger-row:hover {
                    background: #fbfcfd;
                }

                .avatar-box {
                    width: 48px;
                    height: 48px;
                    background: #f1f5f9;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    color: #475569;
                    overflow: hidden;
                    border: 1px solid #e2e8f0;
                }
                .avatar-box img { width: 100%; height: 100%; object-fit: cover; }

                .mono-id {
                    font-family: var(--font-geist-mono);
                    font-size: 0.65rem;
                    color: #94a3b8;
                    margin-bottom: 4px;
                }

                .ledger-row-title {
                    font-family: var(--font-geist-sans);
                    font-size: 1rem;
                    font-weight: 600;
                    color: #111827;
                    margin: 0;
                }

                .ledger-row-subtitle {
                    font-size: 0.8rem;
                    color: #64748b;
                }

                .preview-text {
                    font-size: 0.95rem;
                    color: #475569;
                    margin: 0;
                    padding-right: 2rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .ledger-time {
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #94a3b8;
                    margin-bottom: 6px;
                }

                .ledger-status-pill {
                    display: inline-block;
                    font-size: 0.65rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    padding: 4px 10px;
                    border-radius: 6px;
                }
                .ledger-status-pill.pending { background: #fffbeb; color: #b45309; }
                .ledger-status-pill.accepted { background: #f0fdf4; color: #15803d; }
                .ledger-status-pill.rejected { background: #fef2f2; color: #b91c1c; }

                .ledger-col-actions {
                    display: flex;
                    gap: 0.75rem;
                    justify-content: flex-end;
                }

                .icon-action {
                    width: 36px;
                    height: 36px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #e2e8f0;
                    background: white;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .icon-action.approve { color: #10b981; }
                .icon-action.approve:hover { background: #f0fdf4; border-color: #10b981; }
                .icon-action.reject { color: #ef4444; }
                .icon-action.reject:hover { background: #fef2f2; border-color: #ef4444; }

                .view-indicator {
                    font-size: 0.65rem;
                    font-weight: 700;
                    color: #cbd5e1;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                /* ── EMPTY & LOADING ── */
                .ledger-empty {
                    text-align: center;
                    padding: 8rem 2rem;
                    color: #94a3b8;
                }
                .ledger-empty h3 { color: #111827; margin: 1.5rem 0 0.5rem; }
                
                .ledger-loading {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.5rem;
                    padding: 6rem;
                    color: #64748b;
                }
                .spinner {
                    width: 32px;
                    height: 32px;
                    border: 2px solid #f1f5f9;
                    border-top: 2px solid #111827;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }

                /* ── MODAL ── */
                .ledger-modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 23, 42, 0.4);
                    backdrop-filter: blur(8px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 2rem;
                }

                .ledger-modal {
                    background: white;
                    width: 100%;
                    max-width: 680px;
                    border-radius: 28px;
                    padding: 3.5rem;
                    position: relative;
                    box-shadow: 0 40px 100px -20px rgba(0,0,0,0.15);
                    animation: modalPull 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                @keyframes modalPull {
                    from { opacity: 0; transform: translateY(20px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                .ledger-modal-close {
                    position: absolute;
                    top: 1.5rem;
                    right: 1.5rem;
                    width: 40px;
                    height: 40px;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    background: #f8fafc;
                    color: #64748b;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .modal-top {
                    display: flex;
                    gap: 2rem;
                    align-items: center;
                    margin-bottom: 3.5rem;
                    padding-bottom: 2rem;
                    border-bottom: 1px solid #f1f5f9;
                }

                .modal-avatar {
                    width: 72px;
                    height: 72px;
                    border-radius: 20px;
                    background: #f1f5f9;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.75rem;
                    font-weight: 800;
                    border: 1px solid #e2e8f0;
                    overflow: hidden;
                }

                .modal-label-mono {
                    display: block;
                    font-family: var(--font-geist-mono);
                    font-size: 0.65rem;
                    font-weight: 800;
                    color: #94a3b8;
                    letter-spacing: 0.1em;
                    margin-bottom: 4px;
                }

                .modal-title-area h2 {
                    font-family: var(--font-geist-sans);
                    font-size: 1.75rem;
                    font-weight: 600;
                    color: #111827;
                    margin: 0 0 0.5rem 0;
                    letter-spacing: -0.02em;
                }

                .modal-title-area p {
                    margin: 0;
                    color: #64748b;
                    font-weight: 500;
                }

                .modal-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2.5rem;
                }

                .modal-section.full { grid-column: span 2; }

                .payload-surface {
                    background: #f8fafc;
                    border: 1px solid #f1f5f9;
                    padding: 2rem;
                    border-radius: 20px;
                    font-size: 1.1rem;
                    line-height: 1.7;
                    color: #1e293b;
                }

                .modal-data {
                    font-size: 1.15rem;
                    font-weight: 600;
                    color: #111827;
                }

                .modal-status {
                    display: inline-block;
                    font-size: 0.8rem;
                    font-weight: 800;
                    padding: 6px 12px;
                    border-radius: 8px;
                }
                .modal-status.pending { background: #fff7ed; color: #c2410c; }
                .modal-status.accepted { background: #f0fdf4; color: #166534; }
                .modal-status.rejected { background: #fef2f2; color: #991b1b; }

                .modal-footer {
                    display: grid;
                    grid-template-columns: 1fr 1.5fr;
                    gap: 1.5rem;
                    margin-top: 4rem;
                }

                .ledger-btn-main {
                    padding: 1.25rem;
                    border-radius: 16px;
                    font-weight: 700;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .ledger-btn-main.reject {
                    background: white;
                    border: 1px solid #e2e8f0;
                    color: #ef4444;
                }
                .ledger-btn-main.reject:hover { background: #fef2f2; border-color: #ef4444; }

                .ledger-btn-main.approve {
                    background: #111827;
                    border: none;
                    color: white;
                }
                .ledger-btn-main.approve:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }

                .modal-notice {
                    margin-top: 3rem;
                    display: flex;
                    gap: 0.75rem;
                    padding: 1rem;
                    background: #fdfaf2;
                    border: 1px solid #fef3c7;
                    border-radius: 12px;
                    font-size: 0.9rem;
                    color: #92400e;
                }

                @media (max-width: 1100px) {
                    .console-layout { grid-template-columns: 1fr; }
                    .ledger-sidebar { position: static; flex-direction: row; border-right: none; border-bottom: 1px solid #e2e8f0; }
                    .ledger-row { grid-template-columns: 60px 180px 1fr 100px; }
                    .ledger-col-actions { display: none; }
                }

                @media (max-width: 768px) {
                    .ledger-sidebar { flex-direction: column; }
                    .ledger-row { grid-template-columns: 60px 1fr; }
                    .ledger-col-preview, .ledger-col-status { display: none; }
                }
            `}</style>
        </div>
    );
}
