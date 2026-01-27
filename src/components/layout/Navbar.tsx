'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X, Moon, Sun, Globe, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

// Sub-links for the "About" dropdown
const aboutLinks = [
    { href: '/projects', key: 'projects' },
    { href: '/experience', key: 'experience' },
    { href: '/skills', key: 'skills' },
    { href: '/achievements', key: 'achievements' },
];

function Clock() {
    const [time, setTime] = useState<string>('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            setTime(timeString);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!mounted) return <span className="font-mono text-xl md:text-2xl font-black opacity-0">00:00:00</span>;

    return (
        <span className="font-mono text-xl md:text-2xl font-black text-gradient tracking-widest hover:tracking-[0.2em] transition-all duration-300">
            {time}
        </span>
    );
}

export function Navbar() {
    const t = useTranslations('navigation');
    const { theme, setTheme, resolvedTheme } = useTheme();
    const pathname = usePathname();
    const { scrollY } = useScroll();

    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAboutHovered, setIsAboutHovered] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [currentLocale, setCurrentLocale] = useState('en');

    const isDark = resolvedTheme === 'dark';

    useEffect(() => {
        setMounted(true);
        const locale = document.cookie.split('; ').find(row => row.startsWith('locale='))?.split('=')[1] || 'en';
        setCurrentLocale(locale);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
        setIsAboutHovered(false);
    }, [pathname]);

    useMotionValueEvent(scrollY, 'change', (latest) => {
        if (isMenuOpen) return; // Don't hide navbar when menu is open

        const direction = latest > lastScrollY ? 'down' : 'up';
        setIsScrolled(latest > 50);

        if (direction === 'down' && latest > 100) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }

        setLastScrollY(latest);
    });

    const toggleMenu = useCallback(() => {
        setIsMenuOpen((prev) => !prev);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }, [theme, setTheme]);

    const toggleLocale = useCallback(() => {
        const newLocale = currentLocale === 'en' ? 'id' : 'en';
        document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
        setCurrentLocale(newLocale);
        window.location.reload();
    }, [currentLocale]);

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    // Animation variants
    const navVariants = {
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 }
    };

    const menuVariants = {
        closed: { opacity: 0 },
        open: { opacity: 1 }
    };

    const dropdownVariants = {
        closed: { opacity: 0, y: 10, scale: 0.95 },
        open: { opacity: 1, y: 0, scale: 1 }
    };

    return (
        <>
            <motion.nav
                variants={navVariants}
                initial="hidden"
                animate={isVisible || isMenuOpen ? 'visible' : 'hidden'}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="fixed top-0 left-0 right-0 z-50"
            >
                <div className="container-creative py-4 md:py-6">
                    <motion.div
                        className={cn(
                            'flex items-center justify-between transition-all duration-500 rounded-full',
                            isScrolled ? 'glass-strong px-6 py-3' : 'py-2'
                        )}
                        layout
                    >
                        {/* Make the Clock a Link to Home */}
                        <Link href="/" className="relative group min-w-[120px]" onClick={closeMenu}>
                            <Clock />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-2">
                            {/* HOME */}
                            <Link
                                href="/"
                                className={cn(
                                    'relative px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full group',
                                    pathname === '/' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                {pathname === '/' && (
                                    <motion.div
                                        layoutId="navbar-active-pill"
                                        className="absolute inset-0 rounded-full bg-muted"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{t('home')}</span>
                            </Link>

                            {/* ABOUT DROPDOWN */}
                            <div
                                className="relative"
                                onMouseEnter={() => setIsAboutHovered(true)}
                                onMouseLeave={() => setIsAboutHovered(false)}
                            >
                                <button
                                    className={cn(
                                        'relative px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full group flex items-center gap-1',
                                        aboutLinks.some(link => pathname === link.href)
                                            ? 'text-foreground'
                                            : 'text-muted-foreground hover:text-foreground'
                                    )}
                                >
                                    {(aboutLinks.some(link => pathname === link.href)) && (
                                        <motion.div
                                            layoutId="navbar-active-pill"
                                            className="absolute inset-0 rounded-full bg-muted"
                                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">About</span>
                                    <ChevronDown className={cn("w-3 h-3 relative z-10 transition-transform duration-300", isAboutHovered ? "rotate-180" : "")} />
                                </button>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {isAboutHovered && (
                                        <motion.div
                                            variants={dropdownVariants}
                                            initial="closed"
                                            animate="open"
                                            exit="closed"
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48"
                                        >
                                            <div className="p-2 glass-strong rounded-2xl border border-white/10 shadow-xl flex flex-col gap-1 overflow-hidden">
                                                {aboutLinks.map((link) => (
                                                    <Link
                                                        key={link.key}
                                                        href={link.href}
                                                        className={cn(
                                                            "px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-muted/50 text-left",
                                                            pathname === link.href ? "text-primary bg-muted/30" : "text-muted-foreground hover:text-foreground"
                                                        )}
                                                    >
                                                        {t(link.key)}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* CONTACT */}
                            <Link
                                href="/contact"
                                className={cn(
                                    'relative px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full group',
                                    pathname === '/contact' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                {pathname === '/contact' && (
                                    <motion.div
                                        layoutId="navbar-active-pill"
                                        className="absolute inset-0 rounded-full bg-muted"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{t('contact')}</span>
                            </Link>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-2 md:gap-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleLocale}
                                className="p-2 md:p-2.5 rounded-full bg-muted/80 hover:bg-muted transition-colors"
                                aria-label="Toggle language"
                            >
                                <Globe className="w-4 h-4" />
                            </motion.button>

                            {mounted && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={toggleTheme}
                                    className="p-2 md:p-2.5 rounded-full bg-muted/80 hover:bg-muted transition-colors"
                                    aria-label="Toggle theme"
                                >
                                    <motion.div
                                        initial={false}
                                        animate={{ rotate: isDark ? 0 : 180 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                    </motion.div>
                                </motion.button>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleMenu}
                                className="p-2 md:p-2.5 rounded-full bg-muted/80 hover:bg-muted transition-colors lg:hidden"
                                aria-label="Toggle menu"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={isMenuOpen ? 'close' : 'menu'}
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 lg:hidden"
                    >
                        <motion.div
                            className="absolute inset-0 bg-background"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        <div className="relative flex flex-col items-center justify-center h-full overflow-y-auto py-20">
                            <nav className="flex flex-col items-center gap-6">
                                {/* Mobile Home */}
                                <Link
                                    href="/"
                                    onClick={closeMenu}
                                    className="text-3xl font-black text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {t('home')}
                                </Link>

                                {/* Mobile About Section */}
                                <div className="flex flex-col items-center gap-4 py-4 border-y border-white/5 w-full">
                                    <span className="text-sm font-mono text-primary tracking-widest uppercase">About</span>
                                    {aboutLinks.map((link) => (
                                        <Link
                                            key={link.key}
                                            href={link.href}
                                            onClick={closeMenu}
                                            className={cn(
                                                'text-2xl font-bold transition-colors',
                                                pathname === link.href ? 'text-gradient' : 'text-muted-foreground'
                                            )}
                                        >
                                            {t(link.key)}
                                        </Link>
                                    ))}
                                </div>

                                {/* Mobile Contact */}
                                <Link
                                    href="/contact"
                                    onClick={closeMenu}
                                    className="text-3xl font-black text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {t('contact')}
                                </Link>
                            </nav>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: 0.5 }}
                                className="flex items-center gap-4 mt-12"
                            >
                                <button
                                    onClick={toggleLocale}
                                    className="px-6 py-3 rounded-full glass-card text-sm font-medium hover:bg-muted/50 transition-colors"
                                >
                                    {currentLocale === 'en' ? 'English' : 'Indonesia'}
                                </button>
                                {mounted && (
                                    <button
                                        onClick={toggleTheme}
                                        className="px-6 py-3 rounded-full glass-card text-sm font-medium hover:bg-muted/50 transition-colors flex items-center gap-2"
                                    >
                                        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                        {isDark ? 'Light' : 'Dark'}
                                    </button>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
