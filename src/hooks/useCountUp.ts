import { useState, useEffect } from 'react';

export const useCountUp = (
    end: number,
    duration: number = 2000,
    decimal: number = 0,
    trigger: boolean = true
) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!trigger) return;

        let startTime: number | null = null;
        let frameId: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            // Ease-out expo for premium feel
            const easedProgress = 1 - Math.pow(2, -10 * progress);
            const currentCount = easedProgress * end;

            setCount(parseFloat(currentCount.toFixed(decimal)));

            if (progress < 1) {
                frameId = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        frameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameId);
    }, [end, duration, decimal, trigger]);

    return count;
};
