"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getUserProfile, updateUserProfile, Profile } from "@/lib/supabase-db";
import Link from "next/link";

// ── Icons ─────────────────────────────────────────────────────────────────────
const I = {
    Back: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>,
    User: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    Bio: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
    Project: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>,
    Code: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    Shield: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    LogOut: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>,
    Check: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
    Ext: () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>,
    Plus: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
    Trash: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>,
    GitHub: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.301-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" /></svg>,
    LC: () => <img src="/assests/leetcode.png" alt="LeetCode" width={18} height={18} style={{ borderRadius: 3, objectFit: 'contain' as const }} />,
    CC: () => <img src="/assests/codechef.png" alt="CodeChef" width={26} height={26} style={{ borderRadius: 3, objectFit: 'contain' as const }} />,
};

// ── Types ─────────────────────────────────────────────────────────────────────
type Tab = 'profile' | 'bio' | 'projects' | 'connected' | 'security';
type AccCfg = { key: string; label: string; ph: string; icon: React.ReactNode; accent: string; bg: string; url: (u: string) => string; };

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'profile', label: 'Profile', icon: <I.User /> },
    { id: 'bio', label: 'Bio & Portfolio', icon: <I.Bio /> },
    { id: 'projects', label: 'Projects & Links', icon: <I.Project /> },
    { id: 'connected', label: 'Connected Accounts', icon: <I.Code /> },
    { id: 'security', label: 'Security', icon: <I.Shield /> },
];

const ACCOUNTS: AccCfg[] = [
    { key: 'github', label: 'GitHub', ph: 'username', icon: <I.GitHub />, accent: '#000000', bg: '#f3f4f6', url: u => `https://github.com/${u}` },
    { key: 'leetcode', label: 'LeetCode', ph: 'username', icon: <I.LC />, accent: '#d97706', bg: '#fffbeb', url: u => `https://leetcode.com/u/${u}` },
    { key: 'codechef', label: 'CodeChef', ph: 'username', icon: <I.CC />, accent: '#92400e', bg: '#fefce8', url: u => `https://codechef.com/users/${u}` },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="s-label">{children}</label>
);
const Input = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input className="s-input" {...props} />
);
const Textarea = ({ ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea className="s-textarea" {...props} />
);
const FieldBlock = ({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) => (
    <div className="s-field">
        <Label>{label}</Label>
        {children}
        {hint && <span className="s-hint">{hint}</span>}
    </div>
);
const SectionCard = ({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) => (
    <div className="s-card">
        {(title || sub) && (
            <div className="s-card-head">
                <div className="s-card-title">{title}</div>
                {sub && <div className="s-card-sub">{sub}</div>}
            </div>
        )}
        <div className="s-card-body">{children}</div>
    </div>
);
const SaveRow = ({ onClick, saving, label = 'Save Changes' }: { onClick: () => void; saving: boolean; label?: string }) => (
    <div className="s-save-row">
        {saving && <span className="s-saved-msg"><I.Check /> Saved</span>}
        <button className="s-save-btn" onClick={onClick} disabled={saving}>{label}</button>
    </div>
);

// ── AccountRow ────────────────────────────────────────────────────────────────
function AccountRow({ cfg, val, onSave, onRemove }: { cfg: AccCfg; val: string | null; onSave: (v: string) => void; onRemove: () => void; }) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(val ?? '');
    const commit = () => { if (draft.trim()) { onSave(draft.trim()); setEditing(false); } };
    return (
        <div className="acc-row">
            <div className="acc-left">
                <div className="acc-logo" style={{ background: val ? cfg.bg : '#f3f4f6', color: cfg.accent }}>{cfg.icon}</div>
                <div>
                    <div className="acc-name">{cfg.label}</div>
                    {val
                        ? <a className="acc-link" href={cfg.url(val)} target="_blank" rel="noreferrer">@{val} <I.Ext /></a>
                        : <span className="acc-none">Not connected</span>}
                </div>
            </div>
            <div className="acc-actions">
                {val && !editing && (
                    <>
                        <span className="conn-badge"><I.Check /> Connected</span>
                        <button className="s-btn ghost" onClick={() => { setDraft(val); setEditing(true); }}>Edit</button>
                        <button className="s-btn danger" onClick={onRemove}>Remove</button>
                    </>
                )}
                {editing && (
                    <>
                        <input className="s-input sm" placeholder={cfg.ph} value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === 'Enter' && commit()} autoFocus />
                        <button className="s-btn dark" onClick={commit} disabled={!draft.trim()}>Save</button>
                        <button className="s-btn ghost" onClick={() => setEditing(false)}>Cancel</button>
                    </>
                )}
                {!val && !editing && (
                    <button className="s-btn" style={{ background: cfg.accent, color: '#fff', borderColor: cfg.accent }} onClick={() => setEditing(true)}>Connect</button>
                )}
            </div>
        </div>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SettingsPage() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [tab, setTab] = useState<Tab>('profile');

    const [profile, setProfile] = useState<Profile | null>(null);
    const [displayName, setDisplayName] = useState('');
    const [profileSaving, setProfileSaving] = useState(false);
    const [profileMsg, setProfileMsg] = useState<{ ok: boolean; text: string } | null>(null);

    const [bio, setBio] = useState('');
    const [role, setRole] = useState('');
    const [exp, setExp] = useState('');
    const [location, setLocation] = useState('');
    const [website, setWebsite] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [skillDraft, setSkillDraft] = useState('');
    const [bioSaving, setBioSaving] = useState(false);

    const [projects, setProjects] = useState<{ name: string; url: string; desc: string; tech: string }[]>([]);
    const [pn, setPn] = useState(''); const [pu, setPu] = useState(''); const [pd, setPd] = useState(''); const [pt, setPt] = useState('');

    const [connected, setConnected] = useState<Record<string, string | null>>({ github: null, leetcode: null, codechef: null });

    useEffect(() => {
        if (user?.id) {
            getUserProfile(user.id)
                .then(d => { if (d) { setProfile(d); setDisplayName(d.display_name || ''); } })
                .catch(err => console.error('Failed to fetch profile:', err));
        }
        try {
            const acc = localStorage.getItem('connected_accounts'); if (acc) setConnected(JSON.parse(acc));
            const b = localStorage.getItem('user_bio'); if (b) { const p = JSON.parse(b); setBio(p.bio || ''); setRole(p.role || ''); setExp(p.exp || ''); setLocation(p.location || ''); setWebsite(p.website || ''); setSkills(p.skills || []); }
            const pr = localStorage.getItem('user_projects'); if (pr) setProjects(JSON.parse(pr));
        } catch (err) {
            console.error('Failed to load local storage data:', err);
        }
    }, [user]);
    const saveProfile = async () => {
        if (!user?.id) return;
        setProfileSaving(true); setProfileMsg(null);
        try { await updateUserProfile(user.id, { display_name: displayName }); setProfileMsg({ ok: true, text: 'Profile updated.' }); }
        catch { setProfileMsg({ ok: false, text: 'Update failed. Please try again.' }); }
        finally { setProfileSaving(false); setTimeout(() => setProfileMsg(null), 3000); }
    };
    const saveBio = () => { setBioSaving(true); localStorage.setItem('user_bio', JSON.stringify({ bio, role, exp, location, website, skills })); setTimeout(() => setBioSaving(false), 700); };
    const addSkill = () => { const s = skillDraft.trim(); if (s && !skills.includes(s)) setSkills(p => [...p, s]); setSkillDraft(''); };
    const addProject = () => {
        if (!pn.trim() || !pu.trim()) return;
        const updated = [...projects, { name: pn.trim(), url: pu.trim(), desc: pd.trim(), tech: pt.trim() }];
        setProjects(updated); localStorage.setItem('user_projects', JSON.stringify(updated));
        setPn(''); setPu(''); setPd(''); setPt('');
    };
    const removeProject = (i: number) => { const u = projects.filter((_, idx) => idx !== i); setProjects(u); localStorage.setItem('user_projects', JSON.stringify(u)); };
    const saveAcc = (k: string, v: string) => { const u = { ...connected, [k]: v }; setConnected(u); localStorage.setItem('connected_accounts', JSON.stringify(u)); };
    const removeAcc = (k: string) => { const u = { ...connected, [k]: null }; setConnected(u); localStorage.setItem('connected_accounts', JSON.stringify(u)); };
    const handleLogout = async () => { await logout(); router.push('/'); };

    const initials = displayName
        ? displayName.split(' ').filter(w => w.length > 0).map(w => w[0]).join('').toUpperCase().slice(0, 2)
        : (user?.email?.[0] || '?').toUpperCase();
    return (
        <div className="s-root dashboard-page">
            <div className="s-layout">

                {/* ── Sidebar ── */}
                <aside className="s-sidebar">
                    <Link href="/dashboard" className="s-back-link">
                        <I.Back /> Back to Dashboard
                    </Link>

                    {/* Avatar */}
                    <div className="s-avatar-wrap">
                        <div className="s-avatar">{initials}</div>
                        <div className="s-avatar-info">
                            <div className="s-avatar-name">{displayName || 'Your Name'}</div>
                            <div className="s-avatar-email" title={user?.email || ""}>{user?.email}</div>
                        </div>
                    </div>

                    <nav className="s-nav">
                        {TABS.map(t => (
                            <button key={t.id} className={`s-nav-item ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
                                {t.icon} {t.label}
                            </button>
                        ))}
                        <div className="s-nav-divider" />
                        <button className="s-nav-item s-nav-danger" onClick={handleLogout}>
                            <I.LogOut /> Sign Out
                        </button>
                    </nav>
                </aside>

                {/* ── Content ── */}
                <main className="s-content">

                    {/* PROFILE */}
                    {tab === 'profile' && (
                        <>
                            <div className="s-page-head">
                                <h2>Profile</h2>
                                <p>Your public identity on the Twonnect platform.</p>
                            </div>
                            <SectionCard title="Personal Details" sub="Update your name visible to co-founders and collaborators.">
                                {profileMsg && (
                                    <div className={`s-alert ${profileMsg.ok ? 'ok' : 'err'}`}>{profileMsg.text}</div>
                                )}
                                <div className="s-grid2">
                                    <FieldBlock label="Full Name">
                                        <Input value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="e.g. Alex Johnson" />
                                    </FieldBlock>
                                    <FieldBlock label="Email Address">
                                        <Input value={user?.email || ''} disabled style={{ background: '#f8fafc', color: '#94a3b8', cursor: 'not-allowed' }} />
                                    </FieldBlock>
                                </div>
                                <SaveRow onClick={saveProfile} saving={profileSaving} />
                            </SectionCard>
                        </>
                    )}

                    {/* BIO */}
                    {tab === 'bio' && (
                        <>
                            <div className="s-page-head">
                                <h2>Bio & Portfolio</h2>
                                <p>Help co-founders and investors understand who you are and what you bring.</p>
                            </div>
                            <SectionCard title="Professional Identity">
                                <div className="s-grid2">
                                    <FieldBlock label="Current Role / Title">
                                        <Input value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. Full-Stack Engineer" />
                                    </FieldBlock>
                                    <FieldBlock label="Years of Experience">
                                        <Input value={exp} onChange={e => setExp(e.target.value)} placeholder="e.g. 4 years" />
                                    </FieldBlock>
                                    <FieldBlock label="Location">
                                        <Input value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Hyderabad, India" />
                                    </FieldBlock>
                                    <FieldBlock label="Personal Website">
                                        <Input value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://yoursite.com" />
                                    </FieldBlock>
                                </div>
                            </SectionCard>

                            <SectionCard title="About Me" sub="Shown on your public co-founder profile. Keep it clear and honest.">
                                <FieldBlock label="Bio">
                                    <Textarea value={bio} onChange={e => { if (e.target.value.length <= 500) setBio(e.target.value); }} placeholder="Tell co-founders and investors who you are — your background, what problems excite you, and what you're building next." rows={5} />
                                </FieldBlock>
                                <div className="s-char-count">{bio.length} / 500</div>
                            </SectionCard>

                            <SectionCard title="Skills & Expertise" sub="Add technologies, domains, and tools you're proficient in.">
                                <div className="s-skill-input-row">
                                    <Input value={skillDraft} onChange={e => setSkillDraft(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSkill()} placeholder="Type a skill and press Enter (e.g. React, Figma, Go)" />
                                    <button className="s-add-btn" onClick={addSkill} disabled={!skillDraft.trim()}><I.Plus /> Add</button>
                                </div>
                                {skills.length > 0 ? (
                                    <div className="s-tags">
                                        {skills.map(s => (
                                            <span key={s} className="s-tag">{s}<button className="s-tag-x" onClick={() => setSkills(p => p.filter(x => x !== s))}>×</button></span>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="s-empty-mini">No skills added yet</div>
                                )}
                                <SaveRow onClick={saveBio} saving={bioSaving} label="Save Bio" />
                            </SectionCard>
                        </>
                    )}

                    {/* PROJECTS */}
                    {tab === 'projects' && (
                        <>
                            <div className="s-page-head">
                                <h2>Projects & Links</h2>
                                <p>Showcase your work — side projects, open source, or portfolio pieces.</p>
                            </div>
                            <SectionCard title="Add a Project">
                                <div className="s-grid2">
                                    <FieldBlock label="Project Name">
                                        <Input value={pn} onChange={e => setPn(e.target.value)} placeholder="e.g. Twonnect Platform" />
                                    </FieldBlock>
                                    <FieldBlock label="URL / Link">
                                        <Input value={pu} onChange={e => setPu(e.target.value)} placeholder="https://..." />
                                    </FieldBlock>
                                </div>
                                <FieldBlock label="Short Description">
                                    <Input value={pd} onChange={e => setPd(e.target.value)} placeholder="What does it do?" />
                                </FieldBlock>
                                <FieldBlock label="Tech Stack">
                                    <Input value={pt} onChange={e => setPt(e.target.value)} placeholder="e.g. Next.js, Supabase, TailwindCSS" />
                                </FieldBlock>
                                <div className="s-save-row">
                                    <button className="s-save-btn" onClick={addProject} disabled={!pn.trim() || !pu.trim()} style={{ opacity: (!pn.trim() || !pu.trim()) ? 0.45 : 1 }}>
                                        <I.Plus /> Add Project
                                    </button>
                                </div>
                            </SectionCard>

                            {projects.length > 0 && (
                                <div className="proj-list">
                                    {projects.map((p, i) => (
                                        <div key={i} className="proj-card">
                                            <div className="proj-main">
                                                <div className="proj-top">
                                                    <span className="proj-name">{p.name}</span>
                                                    {p.tech && <span className="proj-tech">{p.tech}</span>}
                                                </div>
                                                {p.desc && <p className="proj-desc">{p.desc}</p>}
                                                <a href={p.url} target="_blank" rel="noreferrer" className="proj-link">{p.url} <I.Ext /></a>
                                            </div>
                                            <button className="proj-del" onClick={() => removeProject(i)}>
                                                <I.Trash />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {projects.length === 0 && (
                                <div className="s-empty-state">
                                    <div className="s-empty-icon"><I.Project /></div>
                                    <span>No projects yet. Add your first one above.</span>
                                </div>
                            )}
                        </>
                    )}

                    {/* CONNECTED */}
                    {tab === 'connected' && (
                        <>
                            <div className="s-page-head">
                                <h2>Connected Accounts</h2>
                                <p>Link your developer profiles to enrich your founder identity.</p>
                            </div>
                            <SectionCard title="Developer Profiles" sub="Connect once — visible on your public profile and discoverable by co-founders.">
                                {ACCOUNTS.map(cfg => (
                                    <AccountRow key={cfg.key} cfg={cfg} val={connected[cfg.key] ?? null} onSave={v => saveAcc(cfg.key, v)} onRemove={() => removeAcc(cfg.key)} />
                                ))}
                            </SectionCard>
                        </>
                    )}

                    {/* SECURITY */}
                    {tab === 'security' && (
                        <>
                            <div className="s-page-head">
                                <h2>Security</h2>
                                <p>Manage your session and account access.</p>
                            </div>
                            <SectionCard title="Account Identity">
                                <div className="sec-row">
                                    <div>
                                        <div className="sec-label">Email Address</div>
                                        <div className="sec-value">{user?.email}</div>
                                        <div className="sec-note">Managed via your authentication provider. Contact support to update.</div>
                                    </div>
                                </div>
                            </SectionCard>
                            <SectionCard title="Active Session">
                                <div className="sec-row">
                                    <div>
                                        <div className="sec-label">Current Device</div>
                                        <div className="sec-value">Web — {typeof window !== 'undefined' && navigator.userAgent.includes('Mac') ? 'macOS' : 'Windows'}</div>
                                        <div className="sec-note">You are currently signed in on this device.</div>
                                    </div>
                                    <button className="s-btn danger" style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 6 }} onClick={handleLogout}>
                                        <I.LogOut /> Sign Out
                                    </button>
                                </div>
                            </SectionCard>
                            <SectionCard title="Support">
                                <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6, margin: '0 0 1.25rem' }}>For technical issues or billing inquiries, reach our team directly.</p>
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <button className="s-btn ghost" style={{ padding: '0.625rem 1.25rem', fontSize: '0.85rem' }} onClick={() => router.push('/dashboard/help')}>Knowledge Base</button>
                                    <button className="s-btn ghost" style={{ padding: '0.625rem 1.25rem', fontSize: '0.85rem' }} onClick={() => window.open('mailto:support@twonnect.me')}>Email Support</button>
                                </div>
                            </SectionCard>
                        </>
                    )}

                </main>
            </div>

            <style jsx global>{`
                /* ── Root ── */
                .s-root { padding: 0; margin: 0; width: 100%; box-sizing: border-box; background: #f9fafb; min-height: 100vh; }
                .s-layout { display: grid; grid-template-columns: 280px 1fr; gap: 0; align-items: stretch; min-height: 100vh; }

                /* ── Sidebar ── */
                .s-sidebar {
                    position: sticky; top: 0;
                    display: flex; flex-direction: column; gap: 1rem;
                    background: #ffffff;
                    border-right: 1px solid #e5e7eb;
                    padding: 2rem 1.25rem;
                    height: 100vh;
                }
                .s-back-link {
                    display: flex; align-items: center; gap: 0.5rem;
                    padding: 0.75rem 1rem; margin-bottom: 1rem;
                    color: #64748b; font-size: 0.875rem; font-weight: 600;
                    text-decoration: none; border-radius: 10px;
                    transition: all 0.2s;
                }
                .s-back-link:hover { background: #f1f5f9; color: #000000; }

                .s-avatar-wrap { display: flex; align-items: center; gap: 0.875rem; padding: 1.25rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 0.5rem; }
                .s-avatar { width: 42px; height: 42px; border-radius: 10px; background: #000000; color: #ffffff; font-size: 1rem; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; letter-spacing: -0.02em; }
                .s-avatar-name { font-size: 0.875rem; font-weight: 700; color: #000000; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .s-avatar-email { font-size: 0.72rem; color: #9ca3af; margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 160px; }
                .s-nav { display: flex; flex-direction: column; gap: 2px; background: transparent; padding: 0; }
                .s-nav-item { display: flex; align-items: center; gap: 0.625rem; width: 100%; padding: 0.75rem 1rem; background: transparent; border: none; border-radius: 10px; font-size: 0.875rem; font-weight: 500; color: #4b5563; cursor: pointer; text-align: left; transition: all 0.12s; font-family: inherit; }
                .s-nav-item:hover { background: #f3f4f6; color: #000000; }
                .s-nav-item.active { background: #000000; color: #ffffff; font-weight: 600; }
                .s-nav-divider { border-top: 1px solid #f1f5f9; margin: 0.75rem 0; }
                .s-nav-danger { color: #b91c1c; }
                .s-nav-danger:hover { background: #fef2f2; color: #b91c1c; }

                /* ── Content ── */
                .s-content {
                    padding: 4rem 6rem;
                    display: flex; flex-direction: column; gap: 1.5rem;
                    min-width: 0; flex: 1;
                    max-width: 1100px;
                }
                .s-page-head { margin-bottom: 0.25rem; }
                .s-page-head h2 { font-size: 1.35rem; font-weight: 700; color: #0f172a; margin: 0; letter-spacing: -0.02em; }
                .s-page-head p { font-size: 0.85rem; color: #64748b; margin: 0.25rem 0 0; }

                /* ── Card ── */
                .s-card { background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
                .s-card-head { padding: 1.25rem 1.5rem; border-bottom: 1px solid #f3f4f6; }
                .s-card-title { font-size: 0.875rem; font-weight: 700; color: #0f172a; }
                .s-card-sub { font-size: 0.78rem; color: #64748b; margin-top: 2px; }
                .s-card-body { padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem; }

                /* ── Fields ── */
                .s-label { display: block; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; margin-bottom: 0.4rem; }
                .s-field { display: flex; flex-direction: column; }
                .s-hint { font-size: 0.72rem; color: #94a3b8; margin-top: 0.3rem; }
                .s-input {
                    width: 100%; padding: 0.7rem 0.875rem; border: 1px solid #d1d5db; border-radius: 8px;
                    font-size: 0.875rem; color: #000000; font-family: inherit; background: #fff;
                    outline: none; transition: border-color 0.15s, box-shadow 0.15s; box-sizing: border-box;
                }
                .s-input:focus { border-color: #000000; box-shadow: 0 0 0 2px rgba(17,24,39,0.08); }
                .s-input.sm { width: 160px; }
                .s-textarea {
                    width: 100%; padding: 0.7rem 0.875rem; border: 1px solid #d1d5db; border-radius: 8px;
                    font-size: 0.875rem; color: #000000; font-family: inherit; background: #fff;
                    outline: none; transition: border-color 0.15s, box-shadow 0.15s;
                    resize: vertical; line-height: 1.6; box-sizing: border-box;
                }
                .s-textarea:focus { border-color: #000000; box-shadow: 0 0 0 2px rgba(17,24,39,0.08); }
                .s-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
                .s-char-count { font-size: 0.72rem; color: #94a3b8; text-align: right; }

                /* ── Skills ── */
                .s-skill-input-row { display: flex; gap: 0.625rem; }
                .s-add-btn { display: flex; align-items: center; gap: 4px; padding: 0.7rem 1rem; background: #000000; color: #fff; border: none; border-radius: 8px; font-size: 0.8rem; font-weight: 600; cursor: pointer; white-space: nowrap; font-family: inherit; transition: background 0.15s; }
                .s-add-btn:hover:not(:disabled) { background: #374151; }
                .s-add-btn:disabled { opacity: 0.4; cursor: not-allowed; }
                .s-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
                .s-tag { display: inline-flex; align-items: center; gap: 5px; background: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 6px; padding: 4px 10px; font-size: 0.78rem; font-weight: 600; color: #374151; }
                .s-tag-x { background: none; border: none; cursor: pointer; color: #9ca3af; font-size: 1rem; padding: 0; line-height: 1; font-family: inherit; }
                .s-tag-x:hover { color: #374151; }
                .s-empty-mini { font-size: 0.8rem; color: #9ca3af; padding: 0.5rem 0; }

                /* ── Save Row ── */
                .s-save-row { display: flex; align-items: center; justify-content: flex-end; gap: 1rem; padding-top: 0.75rem; border-top: 1px solid #f3f4f6; }
                .s-save-btn { padding: 0.7rem 1.75rem; background: #000000; color: #fff; border: none; border-radius: 8px; font-size: 0.875rem; font-weight: 600; cursor: pointer; font-family: inherit; transition: background 0.15s; display: flex; align-items: center; gap: 6px; }
                .s-save-btn:hover:not(:disabled) { background: #374151; }
                .s-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
                .s-saved-msg { display: flex; align-items: center; gap: 4px; font-size: 0.8rem; color: #059669; font-weight: 600; }

                /* ── Alert ── */
                .s-alert { padding: 0.75rem 1rem; border-radius: 6px; font-size: 0.85rem; font-weight: 500; }
                .s-alert.ok { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
                .s-alert.err { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }

                /* ── Buttons ── */
                .s-btn { padding: 5px 14px; border-radius: 7px; font-size: 0.78rem; font-weight: 600; cursor: pointer; border: 1px solid; font-family: inherit; transition: background 0.12s; white-space: nowrap; }
                .s-btn.dark { background: #000000; color: #fff; border-color: #000000; }
                .s-btn.dark:hover:not(:disabled) { background: #374151; }
                .s-btn.dark:disabled { opacity: 0.4; cursor: not-allowed; }
                .s-btn.ghost { background: #fff; color: #374151; border-color: #d1d5db; }
                .s-btn.ghost:hover { background: #f3f4f6; }
                .s-btn.danger { background: #fef2f2; color: #b91c1c; border-color: #fca5a5; }
                .s-btn.danger:hover { background: #fee2e2; }

                /* ── Connected Accounts ── */
                .acc-row { display: flex; align-items: center; justify-content: space-between; padding: 1rem 0; border-bottom: 1px solid #f3f4f6; gap: 1rem; }
                .acc-row:last-child { border-bottom: none; padding-bottom: 0; }
                .acc-row:first-child { padding-top: 0; }
                .acc-left { display: flex; align-items: center; gap: 0.875rem; }
                .acc-logo { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .acc-name { font-size: 0.875rem; font-weight: 600; color: #000000; }
                .acc-link { font-size: 0.775rem; color: #2563eb; display: flex; align-items: center; gap: 4px; text-decoration: none; margin-top: 1px; }
                .acc-link:hover { text-decoration: underline; }
                .acc-none { font-size: 0.775rem; color: #9ca3af; display: block; margin-top: 1px; }
                .acc-actions { display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0; }
                .conn-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 0.68rem; font-weight: 700; color: #059669; background: #d1fae5; border: 1px solid #6ee7b7; padding: 3px 10px; border-radius: 20px; }

                /* ── Projects ── */
                .proj-list { display: flex; flex-direction: column; gap: 0.75rem; }
                .proj-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 1.25rem 1.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
                .proj-main { flex: 1; min-width: 0; }
                .proj-top { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 4px; }
                .proj-name { font-size: 0.9rem; font-weight: 700; color: #000000; }
                .proj-tech { font-size: 0.72rem; color: #7c3aed; background: #ede9fe; border: 1px solid #ddd6fe; padding: 2px 8px; border-radius: 4px; font-weight: 600; }
                .proj-desc { font-size: 0.8rem; color: #6b7280; margin: 0 0 4px; }
                .proj-link { font-size: 0.78rem; color: #2563eb; display: inline-flex; align-items: center; gap: 4px; text-decoration: none; }
                .proj-link:hover { text-decoration: underline; }
                .proj-del { background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; border-radius: 6px; padding: 7px 10px; cursor: pointer; display: flex; align-items: center; flex-shrink: 0; }
                .proj-del:hover { background: #fee2e2; }

                /* ── Security ── */
                .sec-row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
                .sec-label { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; }
                .sec-value { font-size: 0.9rem; font-weight: 600; color: #000000; margin-top: 3px; }
                .sec-note { font-size: 0.78rem; color: #94a3b8; margin-top: 2px; }

                /* ── Empty State ── */
                .s-empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem; padding: 3rem; border: 1px dashed #e5e7eb; border-radius: 12px; color: #9ca3af; font-size: 0.875rem; }
                .s-empty-icon { width: 48px; height: 48px; border-radius: 12px; background: #f3f4f6; border: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: center; }

                @media (max-width: 768px) {
                    .s-layout { grid-template-columns: 1fr; }
                    .s-sidebar { position: static; }
                    .s-nav { flex-direction: row; flex-wrap: wrap; }
                    .s-grid2 { grid-template-columns: 1fr; }
                    .s-skill-input-row { flex-direction: column; }
                }
            `}</style>
        </div>
    );
}
