"use client";

import { usePathname } from 'next/navigation';
import Footer from './landing/Footer';

export default function ConditionalFooter() {
    const pathname = usePathname();
    const hideFooterRoutes = ['/signin', '/signup'];
    
    if (hideFooterRoutes.includes(pathname)) {
        return null;
    }

    return <Footer />;
}
