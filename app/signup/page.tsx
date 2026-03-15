"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Logo from "../components/Logo";

export default function SignUp() {
    const { loginWithGoogle, signUpWithEmail, user } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [fullName, setFullName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (user) {
            router.push("/dashboard");
        }
    }, [user, router]);

    const handleGoogleLogin = async () => {
        await loginWithGoogle();
    };

    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const { error } = await signUpWithEmail(email, password, fullName);
            if (error) throw error;
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Failed to sign up. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (user) return null;

    return (
        <main className="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">

                        <h1>Create Account</h1>
                        <p>Join the community of builders, idea givers, and investors.</p>
                    </div>

                    <div className="auth-actions">
                        {success ? (
                            <div style={{ textAlign: "center", padding: "2rem 0" }}>
                                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✉️</div>
                                <h3>Check your email</h3>
                                <p style={{ color: "#6b7280", marginTop: "0.5rem" }}>
                                    We've sent a verification link to <strong>{email}</strong>.
                                    Please verify your email to complete registration.
                                </p>
                                <Link href="/signin">
                                    <button className="btn-black" style={{ marginTop: "1.5rem" }}>Go to Sign In</button>
                                </Link>
                            </div>
                        ) : (
                            <>
                                {error && <div style={{ color: "red", fontSize: "0.85rem", marginBottom: "1rem", textAlign: "center" }}>{error}</div>}

                                <form className="auth-form" onSubmit={handleEmailSignUp}>
                                    <div className="input-group">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            required
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>Email address</label>
                                        <input
                                            type="email"
                                            placeholder="name@company.com"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>Password</label>
                                        <div style={{ position: 'relative', width: '100%' }}>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                style={{ paddingRight: '2.5rem', width: '100%' }}
                                            />
                                            <button 
                                                type="button" 
                                                onClick={() => setShowPassword(!showPassword)} 
                                                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            >
                                                {!showPassword ? (
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                                ) : (
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <button className="btn-black btn-full" disabled={loading}>
                                        {loading ? "Creating Account..." : "Create Account"}
                                    </button>
                                </form>

                                <div className="auth-divider">
                                    <span>or continue with Google</span>
                                </div>

                                <button className="btn-google" onClick={handleGoogleLogin}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Sign Up with Google
                                </button>
                            </>
                        )}
                    </div>

                    <div className="auth-footer">
                        <p>Already have an account? <Link href="/signin">Sign In</Link></p>
                    </div>
                </div>
            </div>
        </main>
    );
}
