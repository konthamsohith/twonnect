"use client";

import React from "react";
import { Idea, getOrCreatePrivateChat, createCollaborationRequest, getUserCollaborationRequest } from "@/lib/supabase-db";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const IconEdit = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
);

const IconDelete = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
);

const IconAudit = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.912 5.813h6.111l-4.943 3.591 1.887 5.85L12 14.663l-4.967 3.591 1.887-5.85-4.943-3.591h6.111L12 3z" /></svg>
);

const IconChat = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
);

const IconCollab = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="16" y1="11" x2="22" y2="11" /></svg>
);

interface IdeaTableRowProps {
    idea: Idea;
    onEdit: () => void;
    onDelete: () => void;
    onAudit: () => void;
}

export default function IdeaTableRow({ idea, onEdit, onDelete, onAudit }: IdeaTableRowProps) {
    const { user } = useAuth();
    const router = useRouter();
    const isCollab = idea.status === "Collaborative";
    const statusColor = isCollab ? "#bbf451" : "#007aff";

    const [requestStatus, setRequestStatus] = React.useState<'none' | 'pending' | 'sent'>('none');

    React.useEffect(() => {
        async function checkRequest() {
            if (!user?.id || user.id === idea.author_id) return;
            const req = await getUserCollaborationRequest(idea.id!, user.id);
            if (req) {
                setRequestStatus('sent');
            }
        }
        checkRequest();
    }, [user?.id, idea.id]);

    const handleChat = async () => {
        if (!user || user.id === idea.author_id) return;

        const chatId = await getOrCreatePrivateChat(user.id, idea.author_id, idea.author_name);
        if (chatId) {
            router.push(`/dashboard/messages?chatId=${chatId}`);
        }
    };

    const handleRequest = async () => {
        if (!user || user.id === idea.author_id || requestStatus !== 'none') return;

        setRequestStatus('pending');
        const success = await createCollaborationRequest(idea.id!, user.id, "I'm interested in collaborating on this elite venture.");
        if (success) {
            setRequestStatus('sent');
        } else {
            setRequestStatus('none');
        }
    };

    return (
        <div className="idea-table-row">
            {/* Status Column */}
            <div className="col-status">
                <div className="status-indicator">
                    <span className="status-badge" style={{
                        backgroundColor: `${statusColor}15`,
                        color: isCollab ? "#749a1d" : "#007aff",
                        border: `1px solid ${statusColor}30`
                    }}>
                        <span className="dot" style={{ backgroundColor: statusColor }}></span>
                        {idea.status}
                    </span>
                </div>
            </div>

            {/* Title & Description Column */}
            <div className="col-content">
                <h4 className="idea-title">{idea.title}</h4>
                <p className="idea-desc">{idea.description.length > 120 ? idea.description.substring(0, 120) + "..." : idea.description}</p>
            </div>

            {/* Metrics Columns */}
            <div className="col-metrics">
                <div className="metric-item">
                    <span className="metric-label">Impact</span>
                    <span className="metric-value">{idea.impact && !isNaN(Number(idea.impact)) ? idea.impact : "85"}<span className="unit">pts</span></span>
                </div>
                <div className="metric-item">
                    <span className="metric-label">Team</span>
                    <span className="metric-value">{idea.collaborators || 0}<span className="unit">active</span></span>
                </div>
            </div>

            {/* Date Column */}
            <div className="col-date">
                <span className="date-label">Added On</span>
                <span className="date-value">{new Date(idea.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>

            {/* Actions Column */}
            <div className="col-actions">
                <div className="action-buttons">
                    {user?.id !== idea.author_id && (
                        <>
                            <button onClick={handleChat} className="action-btn chat" title="Chat with Founder">
                                <IconChat />
                            </button>
                            <button
                                onClick={handleRequest}
                                className={`action-btn collab ${requestStatus !== 'none' ? 'sent' : ''}`}
                                title={requestStatus === 'sent' ? "Request Sent" : "Request to Collaborate"}
                                disabled={requestStatus !== 'none'}
                            >
                                <IconCollab />
                            </button>
                        </>
                    )}
                    <button onClick={onEdit} className="action-btn" title="Edit Workspace">
                        <IconEdit />
                    </button>
                    <button onClick={onAudit} className="action-btn audit" title="Run AI Audit">
                        <IconAudit />
                    </button>
                    <button onClick={onDelete} className="action-btn delete" title="Archive Submission">
                        <IconDelete />
                    </button>
                </div>
            </div>

            <style jsx>{`
                .idea-table-row {
                    display: grid;
                    grid-template-columns: 160px 1fr 180px 120px 140px;
                    align-items: center;
                    padding: 1rem 1.5rem;
                    background: white;
                    border-bottom: 1px solid #f3f4f6;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .idea-table-row:hover {
                    background: #f9fafb;
                    box-shadow: inset 4px 0 0 0 var(--blue);
                }

                .idea-table-row:last-child {
                    border-bottom: none;
                }

                /* Status badge */
                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 4px 10px;
                    border-radius: 20px;
                    font-size: 0.65rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                }

                /* Content */
                .col-content {
                    padding-right: 2rem;
                }

                .idea-title {
                    font-size: 0.95rem;
                    font-weight: 500;
                    color: #111827;
                    margin: 0 0 0.15rem 0;
                    letter-spacing: -0.01em;
                }

                .idea-desc {
                    font-size: 0.8rem;
                    color: #6b7280;
                    margin: 0;
                    line-height: 1.4;
                }

                /* Metrics */
                .col-metrics {
                    display: flex;
                    gap: 1.5rem;
                }

                .metric-item {
                    display: flex;
                    flex-direction: column;
                }

                .metric-label {
                    font-size: 0.6rem;
                    font-weight: 700;
                    color: #9ca3af;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 2px;
                }

                .metric-value {
                    font-size: 0.95rem;
                    font-weight: 500;
                    color: #111827;
                    display: flex;
                    align-items: baseline;
                    gap: 2px;
                }

                .unit {
                    font-size: 0.65rem;
                    font-weight: 600;
                    color: #9ca3af;
                    text-transform: lowercase;
                }

                /* Date */
                .col-date {
                    display: flex;
                    flex-direction: column;
                }

                .date-label {
                    font-size: 0.6rem;
                    font-weight: 700;
                    color: #9ca3af;
                    text-transform: uppercase;
                    margin-bottom: 2px;
                }

                .date-value {
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: #4b5563;
                }

                /* Actions */
                .action-buttons {
                    display: flex;
                    justify-content: flex-end;
                    gap: 0.5rem;
                    opacity: 0.2;
                    transition: opacity 0.2s;
                }

                .idea-table-row:hover .action-buttons {
                    opacity: 1;
                }

                .action-btn {
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justifyContent: center;
                    border: 1px solid #e5e7eb;
                    background: white;
                    border-radius: 8px;
                    color: #6b7280;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .action-btn:hover {
                    border-color: #d1d5db;
                    color: #111827;
                    background: #fff;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
                }

                .action-btn.audit:hover {
                    border-color: #bbf451;
                    color: #749a1d;
                }

                .action-btn.delete:hover {
                    border-color: #fee2e2;
                    background: #fef2f2;
                    color: #ef4444;
                }

                .action-btn.chat:hover {
                    border-color: #007aff;
                    color: #007aff;
                }

                .action-btn.collab:hover:not(:disabled) {
                    border-color: #bbf451;
                    color: #749a1d;
                }

                .action-btn.collab.sent {
                    background: #bbf451;
                    color: #111827;
                    border-color: #bbf451;
                    opacity: 1;
                }

                @media (max-width: 1024px) {
                    .idea-table-row {
                        grid-template-columns: 120px 1fr 120px;
                    }
                    .col-metrics, .col-date {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
}
