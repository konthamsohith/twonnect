"use client";

import React, { useState, useEffect } from "react";
import { getCollaborativeIdeas, Idea, createInvestment, getUserInvestments, Investment, deleteInvestment, getPlatformStats } from "@/lib/supabase-db";
import { useAuth } from "@/context/AuthContext";

// ── Icons (Institutional Standard) ──────────────────────────────
const IconTrendingUp = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
);
const IconUsers = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
const IconBriefcase = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
);
const IconShield = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
);
const IconCheckCircle = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
);



export default function InvestorsPage() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'marketplace' | 'portfolio'>('marketplace');
    const [marketDeals, setMarketDeals] = useState<any[]>([]);
    const [portfolioDeals, setPortfolioDeals] = useState<Investment[]>([]);
    const [platformStats, setPlatformStats] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal States
    const [reviewDeal, setReviewDeal] = useState<any | null>(null);
    const [investDeal, setInvestDeal] = useState<any | null>(null);
    const [capTableDeal, setCapTableDeal] = useState<any | null>(null);
    const [exitDeal, setExitDeal] = useState<any | null>(null);
    const [exitMode, setExitMode] = useState<'exit' | 'no-interest'>('exit');
    const [investAmount, setInvestAmount] = useState<string>("250,000");

    useEffect(() => {
        const fetchDeals = async () => {
            if (!user?.id) return;
            setLoading(true);
            try {
                // Fetch Platform Stats
                const stats = await getPlatformStats();
                if (stats) {
                    const icons = [<IconBriefcase />, <IconUsers />, <IconTrendingUp />];
                    setPlatformStats(stats.map((s, i) => ({ ...s, icon: icons[i] })));
                }

                const portfolio = await getUserInvestments(user.id);
                setPortfolioDeals(portfolio);

                const collaborativeIdeas = await getCollaborativeIdeas();
                const uninvestedIdeas = collaborativeIdeas.filter(idea =>
                    !portfolio.find(p => p.idea_id === idea.id)
                );

                const formattedDeals = uninvestedIdeas.map((idea: Idea) => {
                    const impactNum = idea.impact && !isNaN(Number(idea.impact)) ? Number(idea.impact) : 85;
                    const score = impactNum;

                    const target = typeof idea.funding_required === 'number' ? idea.funding_required :
                        (typeof idea.funding_required === 'string' ? parseInt(idea.funding_required.replace(/[^0-9]/g, '')) :
                            (500000 + ((score - 75) * 100000)));

                    const raised = idea.amount_raised || (target * (0.2 + ((idea.description.length % 10) / 15)));
                    const valuationNum = idea.valuation ? (typeof idea.valuation === 'number' ? idea.valuation : parseFloat(String(idea.valuation).replace(/[^0-9.]/g, '')) * 1000000) : (Number(target) * 5);
                    const momentumPct = 100 + (impactNum % 50);

                    return {
                        id: idea.id,
                        shortId: (idea.id || "").substring(0, 8).toUpperCase(),
                        name: idea.title,
                        oneLiner: idea.description.length > 80 ? idea.description.substring(0, 77) + "..." : idea.description,
                        fullDescription: idea.description,
                        authorName: idea.author_name,
                        raised: Number(raised),
                        target: Number(target),
                        valuation: idea.valuation ? (typeof idea.valuation === 'number' ? `$${(idea.valuation / 1000000).toFixed(1)}M` : idea.valuation) : `$${(valuationNum / 1000000).toFixed(1)}M Post-Money`,
                        valuationNum: valuationNum,
                        validationScore: score,
                        momentum: `+${momentumPct}% MoM Activity`,
                        status: Number(raised) / Number(target) > 0.8 ? "Closing Soon" : "Active"
                    };
                });

                setMarketDeals(formattedDeals);
            } catch (error) {
                console.error("Failed to fetch marketplace ideas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDeals();
    }, [user?.id]);

    const handleInvestClick = (deal: any) => {
        setInvestDeal(deal);
        setInvestAmount("250,000");
    };

    const confirmInvestment = async () => {
        if (!investDeal || !user?.id) return;

        const investedAmount = parseInt(investAmount.replace(/,/g, ''), 10);
        if (isNaN(investedAmount) || investedAmount < 1000) {
            alert("Invalid investment amount. Minimum check size is $1,000.");
            return;
        }

        const investmentData = {
            user_id: user.id,
            idea_id: investDeal.id,
            amount: investedAmount,
            entry_valuation: investDeal.valuation,
            status: "Performing"
        };

        const result = await createInvestment(investmentData);
        if (result) {
            setPortfolioDeals(prev => [...prev, { ...result, idea_title: investDeal.name, idea_description: investDeal.fullDescription }]);
            setMarketDeals(prev => prev.filter(d => d.id !== investDeal.id));
            setInvestDeal(null);
            alert("Investment finalized. Transaction recorded in the secure ledger.");
        } else {
            alert("Transaction failed. Peer node rejected the signatures.");
        }
    };

    const handleExit = (deal: any, mode: 'exit' | 'no-interest') => {
        setExitDeal(deal);
        setExitMode(mode);
    };

    const confirmExit = async () => {
        if (!exitDeal?.id) return;
        const success = await deleteInvestment(exitDeal.id);
        if (success) {
            setPortfolioDeals(prev => prev.filter(d => d.id !== exitDeal.id));
            // Add back to marketplace if it was an exit (simplified for demo)
            setExitDeal(null);
        } else {
            alert("Exit failed. Transaction could not be finalized.");
        }
    };

    return (
        <div className="dashboard-page institutional-portal">
            <header className="portal-header">
                <div className="exclusive-pill">INSTITUTIONAL DEAL ROOM</div>
                <h1 style={{ fontSize: "32px", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: "1", marginBottom: "1rem" }}>Live Opportunities</h1>
                <p>Institutional-grade ventures. Restricted access for authorized partners.</p>
            </header>

            <div className="section-header" style={{ marginBottom: "2rem" }}>
                <div className="tab-navigation">
                    <button
                        className={`tab-btn ${activeTab === 'marketplace' ? 'active' : ''}`}
                        onClick={() => setActiveTab('marketplace')}
                    >
                        Marketplace Deals <span className="count-badge">{marketDeals.length}</span>
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'portfolio' ? 'active' : ''}`}
                        onClick={() => setActiveTab('portfolio')}
                    >
                        My Portfolio <span className="count-badge">{portfolioDeals.length}</span>
                    </button>
                </div>
            </div>

            {/* ── PLATFORM MACRO STATS ──────────────────────────────── */}
            <div className="macro-stats-row" style={{ marginBottom: "2.5rem" }}>
                {platformStats.map((stat, i) => (
                    <div key={i} className="stat-card">
                        <div className="stat-icon-wrapper">{stat.icon}</div>
                        <div className="stat-data">
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── DEAL ROOM TABS ─────────────────────────────────────── */}
            <div className="deals-section">

                <div className="deals-grid">
                    {/* ── MARKETPLACE VIEW ── */}
                    {activeTab === 'marketplace' && loading && (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 2rem', color: '#6b7280' }}>
                            Loading Institutional Data...
                        </div>
                    )}

                    {activeTab === 'marketplace' && !loading && marketDeals.length === 0 && (
                        <div className="empty-deals-state" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 2rem', background: '#f9fafb', borderRadius: '16px', border: '1px dashed #d1d5db' }}>
                            <IconShield />
                            <h3 style={{ marginTop: '1rem', color: '#111827', fontSize: '1.2rem' }}>No Validated Deals Available</h3>
                            <p style={{ color: '#6b7280', maxWidth: '400px', margin: '0.5rem auto 0' }}>There are currently no Collaborative ideas in the Marketplace that meet institutional validation thresholds.</p>
                        </div>
                    )}

                    {activeTab === 'marketplace' && marketDeals.map((deal) => {
                        const progressPercent = (deal.raised / deal.target) * 100;

                        return (
                            <div key={deal.id} className="deal-card">
                                <div className="deal-header">
                                    <div className="deal-identity">
                                        <span className="deal-id">{deal.shortId}</span>
                                        <h3>{deal.name}</h3>
                                    </div>
                                    <div className={`deal-status ${deal.status === 'Closing Soon' ? 'status-urgent' : ''}`}>
                                        {deal.status}
                                    </div>
                                </div>

                                <p className="deal-pitch">{deal.oneLiner}</p>

                                {/* Key Metrics Grid */}
                                <div className="deal-metrics-grid">
                                    <div className="metric-box">
                                        <span className="m-label">Validation</span>
                                        <span className="m-value score">{deal.validationScore}</span>
                                    </div>
                                    <div className="metric-box">
                                        <span className="m-label">Valuation</span>
                                        <span className="m-value">{deal.valuation}</span>
                                    </div>
                                </div>

                                {/* Momentum Highlight */}
                                <div className="momentum-highlight">
                                    <IconTrendingUp /> {deal.momentum}
                                </div>

                                {/* Funding Progress */}
                                <div className="funding-progress">
                                    <div className="progress-labels">
                                        <span className="raised-amt">${(deal.raised / 1000000).toFixed(1)}M Raised</span>
                                        <span className="target-amt">Target: ${(deal.target / 1000000).toFixed(1)}M</span>
                                    </div>
                                    <div className="progress-track">
                                        <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
                                    </div>
                                </div>

                                <div className="deal-actions">
                                    <button className="btn-invest" onClick={() => handleInvestClick(deal)}>Invest Now</button>
                                    <button className="btn-review" onClick={() => setReviewDeal(deal)}>Review Deal</button>
                                </div>
                            </div>
                        );
                    })}

                    {/* ── PORTFOLIO VIEW ── */}
                    {activeTab === 'portfolio' && portfolioDeals.length === 0 && (
                        <div className="empty-deals-state" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 2rem', background: '#f9fafb', borderRadius: '16px', border: '1px dashed #d1d5db' }}>
                            <IconBriefcase />
                            <h3 style={{ marginTop: '1rem', color: '#111827', fontSize: '1.2rem' }}>No Investments Yet</h3>
                            <p style={{ color: '#6b7280', maxWidth: '400px', margin: '0.5rem auto 0' }}>Deploy capital into verified ideas from the Marketplace to start building your portfolio here.</p>
                        </div>
                    )}

                    {activeTab === 'portfolio' && portfolioDeals.map((portfolio) => {
                        const roi = "+0%"; // Static for demo purposes
                        const currentValue = portfolio.amount;

                        return (
                            <div key={portfolio.id} className="deal-card portfolio-card">
                                <div className="deal-header">
                                    <div className="deal-identity">
                                        <h3>{portfolio.idea_title}</h3>
                                        <span className="deal-id">{(portfolio.idea_id || "").substring(0, 8).toUpperCase()}</span>
                                    </div>
                                    <div className={`deal-status ${portfolio.status === 'Outperforming' ? 'status-stellar' : 'status-ok'}`}>
                                        <IconCheckCircle /> {portfolio.status}
                                    </div>
                                </div>

                                <p className="deal-pitch">{portfolio.idea_description?.substring(0, 100)}...</p>

                                {/* Portfolio Metrics Grid */}
                                <div className="deal-metrics-grid">
                                    <div className="metric-box box-highlight">
                                        <span className="m-label">Multiple / ROI</span>
                                        <span className="m-value score-blue">{roi}</span>
                                    </div>
                                    <div className="metric-box">
                                        <span className="m-label">Current Value</span>
                                        <span className="m-value">${(currentValue / 1000).toFixed(0)}k</span>
                                    </div>
                                </div>

                                {/* Momentum Summary */}
                                <div className="portfolio-update">
                                    <span className="update-label">Latest Update:</span>
                                    <span className="update-text">Investment finalized. Secure node record active.</span>
                                </div>

                                {/* Investment Details */}
                                <div className="investment-details">
                                    <div className="detail-row">
                                        <span className="d-label">Capital Deployed</span>
                                        <span className="d-value">${(portfolio.amount / 1000).toFixed(0)}k</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="d-label">Entry Valuation</span>
                                        <span className="d-value">{portfolio.entry_valuation}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="d-label">Implied Valuation</span>
                                        <span className="d-value auth-text">{portfolio.entry_valuation}</span>
                                    </div>
                                </div>

                                <div className="deal-actions portfolio-actions">
                                    <button className="btn-review" onClick={() => setCapTableDeal(portfolio)}>View Cap Table</button>
                                    <button className="btn-exit" onClick={() => handleExit(portfolio, 'exit')}>Exit Position</button>
                                    <button className="btn-no-interest" onClick={() => handleExit(portfolio, 'no-interest')}>No Interest</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── REVIEW DEAL MODAL ── */}
            {reviewDeal && (
                <div className="modal-overlay" onClick={() => setReviewDeal(null)}>
                    <div className="modal-content review-modal" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setReviewDeal(null)}>×</button>
                        <div className="modal-header">
                            <span className="modal-label">CONFIDENTIAL DATA ROOM</span>
                            <h2>{reviewDeal.name}</h2>
                            <div className="modal-meta">
                                <span>ID: {reviewDeal.id}</span>
                                <span>Founding Partner: {reviewDeal.authorName || 'Platform Verified'}</span>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="modal-section">
                                <h3>Executive Summary</h3>
                                <p>{reviewDeal.fullDescription || reviewDeal.oneLiner}</p>
                            </div>
                            <div className="modal-section metric-row">
                                <div className="m-box">
                                    <span className="label">Validation Score</span>
                                    <span className="value score">{reviewDeal.validationScore} / 100</span>
                                </div>
                                <div className="m-box">
                                    <span className="label">Current Valuation</span>
                                    <span className="value">{reviewDeal.valuation}</span>
                                </div>
                                <div className="m-box">
                                    <span className="label">Target Raise</span>
                                    <span className="value">${(reviewDeal.target / 1000000).toFixed(1)}M</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-actions dual">
                            <button className="btn-review" onClick={() => setReviewDeal(null)}>Close Room</button>
                            <button className="btn-invest-large" onClick={() => {
                                setInvestDeal(reviewDeal);
                                setReviewDeal(null);
                                setInvestAmount("250,000");
                            }}>Proceed to Capital Allocation</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── CAPITAL ALLOCATION MODAL ── */}
            {investDeal && (
                <div className="modal-overlay" onClick={() => setInvestDeal(null)}>
                    <div className="modal-content invest-modal" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setInvestDeal(null)}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                        <div className="modal-header">
                            <span className="modal-label">CAPITAL ALLOCATION</span>
                            <h2>Wire Authorization: {investDeal.name}</h2>
                        </div>
                        <div className="modal-body">
                            <label className="input-label">Investment Amount (USD)</label>
                            <div className="currency-input-wrapper">
                                <span className="currency-symbol">$</span>
                                <input
                                    type="text"
                                    className="currency-input"
                                    value={investAmount}
                                    onChange={(e) => {
                                        // Allow only numbers and commas
                                        const val = e.target.value.replace(/[^0-9,]/g, '');
                                        setInvestAmount(val);
                                    }}
                                />
                            </div>
                            <div className="wire-notice">
                                <IconShield />
                                <p>By confirming, you authorize a secure wire transfer bound by the standard institutional LP agreement.</p>
                            </div>
                        </div>
                        <div className="modal-actions dual">
                            <button className="btn-review" onClick={() => setInvestDeal(null)}>Cancel</button>
                            <button className="btn-invest-large" onClick={confirmInvestment}>Sign & Allocate Funds</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── CAP TABLE MODAL ── */}
            {capTableDeal && (
                <div className="modal-overlay" onClick={() => setCapTableDeal(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setCapTableDeal(null)}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                        <div className="modal-header">
                            <span className="modal-label">CAP TABLE & OWNERSHIP</span>
                            <h2>{capTableDeal.name}</h2>
                            <div className="modal-meta">
                                <span>Total Invested: ${(capTableDeal.investedAmount / 1000).toFixed(0)}k</span>
                                <span>Implied Value: ${(capTableDeal.currentValue / 1000).toFixed(0)}k</span>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="cap-table">
                                <div className="ct-header">
                                    <span>Shareholder</span>
                                    <span>Class</span>
                                    <span>Ownership %</span>
                                </div>
                                <div className="ct-row">
                                    <span className="shareholder"><IconUsers /> Founders & Team</span>
                                    <span>Common</span>
                                    <span className="ownership">72.50%</span>
                                </div>
                                <div className="ct-row">
                                    <span className="shareholder"><IconBriefcase /> Lead Syndicate</span>
                                    <span>Seed Pref</span>
                                    <span className="ownership">18.25%</span>
                                </div>
                                <div className="ct-row highlight-row">
                                    <span className="shareholder"><IconShield /> Your Entity</span>
                                    <span>Seed Pref</span>
                                    <span className="ownership auth-text">{(capTableDeal.amount / (parseFloat(String(capTableDeal.entry_valuation).replace(/[^0-9.]/g, '')) * 1000000 || 5000000) * 100).toFixed(2)}%</span>
                                </div>
                                <div className="ct-row">
                                    <span className="shareholder"><IconUsers /> Option Pool</span>
                                    <span>Unissued</span>
                                    <span className="ownership">{(10 - (capTableDeal.amount / (parseFloat(String(capTableDeal.entry_valuation).replace(/[^0-9.]/g, '')) * 1000000 || 5000000) * 100)).toFixed(2)}%</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-actions single-action">
                            <button className="btn-review" onClick={() => setCapTableDeal(null)}>Close Cap Table</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── EXIT / NO INTEREST CONFIRMATION MODAL ── */}
            {exitDeal && (
                <div className="modal-overlay" onClick={() => setExitDeal(null)}>
                    <div className="modal-content invest-modal" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setExitDeal(null)}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                        <div className="modal-header">
                            <span className="modal-label">{exitMode === 'exit' ? 'EXIT POSITION' : 'FLAG NO INTEREST'}</span>
                            <h2>{exitDeal.name}</h2>
                            <div className="modal-meta">
                                <span>Capital Deployed: ${(exitDeal.investedAmount / 1000).toFixed(0)}k</span>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="wire-notice" style={{ background: exitMode === 'exit' ? '#fff7ed' : '#f9fafb', borderColor: exitMode === 'exit' ? '#fdba74' : '#e5e7eb' }}>
                                <IconShield />
                                {exitMode === 'exit' ? (
                                    <p>You are requesting to <strong>exit your position</strong> in this deal. This will remove it from your active portfolio and is irreversible in this demo environment.</p>
                                ) : (
                                    <p>You are flagging <strong>no further interest</strong> in this deal. The investment will be archived and removed from your active portfolio view.</p>
                                )}
                            </div>
                        </div>
                        <div className="modal-actions dual">
                            <button className="btn-review" onClick={() => setExitDeal(null)}>Keep Position</button>
                            <button
                                className={exitMode === 'exit' ? 'btn-exit-confirm' : 'btn-no-interest-confirm'}
                                onClick={confirmExit}
                            >
                                {exitMode === 'exit' ? 'Confirm Exit' : 'Archive & Remove'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .institutional-portal {
                    max-width: 1300px;
                    margin: 0 auto;
                    padding-bottom: 6rem;
                    color: #111827;
                }

                .portal-header {
                    margin-bottom: 4rem;
                    text-align: center;
                }

                .exclusive-pill {
                    display: inline-block;
                    font-size: 0.65rem;
                    font-weight: 800;
                    letter-spacing: 0.12em;
                    color: #6b7280;
                    background: #f3f4f6;
                    border: 1px solid #e5e7eb;
                    padding: 6px 14px;
                    border-radius: 6px;
                    margin-bottom: 1.5rem;
                }

                .portal-header h1 {
                    letter-spacing: -0.03em;
                    margin-bottom: 0.75rem;
                }

                .portal-header p {
                    font-size: 1.15rem;
                    color: #6b7280;
                    max-width: 650px;
                    margin: 0 auto;
                    line-height: 1.6;
                }
                .auth-text { color: #111827; font-weight: 700; }

                /* Macro Stats Row */
                .macro-stats-row {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.5rem;
                    margin-bottom: 4rem;
                }
                
                .stat-card {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    background: #ffffff;
                    border: 1px solid #e5e7eb;
                    border-radius: 16px;
                    padding: 2rem;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.02);
                }
                .stat-icon-wrapper {
                    display: flex; align-items: center; justify-content: center;
                    width: 48px; height: 48px;
                    background: #f9fafb; border: 1px solid #f3f4f6; border-radius: 12px;
                    color: #111827;
                }
                .stat-data { display: flex; flex-direction: column; }
                .stat-value { font-size: 20px; font-weight: 600; color: #111827; letter-spacing: -0.03em; }
                .stat-label { font-size: 0.8rem; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; }

                /* Deals Section & Tabs */
                .deals-section { margin-top: 2rem; }
                
                .section-header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 2.5rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid #e5e7eb;
                }

                .tab-navigation {
                    display: flex;
                    gap: 1rem;
                }

                .tab-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    background: none;
                    border: none;
                    padding: 10px 16px;
                    font-size: 1rem;
                    font-weight: 600;
                    letter-spacing: -0.03em;
                    color: #6b7280;
                    cursor: pointer;
                    border-radius: 12px;
                    transition: all 0.2s;
                }
                .tab-btn:hover {
                    background: #f3f4f6;
                    color: #111827;
                }
                .tab-btn.active {
                    background: #111827;
                    color: #ffffff;
                }

                .count-badge {
                    font-size: 0.75rem;
                    font-weight: 800;
                    background: #e5e7eb;
                    color: #4b5563;
                    padding: 2px 8px;
                    border-radius: 20px;
                }
                .tab-btn.active .count-badge {
                    background: rgba(255,255,255,0.2);
                    color: #ffffff;
                }

                .deals-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
                    gap: 2rem;
                }

                /* Deal Card Anatomy */
                .deal-card {
                    background: #ffffff;
                    border: 1px solid #e5e7eb;
                    border-radius: 12px;
                    padding: 1.75rem;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .deal-card:hover {
                    border-color: #d1d5db;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
                }

                .deal-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem; }
                .deal-identity { display: flex; flex-direction: column; gap: 4px; }
                .deal-identity h3 { 
                    font-family: var(--font-geist-sans), "GeistSans Fallback";
                    font-size: 18px; 
                    font-weight: 500; 
                    margin: 0; 
                    color: rgb(17, 24, 39); 
                    font-style: normal;
                    line-height: normal;
                }
                .deal-id { font-size: 0.75rem; font-weight: 600; color: #6b7280; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
                
                .deal-status {
                    display: inline-flex; align-items: center; gap: 4px;
                    font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
                    padding: 4px 8px; border-radius: 4px; border: 1px solid #e5e7eb; color: #374151; background: #f9fafb;
                }
                .deal-status.status-urgent { background: #fee2e2; color: #b91c1c; border-color: #fca5a5; }
                .deal-status.status-stellar { background: #dcfce7; color: #15803d; border-color: #86efac; }
                .deal-status.status-ok { background: #f9fafb; color: #374151; border-color: #e5e7eb; }

                .deal-pitch { font-size: 0.9rem; color: #4b5563; line-height: 1.5; margin-bottom: 2rem; flex-grow: 1; }

                /* Metrics */
                .deal-metrics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; border-top: 1px solid #f3f4f6; border-bottom: 1px solid #f3f4f6; padding: 1rem 0; }
                .metric-box {
                    display: flex; flex-direction: column; gap: 0.25rem;
                }
                .metric-box:last-child { border-left: 1px solid #f3f4f6; padding-left: 1rem; }
                .metric-box.box-highlight { background: transparent; }
                
                .m-label { font-size: 0.7rem; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.02em; }
                .m-value { 
                    font-family: var(--font-geist-sans), "GeistSans Fallback";
                    font-size: 18px; 
                    font-weight: 500; 
                    color: rgb(17, 24, 39); 
                    font-style: normal;
                    line-height: normal;
                    font-feature-settings: "tnum"; 
                    font-variant-numeric: tabular-nums; 
                }
                .m-value.score { color: #111827; display: flex; align-items: center; gap: 6px; }
                .m-value.score::after { content: ''; display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #22c55e; }
                .m-value.score-blue { color: #111827; }

                .momentum-highlight {
                    display: inline-flex; align-items: center; gap: 0.5rem;
                    font-size: 0.8rem; font-weight: 600; color: #047857;
                    background: #ecfdf5; padding: 6px 10px; border-radius: 6px;
                    margin-bottom: 1.5rem; border: 1px solid #a7f3d0; width: fit-content;
                }

                .portfolio-update {
                    background: #f9fafb; border-left: 2px solid #111827;
                    padding: 10px 14px; border-radius: 0 4px 4px 0; margin-bottom: 1.5rem;
                    display: flex; flex-direction: column; gap: 4px;
                }
                .update-label { font-size: 0.65rem; font-weight: 700; color: #6b7280; text-transform: uppercase; }
                .update-text { font-size: 0.85rem; font-weight: 500; color: #111827; line-height: 1.4; }

                /* Funding Progress */
                .funding-progress { margin-bottom: 1.5rem; }
                .progress-labels { display: flex; justify-content: space-between; margin-bottom: 0.6rem; font-size: 0.8rem; font-weight: 600; }
                .raised-amt { color: #111827; font-feature-settings: "tnum"; font-variant-numeric: tabular-nums; }
                .target-amt { color: #6b7280; font-feature-settings: "tnum"; font-variant-numeric: tabular-nums; }
                
                .progress-track { width: 100%; height: 4px; background: #e5e7eb; border-radius: 2px; overflow: hidden; }
                .progress-fill { height: 100%; background: #111827; border-radius: 2px; transition: width 1s ease-out; }

                /* Investment Details (Portfolio) */
                .investment-details {
                    display: flex; flex-direction: column; gap: 8px;
                    margin-bottom: 1.5rem; padding-top: 1rem; border-top: 1px solid #f3f4f6;
                }
                .detail-row { display: flex; justify-content: space-between; font-size: 0.8rem; }
                .d-label { color: #6b7280; font-weight: 500; }
                .d-value { color: #111827; font-weight: 600; font-feature-settings: "tnum"; font-variant-numeric: tabular-nums; }

                /* Actions */
                .deal-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-top: auto; }
                .deal-actions.single-action { grid-template-columns: 1fr; }
                .deal-actions.portfolio-actions { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.6rem; margin-top: auto; }

                .btn-exit {
                    padding: 0.75rem; background: #fff7ed; color: #c2410c; border: 1px solid #fdba74; border-radius: 8px;
                    font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.2s; text-align: center;
                }
                .btn-exit:hover { background: #ffedd5; border-color: #fb923c; }

                .btn-no-interest {
                    padding: 0.75rem; background: #f9fafb; color: #6b7280; border: 1px solid #e5e7eb; border-radius: 8px;
                    font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.2s; text-align: center;
                }
                .btn-no-interest:hover { background: #f3f4f6; color: #374151; border-color: #d1d5db; }

                .btn-exit-confirm {
                    padding: 0.875rem; background: #ea580c; color: white; border: 1px solid #ea580c; border-radius: 8px;
                    font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: all 0.2s; text-align: center;
                }
                .btn-exit-confirm:hover { background: #c2410c; border-color: #c2410c; }

                .btn-no-interest-confirm {
                    padding: 0.875rem; background: #111827; color: white; border: 1px solid #111827; border-radius: 8px;
                    font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: all 0.2s; text-align: center;
                }
                .btn-no-interest-confirm:hover { background: #374151; border-color: #374151; }
                
                .btn-invest {
                    padding: 0.75rem; background: #111827; color: white; border: 1px solid #111827; border-radius: 8px;
                    font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s; text-align: center;
                }
                .btn-invest:hover { background: #374151; border-color: #374151; }
                
                .btn-review {
                    padding: 0.75rem; background: white; color: #111827; border: 1px solid #e5e7eb; border-radius: 8px;
                    font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s; text-align: center;
                }
                .btn-review:hover { background: #f9fafb; border-color: #d1d5db; }

                /* ── MODALS ── */
                .modal-overlay {
                    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(17, 24, 39, 0.4); backdrop-filter: blur(4px);
                    display: flex; align-items: center; justify-content: center; z-index: 1000;
                    animation: fadeIn 0.2s ease-out;
                }
                .modal-content {
                    background: #ffffff; border-radius: 16px; padding: 2.5rem; position: relative;
                    width: 90%; max-width: 650px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
                    animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    border: 1px solid #e5e7eb;
                }
                .invest-modal { max-width: 480px; }
                
                .modal-close {
                    position: absolute; top: 1.25rem; right: 1.25rem; background: #f9fafb; border: 1px solid #e5e7eb;
                    width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
                    border-radius: 8px; color: #6b7280; cursor: pointer; transition: all 0.2s;
                }
                .modal-close:hover { color: #111827; background: #f3f4f6; border-color: #d1d5db; }

                .modal-header { 
                    margin-bottom: 2rem; 
                    border-bottom: 1px solid #e5e7eb; 
                    padding-bottom: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.5rem;
                }
                .modal-label { 
                    display: inline-block; 
                    font-size: 0.65rem; 
                    font-weight: 800; 
                    color: #4b5563; 
                    text-transform: uppercase; 
                    letter-spacing: 0.08em; 
                    background: #f3f4f6; 
                    padding: 4px 10px; 
                    border-radius: 6px;
                    white-space: nowrap;
                }
                .modal-header h2 { 
                    font-family: var(--font-geist-sans), "GeistSans Fallback";
                    font-size: 18px; 
                    font-weight: 500; 
                    color: rgb(17, 24, 39); 
                    margin: 0; 
                    font-style: normal;
                    line-height: normal; 
                }
                .modal-meta { display: flex; gap: 1rem; font-size: 0.8rem; color: #6b7280; font-weight: 500; margin-top: 0.5rem; }
                
                .modal-body { margin-bottom: 2rem; }
                .modal-section { margin-bottom: 2rem; }
                .modal-section h3 { font-size: 0.9rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.02em; }
                .modal-section p { font-size: 0.95rem; color: #4b5563; line-height: 1.6; }
                
                .metric-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
                .m-box { background: #f9fafb; padding: 1.25rem; border-radius: 8px; border: 1px solid #e5e7eb; display: flex; flex-direction: column; gap: 0.5rem; }
                .m-box .label { font-size: 0.65rem; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.02em; }
                .m-box .value { font-size: 1.15rem; font-weight: 700; color: #111827; font-feature-settings: "tnum"; font-variant-numeric: tabular-nums; }
                .m-box .value.score { color: #111827; display: flex; align-items: center; gap: 6px; }
                .m-box .value.score::after { content: ''; display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #22c55e; }
                
                .input-label { display: block; font-size: 0.8rem; font-weight: 600; color: #374151; margin-bottom: 0.5rem; }
                .currency-input-wrapper { display: flex; align-items: center; border: 1px solid #d1d5db; border-radius: 8px; padding: 1rem 1.25rem; transition: border-color 0.2s, box-shadow 0.2s; background: #ffffff; }
                .currency-input-wrapper:focus-within { border-color: #111827; box-shadow: 0 0 0 1px #111827; }
                .currency-symbol { font-size: 1.5rem; font-weight: 600; color: #9ca3af; margin-right: 0.5rem; font-feature-settings: "tnum"; font-variant-numeric: tabular-nums; }
                .currency-input { border: none; outline: none; font-size: 1.75rem; font-weight: 700; color: #111827; width: 100%; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; letter-spacing: -0.02em; }
                
                .wire-notice { display: flex; align-items: flex-start; gap: 0.75rem; background: #f9fafb; border: 1px solid #e5e7eb; padding: 1rem; border-radius: 8px; font-size: 0.8rem; color: #4b5563; margin-top: 1.5rem; line-height: 1.5; }
                .wire-notice svg { color: #6b7280; flex-shrink: 0; margin-top: 2px; }
                .wire-notice p { margin: 0; }
                
                .cap-table { border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; font-size: 0.85rem; }
                .ct-header { display: grid; grid-template-columns: 2fr 1fr 1fr; background: #f9fafb; padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.02em; font-size: 0.7rem; }
                .ct-row { display: grid; grid-template-columns: 2fr 1fr 1fr; padding: 14px 16px; border-bottom: 1px solid #f3f4f6; align-items: center; color: #4b5563; }
                .ct-row:last-child { border-bottom: none; }
                .ct-row.highlight-row { background: #eff6ff; color: #1e3a8a; font-weight: 500; }
                .shareholder { display: flex; align-items: center; gap: 8px; font-weight: 500; color: #111827; }
                .ct-row.highlight-row .shareholder { color: #1e3a8a; }
                .ownership { font-feature-settings: "tnum"; font-variant-numeric: tabular-nums; text-align: right; font-weight: 600; color: #111827; }
                .ct-row.highlight-row .ownership { color: #1e3a8a; font-weight: 700; }

                .modal-actions.dual { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
                .btn-invest-large {
                    padding: 0.875rem; background: #111827; color: white; border: 1px solid #111827; border-radius: 8px;
                    font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: all 0.2s; text-align: center;
                }
                .btn-invest-large:hover { background: #374151; border-color: #374151; }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }


                @media (max-width: 1024px) {
                    .macro-stats-row { grid-template-columns: 1fr; }
                    .deals-grid { grid-template-columns: 1fr; }
                }

                @media (max-width: 768px) {
                    .portal-header h1 { font-size: 2.25rem; }
                    .deal-card { padding: 1.5rem; }
                    .deal-actions { grid-template-columns: 1fr; }
                    .tab-navigation { flex-direction: column; width: 100%; }
                    .tab-btn { justify-content: space-between; }
                }
            `}</style>
        </div>
    );
}
