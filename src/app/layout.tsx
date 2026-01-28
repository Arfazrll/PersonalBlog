import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { getMessages, getLocale } from 'next-intl/server';
import { ThemeProvider, I18nProvider } from '@/providers';
import { Navbar, Footer } from '@/components/layout';
import { BackToTop } from '@/components/ui/BackToTop';
import '@/styles/globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: 'Portfolio | Full Stack Developer',
        template: '%s | Portfolio',
    },
    description: 'A passionate developer building digital experiences that inspire. Explore my projects, skills, and professional journey.',
    keywords: ['developer', 'portfolio', 'web development', 'full stack', 'react', 'nextjs'],
    authors: [{ name: 'Your Name' }],
    creator: 'Your Name',
    metadataBase: new URL('https://your-domain.com'),
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://your-domain.com',
        title: 'Portfolio | Full Stack Developer',
        description: 'A passionate developer building digital experiences that inspire.',
        siteName: 'Portfolio',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Portfolio | Full Stack Developer',
        description: 'A passionate developer building digital experiences that inspire.',
        creator: '@yourusername',
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
    icons: {
        icon: '/favicon.svg',
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
    ],
    width: 'device-width',
    initialScale: 1,
};

import { ThemeAwareClickSpark } from '@/components/ui/ThemeAwareClickSpark';

// ... (existing imports)

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
                <ThemeProvider>
                    <I18nProvider locale={locale} messages={messages}>
                        <ThemeAwareClickSpark>
                            <div className="relative min-h-screen flex flex-col">
                                <Navbar />
                                <main className="flex-1">{children}</main>
                                <Footer />
                                <BackToTop />
                            </div>
                        </ThemeAwareClickSpark>
                    </I18nProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
