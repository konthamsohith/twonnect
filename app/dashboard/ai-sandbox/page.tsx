"use client";

import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useAuth } from "@/context/AuthContext";

// ── Icons ──────────────────────────────────────────────────────
const IconAI = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2V4" /><path d="M12 20V22" /><path d="M4.93 4.93L6.34 6.34" /><path d="M17.66 17.66L19.07 19.07" /><path d="M2 12H4" /><path d="M20 12H22" /><path d="M4.93 19.07L6.34 17.66" /><path d="M17.66 6.34L19.07 4.93" /><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /></svg>
);
const IconArrowRight = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
);
const IconPlus = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const IconMessage = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);
const IconTrash = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
);

// ── Types ──────────────────────────────────────────────────────
type Role = "user" | "assistant" | "system";

interface ChatMessage {
    id: string;
    role: Role;
    content: string;
}

interface ChatSession {
    id: string;
    title: string;
    updatedAt: number;
    messages: ChatMessage[];
}

export default function AISandboxPage() {
    const { user } = useAuth();
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Load from local storage on mount/auth
    useEffect(() => {
        if (!user) return; // Wait until user is loaded

        const storageKey = `twonnect_ai_sessions_${user.id}`;
        const saved = localStorage.getItem(storageKey);

        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setSessions(parsed);
            } catch (e) {
                console.error("Failed to parse sessions", e);
            }
        } else {
            // Attempt to migrate existing general key if no user-specific key exists yet
            const oldSaved = localStorage.getItem("twonnect_ai_sessions");
            if (oldSaved) {
                try {
                    const parsed = JSON.parse(oldSaved);
                    setSessions(parsed);
                    // Option to remove the old generic one
                    localStorage.removeItem("twonnect_ai_sessions");
                } catch (e) { }
            } else {
                setSessions([]);
            }
        }
        setIsLoaded(true);
    }, [user]);

    // Save to local storage when sessions change
    useEffect(() => {
        if (isLoaded && user) {
            const storageKey = `twonnect_ai_sessions_${user.id}`;
            localStorage.setItem(storageKey, JSON.stringify(sessions));
        }
    }, [sessions, isLoaded, user]);

    // Auto scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [sessions, currentSessionId, isTyping]);

    const handleNewChat = () => {
        setCurrentSessionId(null);
        setInputValue("");
    };

    const handleDeleteChat = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setSessions(prev => prev.filter(s => s.id !== id));
        if (currentSessionId === id) {
            setCurrentSessionId(null);
            setInputValue("");
        }
    };

    const currentSession = sessions.find(s => s.id === currentSessionId);

    // Auto-resize textarea
    const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
    };

    const handleSubmit = async () => {
        if (!inputValue.trim() || isTyping) return;

        const newUserMessage: ChatMessage = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue.trim(),
        };

        setInputValue("");
        setIsTyping(true);

        let activeSessionId = currentSessionId;
        let activeSession = currentSession;

        // Create new session if none active
        if (!activeSessionId) {
            activeSessionId = Date.now().toString();
            activeSession = {
                id: activeSessionId,
                title: newUserMessage.content.substring(0, 30) + (newUserMessage.content.length > 30 ? "..." : ""),
                updatedAt: Date.now(),
                messages: [newUserMessage]
            };

            setSessions(prev => [activeSession!, ...prev]);
            setCurrentSessionId(activeSessionId);
        } else {
            // Update existing session with user message
            setSessions(prev => prev.map(s => {
                if (s.id === activeSessionId) {
                    return {
                        ...s,
                        updatedAt: Date.now(),
                        messages: [...s.messages, newUserMessage]
                    };
                }
                return s;
            }));
            activeSession = {
                ...activeSession!,
                messages: [...activeSession!.messages, newUserMessage]
            };
        }

        // Fast formatting API payload
        const apiMessages = activeSession!.messages.map(m => ({
            role: m.role,
            content: m.content
        }));

        const isNewScour = activeSession!.messages.length === 1;

        try {
            const response = await fetch("/api/deep-scour", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: isNewScour ? [] : apiMessages.slice(0, -1), // Send previous history if not new
                    concept: isNewScour ? newUserMessage.content : null // Send concept only if new
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch AI response");
            }

            const newAiMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.reply || "No response generated.",
            };

            setSessions(prev => prev.map(s => {
                if (s.id === activeSessionId) {
                    return {
                        ...s,
                        updatedAt: Date.now(),
                        messages: [...s.messages, newAiMessage]
                    };
                }
                return s;
            }));

        } catch (error: any) {
            console.error(error);
            const errorMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: "system",
                content: `**Error**: ${error.message}. Please try again.`,
            };
            setSessions(prev => prev.map(s => {
                if (s.id === activeSessionId) {
                    return {
                        ...s,
                        updatedAt: Date.now(),
                        messages: [...s.messages, errorMessage]
                    };
                }
                return s;
            }));
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="sandbox-layout clean-elite-v3">

            {/* ── SIDEBAR ───────────────────────────────────────────────── */}
            <aside className="chat-sidebar">
                <button className="btn-new-chat" onClick={handleNewChat}>
                    <IconPlus /> New Deep Scour
                </button>

                <div className="history-list">
                    <h4 className="sidebar-group-title">Previous Chats</h4>
                    {sessions.length === 0 ? (
                        <p style={{ fontSize: "0.85rem", color: "#9ca3af", padding: "0 1rem" }}>No previous investigations found.</p>
                    ) : (
                        sessions.map(ss => (
                            <div key={ss.id} className={`history-item-wrapper ${ss.id === currentSessionId ? "active" : ""}`}>
                                <button
                                    className="history-item"
                                    onClick={() => setCurrentSessionId(ss.id)}
                                >
                                    <IconMessage />
                                    <span className="truncate">{ss.title}</span>
                                </button>
                                <button onClick={(e) => handleDeleteChat(e, ss.id)} className="btn-delete-chat">
                                    <IconTrash />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </aside>

            {/* ── MAIN CHAT AREA ────────────────────────────────────────── */}
            <main className="chat-main">
                <header className="chat-header">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", width: "100%" }}>
                        <div>
                            <h1 style={{ fontSize: "28px", fontWeight: 600, color: "#000000", letterSpacing: "-0.03em", lineHeight: "1" }}>AI Sandbox</h1>
                            <p style={{ color: "#6b7280", marginTop: "0.5rem", fontSize: "1rem" }}>
                                Powered by <span style={{ color: "var(--blue)", fontWeight: 700 }}>TWONNECT</span> • Deep Market Scouring Active.
                            </p>
                        </div>
                        <span className="early-access-badge">
                            ALPHA ACCESS
                        </span>
                    </div>
                </header>

                <div className="chat-messages-container">
                    {!currentSession || currentSession.messages.length === 0 ? (
                        /* LANDING VIEW */
                        <div className="landing-view">
                            <div className="hero-content" style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center", paddingTop: "4rem" }}>






                            </div>
                        </div>
                    ) : (
                        /* CHAT THREAD */
                        <div className="chat-thread">
                            {currentSession.messages.map(msg => (
                                <div key={msg.id} className={`chat-bubble-wrapper ${msg.role}`}>
                                    <div className="bubble-avatar">
                                        {msg.role === "user" ? "ME" : <IconAI />}
                                    </div>
                                    <div className={`chat-bubble ${msg.role}`}>
                                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="chat-bubble-wrapper assistant typing">
                                    <div className="bubble-avatar"><IconAI /></div>
                                    <div className="chat-bubble assistant">
                                        <div className="typing-indicator"><span></span><span></span><span></span></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* ── INPUT AREA ────────────────────────────────────────────── */}
                <div className="chat-input-wrapper">
                    <div className="chat-input-inner">
                        <textarea
                            value={inputValue}
                            onChange={handleTextareaInput}
                            onKeyDown={handleKeyDown}
                            placeholder="Initialize Deep Scour: Type a startup concept, sector, or follow-up question..."
                            rows={1}
                        />
                        <button
                            className="btn-send"
                            disabled={!inputValue.trim() || isTyping}
                            onClick={handleSubmit}
                        >
                            <IconArrowRight />
                        </button>
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "#9ca3af", textAlign: "center", marginTop: "0.5rem" }}>
                        TWONNECT AI can make mistakes. Verify critical market data independently.
                    </div>
                </div>
            </main>

            {/* ── STYLES ────────────────────────────────────────────────── */}
            <style jsx>{`
                .sandbox-layout {
                    display: flex;
                    height: 100vh;
                    background: white;
                    overflow: hidden;
                    margin: 0; /* Full bleed */
                    border: none;
                }

                /* Sidebar */
                .chat-sidebar {
                    width: 280px;
                    background: #f9fafb;
                    border-right: 1px solid #e5e7eb;
                    display: flex;
                    flex-direction: column;
                    padding: 1.5rem 1rem;
                    flex-shrink: 0;
                }
                .btn-new-chat {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    width: 100%;
                    padding: 0.8rem 1rem;
                    background: white;
                    border: 1px solid #e5e7eb;
                    border-radius: 12px;
                    color: #000000;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.02);
                }
                .btn-new-chat:hover {
                    border-color: #000000;
                }
                .history-list {
                    margin-top: 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                    overflow-y: auto;
                }
                .sidebar-group-title {
                    font-size: 0.7rem;
                    font-weight: 800;
                    color: #9ca3af;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    padding: 0 1rem;
                    margin-bottom: 0.75rem;
                }
                .history-item-wrapper {
                    display: flex;
                    align-items: center;
                    background: transparent;
                    border-radius: 10px;
                    transition: all 0.15s;
                }
                .history-item-wrapper:hover {
                    background: #f3f4f6;
                }
                .history-item-wrapper.active {
                    background: white;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                }

                .history-item {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.75rem 1rem;
                    background: transparent;
                    border: none;
                    color: #4b5563;
                    font-size: 0.9rem;
                    font-weight: 500;
                    text-align: left;
                    cursor: pointer;
                    flex-grow: 1;
                    min-width: 0;
                }
                .history-item-wrapper.active .history-item {
                    color: #000000;
                    font-weight: 700;
                }

                .btn-delete-chat {
                    background: transparent;
                    border: none;
                    color: #9ca3af;
                    padding: 0.5rem;
                    cursor: pointer;
                    border-radius: 6px;
                    margin-right: 0.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                    opacity: 0;
                }
                .history-item-wrapper:hover .btn-delete-chat {
                    opacity: 1;
                }
                .btn-delete-chat:hover {
                    color: #ef4444;
                    background: #fee2e2;
                }
                .truncate {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                /* Main Chat Grid */
                .chat-main {
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    background: white;
                    position: relative;
                }
                .chat-header {
                    padding: 1.5rem 2.5rem;
                    border-bottom: 1px solid #f3f4f6;
                }
                .early-access-badge {
                    font-size: 0.7rem; font-weight: 800; letter-spacing: 0.1em;
                    color: var(--blue); background: rgba(0, 122, 255, 0.05);
                    padding: 6px 14px; border-radius: 8px; border: 1px solid rgba(0, 122, 255, 0.1);
                    white-space: nowrap;
                }

                .chat-messages-container {
                    flex-grow: 1;
                    overflow-y: auto;
                    padding: 2rem 2.5rem 0rem;
                }
                
                /* Landing Specific */
                .orb-container { position: relative; width: 80px; height: 80px; margin: 0 auto; }
                .telemetry-orb {
                    width: 80px; height: 80px; border-radius: 50%;
                    background: var(--blue); box-shadow: 0 0 40px var(--blue);
                    animation: telemetry 3s infinite ease-in-out;
                }
                @keyframes telemetry { 0% { opacity: 0.3; transform: scale(0.9); } 50% { opacity: 0.8; transform: scale(1.1); } 100% { opacity: 0.3; transform: scale(0.9); } }
                .ai-status { display: flex; align-items: center; gap: 0.75rem; color: var(--lime); font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem; }
                .hero-actions { display: flex; gap: 1rem; }
                .btn-v3-ghost { background: transparent; color: #000000; padding: 0.8rem 2rem; border-radius: 12px; font-weight: 800; border: 1px solid #e5e7eb; cursor: pointer; transition: all 0.2s; }
                .btn-v3-ghost:hover { background: #f9fafb; border-color: #000000; }

                /* Chat Thread */
                .chat-thread {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    max-width: 800px;
                    margin: 0 auto;
                    padding-bottom: 2rem;
                }
                .chat-bubble-wrapper {
                    display: flex;
                    gap: 1rem;
                    max-width: 90%;
                }
                .chat-bubble-wrapper.user {
                    align-self: flex-end;
                    flex-direction: row-reverse;
                }
                .chat-bubble-wrapper.assistant {
                    align-self: flex-start;
                }
                .bubble-avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.65rem;
                    font-weight: 900;
                }
                .user .bubble-avatar {
                    background: #f3f4f6; color: #4b5563;
                }
                .assistant .bubble-avatar {
                    background: var(--blue); color: white;
                }

                .chat-bubble {
                    padding: 1rem 1.25rem;
                    border-radius: 16px;
                    font-size: 0.95rem;
                    line-height: 1.6;
                }
                .chat-bubble.user {
                    background: #f3f4f6;
                    color: #000000;
                    border-top-right-radius: 4px;
                }
                .chat-bubble.assistant {
                    background: white;
                    border: 1px solid #e5e7eb;
                    color: #000000;
                    border-top-left-radius: 4px;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.02);
                }
                .chat-bubble.system {
                    background: #fef2f2;
                    border: 1px solid #fecaca;
                    color: #991b1b;
                }
                
                /* Markdown Styling overriding inside chat bubble */
                :global(.chat-bubble.assistant h1), :global(.chat-bubble.assistant h2), :global(.chat-bubble.assistant h3) {
                    margin-top: 1rem; margin-bottom: 0.5rem; font-weight: 700; color: #000000;
                }
                :global(.chat-bubble.assistant h3) { font-size: 1.1rem; }
                :global(.chat-bubble.assistant p) { margin-bottom: 0.75rem; }
                :global(.chat-bubble.assistant ul), :global(.chat-bubble.assistant ol) { margin-left: 1.5rem; margin-bottom: 1rem; }
                :global(.chat-bubble.assistant li) { margin-bottom: 0.25rem; }
                :global(.chat-bubble.assistant strong) { font-weight: 700; color: #000000; }

                /* Typing Indicator */
                .typing-indicator {
                    display: flex; align-items: center; gap: 4px; padding: 0.25rem 0.5rem;
                }
                .typing-indicator span {
                    display: block; width: 6px; height: 6px; background: #9ca3af; border-radius: 50%;
                    animation: bounce 1.4s infinite ease-in-out both;
                }
                .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
                .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
                @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }

                /* Input Area */
                .chat-input-wrapper {
                    padding: 1.5rem 2.5rem;
                    background: linear-gradient(180deg, rgba(255,255,255,0) 0%, white 20%);
                    position: sticky;
                    bottom: 0;
                }
                .chat-input-inner {
                    max-width: 800px; margin: 0 auto; position: relative;
                    background: white; border: 1px solid #e5e7eb; border-radius: 16px;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03);
                    display: flex; align-items: flex-end; padding: 0.5rem;
                    transition: border-color 0.2s;
                }
                .chat-input-inner:focus-within {
                    border-color: var(--blue);
                }
                .chat-input-inner textarea {
                    flex-grow: 1; border: none; outline: none; resize: none;
                    background: transparent; padding: 0.75rem 1rem; font-size: 1rem; line-height: 1.5;
                    max-height: 200px;
                    font-family: inherit;
                }
                .btn-send {
                    background: #000000; color: white; width: 40px; height: 40px; border-radius: 10px;
                    display: flex; align-items: center; justify-content: center; border: none;
                    cursor: pointer; transition: all 0.2s; flex-shrink: 0; margin-bottom: 4px; margin-right: 4px;
                }
                .btn-send:hover:not(:disabled) {
                    background: var(--blue);
                }
                .btn-send:disabled {
                    background: #f3f4f6; color: #9ca3af; cursor: not-allowed;
                }

                @media (max-width: 1024px) {
                    .sandbox-layout { flex-direction: column; height: auto; border: none; }
                    .chat-sidebar { width: 100%; border-right: none; border-bottom: 1px solid #e5e7eb; padding: 1rem; }
                    .history-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.5rem; }
                    .chat-input-wrapper { padding: 1rem; }
                }
            `}</style>
        </div>
    );
}
