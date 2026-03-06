import "./globals.css";
import "./landing.css";

export const metadata = {
    title: {
        default: "TWONNECT | Bridging Real-World Problems with Startup Solutions",
        template: "%s | TWONNECT"
    },
    description: "TWONNECT is the premier platform for bridging real-world problems with actionable startup solutions. Find validated problem statements, connect with angel investors, and build your next Y Combinator-ready startup.",
    keywords: ["angel investors", "y combinator", "startup ideas", "problem validation", "find co-founders", "startup solutions", "venture capital", "entrepreneurship", "validated problems"],
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
        title: "TWONNECT | Bridging Real-World Problems with Startup Solutions",
        description: "The platform where real-world problems meet actionable startup solutions. Connect with builders and investors.",
        url: "https://twonnect.me",
        siteName: "TWONNECT",
        images: [
            {
                url: "/assests/TWONNECTcircle.png",
                width: 800,
                height: 800,
                alt: "TWONNECT Logo",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "TWONNECT | Bridging Real-World Problems with Startup Solutions",
        description: "Connect validated problems with startup solutions. The bridge for builders and angel investors.",
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
        <html lang="en">
            <body>
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

