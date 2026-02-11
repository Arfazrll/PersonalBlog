import { useState, useEffect } from 'react';

/**
 * Custom hook to detect performance-constrained environments.
 * - isMobile: < 768px (Phone)
 * - isTablet: 768px - 1024px
 * - isLowPowerMode: Mobile or Tablet or explicitly set.
 */
export function usePerformance() {
    const [hasMounted, setHasMounted] = useState(false);
    const [state, setState] = useState({
        isMobile: false,
        isTablet: false,
        isLowPowerMode: false,
    });

    useEffect(() => {
        setHasMounted(true);
        const checkPerformance = () => {
            const width = window.innerWidth;
            const isMobile = width < 768;
            const isTablet = width >= 768 && width < 1024;

            setState({
                isMobile,
                isTablet,
                // On mobile and tablet, we generally want to avoid heavy 3D/Shaders
                isLowPowerMode: isMobile || isTablet,
            });
        };

        checkPerformance();
        window.addEventListener('resize', checkPerformance);
        return () => window.removeEventListener('resize', checkPerformance);
    }, []);

    // During SSR and until hydration is complete, return false for all checks
    // to match the initial server render and avoid hydration mismatches.
    if (!hasMounted) {
        return {
            isMobile: false,
            isTablet: false,
            isLowPowerMode: false,
        };
    }

    return state;
}

