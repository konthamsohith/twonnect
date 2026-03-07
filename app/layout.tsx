import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { GeistPixelSquare, GeistPixelGrid, GeistPixelCircle, GeistPixelTriangle, GeistPixelLine } from 'geist/font/pixel';
import "./globals.css";
import "./landing.css";

export const metadata = {
    title: {
        default: "TWONNECT | Get YC-Ready with Validated Startup Ideas & Angel Investors",
        template: "%s | TWONNECT"
    },
    description: "TWONNECT bridges real-world market gaps with YC-ready startup solutions. Access validated problem statements, connect with angel investors, and build high-impact companies.",
    keywords: ["angel investors", "y combinator", "startup validation", "validated startup ideas", "yc ready", "co-founder matching", "venture capital funding", "startup ecosystem", "market gap analysis"],
    authors: [{ name: "TWONNECT Team" }],
    creator: "TWONNECT",
    publisher: "TWONNECT",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL("https://twonnect.me"), // Replace with actual production URL if different
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "TWONNECT | Validated Startup Ideas for Founders & Investors",
        description: "The bridge between real-world market gaps and YC-ready startup solutions. Connect with angel investors and builders.",
        url: "https://twonnect.me",
        siteName: "TWONNECT",
        images: [
            {
                url: "/assests/TWONNECTcircle.png",
                width: 800,
                height: 800,
                alt: "TWONNECT - Validated Startup Mission",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "TWONNECT | Validated Startup Ideas & Angel Investors",
        description: "Build YC-ready startups with validated market gaps. The definitive bridge for founders and angel investors.",
        images: ["/assests/TWONNECTcircle.png"],
    },
    icons: {
        icon: "/assests/TWONNECTcircle.png",
        shortcut: "/assests/TWONNECTcircle.png",
        apple: "/assests/TWONNECTcircle.png",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NewsletterCTA from "./components/NewsletterCTA";
import ScrollReveal from "./components/ScrollReveal";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable} ${GeistPixelGrid.variable} ${GeistPixelCircle.variable} ${GeistPixelTriangle.variable} ${GeistPixelLine.variable}`}>
            <body className={GeistSans.className}>
                <AuthProvider>
                    <ScrollReveal />
                    <Navbar />
                    {children}
                    <NewsletterCTA />
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}

