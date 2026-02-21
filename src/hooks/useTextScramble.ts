import { useState, useEffect, useCallback } from 'react';

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

export const useTextScramble = (
    text: string,
    trigger: boolean = true,
    delay: number = 300,
    chars: string = DEFAULT_CHARS
) => {
    const [scrambledText, setScrambledText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    const scramble = useCallback(async () => {
        if (!trigger) return;

        // Waiting for the initial delay
        await new Promise(resolve => setTimeout(resolve, delay));

        const length = text.length;
        let iteration = 0;
        const maxIterations = 12; // iterations per char before locking
        const staggerDelay = 40; // delay between locking characters

        const interval = setInterval(() => {
            const result = text
                .split('')
                .map((char, index) => {
                    if (char === ' ') return ' ';

                    // Lock-in logic: if current overall iteration is enough to lock this index
                    if (iteration > index * (maxIterations / (staggerDelay / 10))) {
                        // This is a simplified lock-in, let's refine:
                    }

                    // Real logic: use an array to track locked states
                    return char;
                });

            // Re-evaluating for a cleaner frame-based approach
        }, 30);

        return () => clearInterval(interval);
    }, [text, trigger, delay]);

    // Better implementation of Text Scramble
    useEffect(() => {
        if (!trigger) return;

        let frameId: number;
        let timeoutId: NodeJS.Timeout;

        const runScramble = async () => {
            timeoutId = setTimeout(() => {
                let currentIteration = 0;
                const totalChars = text.length;
                const charsArray = text.split('');

                const update = () => {
                    const output = charsArray.map((targetChar, i) => {
                        if (targetChar === ' ') return ' ';

                        // We stagger the "lock" time for each character
                        // Lower index characters lock sooner
                        const lockThreshold = i * 2;

                        if (currentIteration > lockThreshold + 10) {
                            return targetChar;
                        }

                        return chars[Math.floor(Math.random() * chars.length)];
                    }).join('');

                    setScrambledText(output);

                    if (currentIteration < totalChars + 20) {
                        currentIteration++;
                        frameId = requestAnimationFrame(update);
                    } else {
                        setScrambledText(text);
                        setIsComplete(true);
                    }
                };

                update();
            }, delay);
        };

        runScramble();

        return () => {
            cancelAnimationFrame(frameId);
            clearTimeout(timeoutId);
        };
    }, [text, trigger, delay, chars]);

    return { scrambledText, isComplete };
};
