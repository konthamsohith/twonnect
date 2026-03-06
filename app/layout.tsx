import "./globals.css";
import "./landing.css";

export const metadata = {
    title: "TWONNECT",
    description: "A platform bridging real-world problems with actionable startup solutions.",
    icons: {
        icon: "/assests/TWONNECTcircle.png",
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

