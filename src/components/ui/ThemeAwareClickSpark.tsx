'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import ClickSpark from '@/components/ClickSpark';

export const ThemeAwareClickSpark = ({ children }: { children: React.ReactNode }) => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Default to white (dark mode) if not mounted yet to avoid mismatch
    const sparkColor = mounted ? (resolvedTheme === 'dark' ? '#ffffff' : '#171717') : '#ffffff';

    return (
        <ClickSpark
            sparkColor={sparkColor}
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
        >
            {children}
        </ClickSpark>
    );
};
