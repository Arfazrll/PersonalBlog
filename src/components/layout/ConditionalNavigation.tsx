'use client';

import { usePathname } from 'next/navigation';
import { Navbar, Footer } from '@/components/layout';
import { BackToTop } from '@/components/ui/BackToTop';

export function ConditionalNavigation({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Hide navbar and footer on project detail pages (/projects/[slug])
    // A project detail page usually has more than 2 segments (e.g., /projects/my-project)
    const segments = pathname?.split('/').filter(Boolean) || [];
    const isProjectDetail = segments[0] === 'projects' && segments.length > 1;

    if (isProjectDetail) {
        return <>{children}</>;
    }

    return (
        <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 relative">{children}</main>
            <Footer />
            <BackToTop />
        </div>
    );
}
