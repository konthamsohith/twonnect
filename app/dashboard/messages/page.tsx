"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import ReactMarkdown from "react-markdown";
import { useAuth } from "@/context/AuthContext";
import dynamic from 'next/dynamic';
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Chat, ChatMessage, getChats, getMessages, sendChatMessage, getUserChats, getOrCreatePrivateChat, resetUnread, getChatParticipants } from "@/lib/supabase-db";

const VideoCallUI = dynamic(() => import('@/app/components/VideoCallUI'), { ssr: false });

// ── Icons ──────────────────────────────────────────────────────────
const IconSend = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
);
const IconVideo = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
);
const IconPhone = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);
const IconPhoneOff = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7c1.1.2 2 1.07 2 2.18v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-2.67a19.42 19.42 0 0 1-2.67-3.33 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
        <line x1="23" y1="1" x2="1" y2="23" />
    </svg>
);
const IconSearch = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);
const IconMessage = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);
const IconBot = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /><line x1="12" y1="3" x2="12" y2="7" /><circle cx="9" cy="16" r="1" fill="currentColor" stroke="none" /><circle cx="15" cy="16" r="1" fill="currentColor" stroke="none" />
    </svg>
);
const IconUsers = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);
const IconBriefcase = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
);
const IconTrash = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
);

// ── Types & Utils ──────────────────────────────────────────────────
function getAvatar(tag: Chat['tag']) {
    if (tag === 'ai') return { icon: <IconBot />, color: '#7c3aed', bg: '#ede9fe' };
    if (tag === 'investor') return { icon: <IconBriefcase />, color: '#0369a1', bg: '#e0f2fe' };
    if (tag === 'group') return { icon: <IconUsers />, color: '#854d0e', bg: '#fef9c3' };
    return { icon: <IconUsers />, color: '#059669', bg: '#d1fae5' };
}

const formatTime = (dateStr: string | undefined) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// ── Component ──────────────────────────────────────────────────────
function MessagesContent() {
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const [chats, setChats] = useState<Chat[]>([]);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [activeChatId, setActiveChatId] = useState<number | null>(null);
    const [search, setSearch] = useState("");
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [callMode, setCallMode] = useState<"none" | "video" | "audio">("none");
    const [roomID, setRoomID] = useState<string>("");
    const [participants, setParticipants] = useState<{ user_id: string, full_name: string, avatar_url?: string }[]>([]);
    const [showParticipants, setShowParticipants] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const activeChat = chats.find(c => c.id === activeChatId) ?? null;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages.length]);

    // Initial load
    useEffect(() => {
        if (!user) return;
        const load = async () => {
            const data = await getUserChats(user.id);
            if (data) setChats(data);
        };
        load();
    }, [user]);

    // Search params
    useEffect(() => {
        const id = searchParams.get('chatId');
        if (id) setActiveChatId(parseInt(id));
    }, [searchParams]);

    // Active chat content
    useEffect(() => {
        if (!activeChatId) return;
        const load = async () => {
            const [msgs, parts] = await Promise.all([
                getMessages(activeChatId),
                getChatParticipants(activeChatId)
            ]);
            setMessages(msgs);
            setParticipants(parts);
        };
        load();

        const channel = supabase.channel(`chat_${activeChatId}`)
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `chat_id=eq.${activeChatId}` }, (p) => {
                setMessages(prev => [...prev, p.new as ChatMessage]);
            })
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, [activeChatId]);

    // Real-time chat list
    useEffect(() => {
        if (!user) return;
        const channel = supabase.channel('chat_list_updates')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'chats' }, async () => {
                const data = await getUserChats(user.id);
                if (data) setChats(data);
            })
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_participants', filter: `user_id=eq.${user.id}` }, async () => {
                const data = await getUserChats(user.id);
                if (data) setChats(data);
            })
            .subscribe();
        return () => { supabase.removeChannel(channel); };
    }, [user]);

    const sendMessage = async () => {
        if (!input.trim() || !activeChatId || !user) return;
        const text = input.trim();
        setInput("");

        if (activeChat?.tag === 'ai') {
            setIsTyping(true);
            await sendChatMessage(activeChatId, text, user.id);
            try {
                const apiMessages = messages.map(m => ({
                    role: m.sender_id === user.id ? 'user' : 'assistant',
                    content: m.text
                }));
                apiMessages.push({ role: 'user', content: text });
                const res = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ messages: apiMessages }),
                });
                const data = await res.json();
                if (data.reply) await sendChatMessage(activeChatId, data.reply, "ai_bot");
            } catch (e) { console.error(e); }
            finally { setIsTyping(false); }
        } else {
            await sendChatMessage(activeChatId, text, user.id);
        }
    };

    const startCall = async (type: "video" | "audio") => {
        if (!activeChatId || !user) return;
        const rid = `room_${activeChatId}_${Date.now()}`;
        await sendChatMessage(activeChatId, `CALL_SIGNAL:${type}:${rid}`, user.id);
        setRoomID(rid);
        setCallMode(type);
    };

    const endCall = async () => {
        if (!activeChatId || !user || !roomID) {
            setCallMode("none");
            return;
        }
        await sendChatMessage(activeChatId, `CALL_ENDED:${roomID}`, user.id);
        setCallMode("none");
    };

    const handleDeleteChat = async (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        setChats(prev => prev.filter(c => c.id !== id));
        if (activeChatId === id) setActiveChatId(null);
    };

    const filteredChats = chats.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.type === 'dm');

    return (
        <div className="messages-root">
            {/* ── SIDEBAR ── */}
            <aside className="msg-sidebar">
                <div className="sidebar-top">
                    <h2 className="sidebar-title">Messages</h2>
                    <div className="search-wrap">
                        <IconSearch />
                        <input
                            className="search-input"
                            placeholder="Search chats..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="chat-list">
                    {filteredChats.map(chat => {
                        const isDM = chat.type === 'dm';
                        const otherP = isDM ? chat.participants?.find(p => p.user_id !== user?.id) : null;
                        const dName = isDM ? (otherP?.full_name || chat.name) : chat.name;
                        const av = getAvatar(chat.tag);

                        return (
                            <div
                                key={chat.id}
                                className={`chat-item-wrapper ${activeChatId === chat.id ? 'active' : ''}`}
                                onClick={() => { setActiveChatId(chat.id); setShowParticipants(false); setCallMode("none"); }}
                            >
                                <div className="chat-item">
                                    <div className="avatar" style={{ background: av.bg, color: av.color }}>
                                        {isDM && otherP?.avatar_url ? <img src={otherP.avatar_url} /> : (isDM ? dName[0] : av.icon)}
                                    </div>
                                    <div className="chat-info">
                                        <div className="chat-meta">
                                            <span className="chat-name">{dName}</span>
                                            <span className="chat-time">{formatTime(chat.last_message_at)}</span>
                                        </div>
                                        <div className="chat-meta">
                                            <span className="chat-preview">{chat.last_message || "No messages yet"}</span>
                                            {chat.unread > 0 && <span className="unread-badge">{chat.unread}</span>}
                                        </div>
                                    </div>
                                </div>
                                <button className="btn-delete-msg" onClick={e => handleDeleteChat(e, chat.id)}><IconTrash /></button>
                            </div>
                        );
                    })}
                </div>
            </aside>

            {/* ── MAIN ── */}
            <main className="msg-main">
                {activeChat ? (
                    callMode !== "none" ? (
                        <div className="teams-call-stage">
                            {/* Teams Top Bar */}
                            <div className="teams-call-header">
                                <div className="teams-meeting-title">
                                    <div className="teams-icon-users">
                                        <IconUsers />
                                    </div>
                                    <span>Meeting with {activeChat.type === 'dm' ? (participants.find(p => p.user_id !== user?.id)?.full_name || activeChat.name) : activeChat.name}</span>
                                </div>
                                <div className="teams-metadata">
                                    <div className="teams-timer">00:12:44</div>
                                    <div className="teams-encryption">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="teams-video-frame">
                                <VideoCallUI
                                    key={roomID}
                                    roomID={roomID}
                                    userID={user?.id || "anon"}
                                    userName={user?.user_metadata?.full_name || "User"}
                                    mode="OneONoneCall"
                                    initialMode={callMode as "video" | "audio"}
                                />

                                {/* Floating Teams Controls */}
                                <div className="teams-floating-controls">
                                    <div className="control-group">
                                        <button className="teams-btn-round" title="Toggle Microphone"><IconPhone /></button>
                                        <button className="teams-btn-round" title="Toggle Camera"><IconVideo /></button>
                                        <button className="teams-btn-round" title="Share Screen">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                                        </button>
                                        <button className="teams-btn-round" title="More Actions">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                                        </button>
                                    </div>
                                    <div className="divider-teams"></div>
                                    <button className="teams-btn-leave" onClick={endCall}>Leave</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="chat-header">
                                <div className="chat-header-left">
                                    <div className="avatar" style={{ background: getAvatar(activeChat.tag).bg, color: getAvatar(activeChat.tag).color }}>
                                        {activeChat.type === 'dm' && participants.find(p => p.user_id !== user?.id)?.avatar_url
                                            ? <img src={participants.find(p => p.user_id !== user?.id)?.avatar_url} />
                                            : (activeChat.type === 'dm' ? (participants.find(p => p.user_id !== user?.id)?.full_name?.[0] || activeChat.name[0]) : getAvatar(activeChat.tag).icon)}
                                    </div>
                                    <div>
                                        <div className="ch-name">
                                            {activeChat.type === 'dm' ? (participants.find(p => p.user_id !== user?.id)?.full_name || activeChat.name) : activeChat.name}
                                        </div>
                                        <div className="ch-role">{activeChat.role}</div>
                                    </div>
                                </div>
                                <div className="chat-header-right">
                                    <button className="btn-call" onClick={() => startCall("audio")}><IconPhone /></button>
                                    <button className="btn-call" onClick={() => startCall("video")}><IconVideo /></button>
                                    <button className={`btn-call ${showParticipants ? 'active' : ''}`} onClick={() => setShowParticipants(!showParticipants)}><IconUsers /></button>
                                    <div className={`chat-tag-pill tag-${activeChat.tag}`}>
                                        {activeChat.tag === 'ai' ? 'AI' : activeChat.tag === 'investor' ? 'Investor' : activeChat.tag === 'group' ? 'Project' : 'Co-founder'}
                                    </div>
                                </div>
                            </div>

                            <div className="messages-area">
                                {messages.map(msg => (
                                    <div key={msg.id} className={`msg-row ${msg.sender_id === user?.id ? 'msg-me' : 'msg-them'}`}>
                                        {msg.sender_id !== user?.id && (
                                            <div className="avatar sm" style={{ background: getAvatar(activeChat.tag).bg, color: getAvatar(activeChat.tag).color }}>
                                                {getAvatar(activeChat.tag).icon}
                                            </div>
                                        )}
                                        <div className="bubble-wrap">
                                            <div className={`bubble ${msg.sender_id === user?.id ? 'bubble-me' : 'bubble-them'}`}>
                                                {msg.text.startsWith("CALL_SIGNAL:") ? (
                                                    <div className="call-signal-msg">
                                                        <div className="call-info">
                                                            <div className="call-icon-pulse">
                                                                <IconPhone />
                                                                <div className="pulse-ring"></div>
                                                            </div>
                                                            <div className="call-text">
                                                                <h3>Incoming {msg.text.split(':')[1]} call</h3>
                                                                <p>Room ID: {msg.text.split(':')[2].slice(0, 8)}...</p>
                                                            </div>
                                                        </div>
                                                        {msg.sender_id !== user?.id && (
                                                            <button className="btn-join-call" onClick={() => { setRoomID(msg.text.split(':')[2]); setCallMode(msg.text.split(':')[1] as any); }}>
                                                                Join Call
                                                            </button>
                                                        )}
                                                    </div>
                                                ) : msg.text.startsWith("CALL_ENDED:") ? (
                                                    <div className="call-ended-msg">
                                                        <div className="ended-icon-box">
                                                            <IconPhoneOff />
                                                        </div>
                                                        <span>Call session ended</span>
                                                    </div>
                                                ) : (
                                                    msg.sender_id === 'ai_bot' ? <div className="markdown-content"><ReactMarkdown>{msg.text}</ReactMarkdown></div> : msg.text
                                                )}
                                            </div>
                                            <span className="msg-time">{formatTime(msg.created_at)}</span>
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="msg-row msg-them">
                                        <div className="bubble-wrap"><div className="bubble bubble-them">AI is typing...</div></div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="compose-bar">
                                <input
                                    className="compose-input"
                                    placeholder="Type a message..."
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                                />
                                <button className="btn-send" onClick={sendMessage} disabled={!input.trim()}><IconSend /> <span>Send</span></button>
                            </div>
                        </>
                    )
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon"><IconMessage /></div>
                        <h3>Select a conversation</h3>
                        <p>Connect with co-founders, collaborators, and mentors.</p>
                    </div>
                )}
            </main>

            {/* ── SIDEBAR ── */}
            {activeChat && showParticipants && (
                <aside className="participants-sidebar">
                    <div className="sidebar-top"><h2 className="sidebar-title">Participants</h2></div>
                    <div className="participants-list">
                        {participants.map(p => (
                            <div key={p.user_id} className="participant-item">
                                <div className="avatar sm">{p.avatar_url ? <img src={p.avatar_url} /> : p.full_name[0]}</div>
                                <div className="p-info">
                                    <div className="p-name">{p.full_name}</div>
                                    <div className="p-status">{p.user_id === user?.id ? "You" : "Active"}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            )}

            <style jsx>{`
                .messages-root { display: flex; height: 100vh; background: #fff; overflow: hidden; }
                .msg-sidebar { width: 320px; border-right: 1px solid #e5e7eb; display: flex; flex-direction: column; background: #fafafa; }
                .sidebar-top { padding: 1.25rem; border-bottom: 1px solid #e5e7eb; }
                .sidebar-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem; }
                .search-wrap { display: flex; align-items: center; gap: 0.5rem; background: #f3f4f6; padding: 8px 12px; border-radius: 8px; color: #9ca3af; }
                .search-input { border: none; background: transparent; outline: none; width: 100%; font-size: 0.85rem; }
                .chat-list { flex: 1; overflow-y: auto; }
                .chat-item-wrapper { display: flex; align-items: center; cursor: pointer; transition: background 0.2s; border-bottom: 1px solid #f3f4f6; }
                .chat-item-wrapper:hover { background: #f3f4f6; }
                .chat-item-wrapper.active { background: #f0f9ff; border-left: 3px solid #111827; }
                .chat-item { flex: 1; display: flex; gap: 0.75rem; padding: 1rem; min-width: 0; }
                .avatar { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; overflow: hidden; }
                .avatar img { width: 100%; height: 100%; object-fit: cover; }
                .avatar.sm { width: 32px; height: 32px; border-radius: 8px; }
                .chat-info { flex: 1; min-width: 0; }
                .chat-meta { display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; }
                .chat-name { font-size: 0.875rem; font-weight: 600; color: #111827; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .chat-time { font-size: 0.7rem; color: #9ca3af; }
                .chat-preview { font-size: 0.8rem; color: #6b7280; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-top: 2px; }
                .unread-badge { background: #111827; color: #fff; font-size: 0.65rem; padding: 2px 6px; border-radius: 10px; }
                .btn-delete-msg { padding: 0.5rem; color: #9ca3af; border: none; background: transparent; cursor: pointer; opacity: 0; transition: opacity 0.2s; }
                .chat-item-wrapper:hover .btn-delete-msg { opacity: 1; }
                .msg-main { flex: 1; display: flex; flex-direction: column; background: #fff; min-width: 0; }
                .chat-header { padding: 1rem 1.5rem; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; }
                .chat-header-left { display: flex; align-items: center; gap: 0.75rem; }
                .ch-name { font-size: 1rem; font-weight: 700; }
                .ch-role { font-size: 0.75rem; color: #6b7280; }
                .chat-header-right { display: flex; align-items: center; gap: 0.5rem; }
                .btn-call { width: 36px; height: 36px; border-radius: 8px; border: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #4b5563; background: transparent; }
                .btn-call.active { background: #111827; color: #fff; }
                .chat-tag-pill { padding: 4px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; }
                .tag-group { background: #fef9c3; color: #854d0e; }
                .tag-ai { background: #ede9fe; color: #7c3aed; }
                .messages-area { flex: 1; overflow-y: auto; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; background: #f9fafb; }
                .msg-row { display: flex; gap: 0.75rem; max-width: 80%; }
                .msg-me { align-self: flex-end; flex-direction: row-reverse; }
                .bubble { padding: 0.75rem 1rem; border-radius: 12px; font-size: 0.9rem; line-height: 1.4; }
                .bubble-them { background: #fff; border: 1px solid #e5e7eb; }
                .bubble-me { background: #111827; color: #fff; }
                .msg-time { font-size: 0.65rem; color: #9ca3af; margin-top: 4px; display: block; }
                .compose-bar { padding: 1rem 1.5rem; border-top: 1px solid #e5e7eb; display: flex; gap: 0.75rem; }
                .compose-input { flex: 1; border: 1px solid #d1d5db; border-radius: 8px; padding: 0.6rem 1rem; outline: none; }
                .btn-send { background: #111827; color: #fff; border: none; padding: 0.6rem 1.25rem; border-radius: 8px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; }
                .empty-state { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #9ca3af; }
                .participants-sidebar { width: 260px; border-left: 1px solid #e5e7eb; background: #fafafa; }
                .participant-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; }
                .p-info { font-size: 0.85rem; }
                .p-name { font-weight: 600; }
                .p-status { font-size: 0.7rem; color: #6b7280; }
                .teams-call-stage {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    background: #201f1f;
                    position: relative;
                }
                .teams-call-header {
                    height: 48px;
                    background: #1b1a1a;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 1rem;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                .teams-meeting-title {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    color: #fff;
                    font-size: 0.85rem;
                    font-weight: 600;
                }
                .teams-icon-users {
                    width: 24px;
                    height: 24px;
                    background: #464775;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    transform: scale(0.8);
                }
                .teams-metadata {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    color: #fff;
                    font-size: 0.8rem;
                }
                .teams-video-frame {
                    flex: 1;
                    position: relative;
                    display: flex;
                    align-items: stretch;
                    justify-content: center;
                    background: #000;
                    overflow: hidden;
                }
                .teams-floating-controls {
                    position: absolute;
                    bottom: 32px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #2b2b2b;
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 8px 16px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    box-shadow: 0 16px 48px rgba(0,0,0,0.6);
                    z-index: 1000;
                }
                .control-group {
                    display: flex;
                    gap: 8px;
                }
                .teams-btn-round {
                    width: 36px;
                    height: 36px;
                    border-radius: 4px;
                    border: none;
                    background: transparent;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .teams-btn-round:hover {
                    background: rgba(255,255,255,0.1);
                }
                .divider-teams {
                    width: 1px;
                    height: 24px;
                    background: rgba(255,255,255,0.1);
                }
                .teams-btn-leave {
                    background: #c4314b;
                    color: #fff;
                    border: none;
                    padding: 6px 16px;
                    border-radius: 4px;
                    font-weight: 700;
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .teams-btn-leave:hover {
                    background: #a3293f;
                }
                
                /* Zego UI Overrides to match Teams */
                :global(.teams-video-frame > div iframe) {
                    border-radius: 12px !important;
                }
                /* Call Notification Styles */
                .call-signal-msg {
                    padding: 0.5rem 0;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    min-width: 210px;
                }
                .call-info {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                .call-icon-pulse {
                    position: relative;
                    width: 44px;
                    height: 44px;
                    background: #464775;
                    color: #fff;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    z-index: 1;
                }
                .pulse-ring {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: #464775;
                    opacity: 0.3;
                    animation: pulse 2s infinite;
                    z-index: -1;
                }
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 0.4; }
                    100% { transform: scale(2); opacity: 0; }
                }
                .call-text h3 {
                    margin: 0;
                    font-size: 0.95rem;
                    font-weight: 700;
                    color: inherit;
                }
                .call-text p {
                    margin: 2px 0 0;
                    font-size: 0.75rem;
                    opacity: 0.7;
                }
                .btn-join-call {
                    width: 100%;
                    background: #464775;
                    color: #fff;
                    border: none;
                    padding: 0.6rem;
                    border-radius: 6px;
                    font-weight: 700;
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    box-shadow: 0 4px 12px rgba(70, 71, 117, 0.2);
                }
                .btn-join-call:hover {
                    background: #3b3c63;
                    transform: translateY(-1px);
                    box-shadow: 0 6px 16px rgba(70, 71, 117, 0.3);
                }
                .call-ended-msg {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.25rem 0;
                    opacity: 0.8;
                }
                .ended-icon-box {
                    width: 28px;
                     height: 28px;
                     background: #f3f4f6;
                     color: #6b7280;
                     border-radius: 50%;
                     display: flex;
                     align-items: center;
                     justify-content: center;
                 }
                 .bubble-me .ended-icon-box {
                     background: rgba(255,255,255,0.1);
                     color: #fff;
                 }
                 .call-ended-msg span {
                     font-size: 0.85rem;
                     font-weight: 500;
                 }
            `}</style>
        </div>
    );
}

export default function MessagesPage() {
    return (
        <Suspense fallback={
            <div className="messages-root" style={{ alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500 }}>Loading Messages...</div>
            </div>
        }>
            <MessagesContent />
        </Suspense>
    );
}
