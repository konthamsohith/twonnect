import "./globals.css";

export const metadata = {
    title: "Idea Platform",
    description: "A platform bridging real-world problems with actionable startup solutions.",
};

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
