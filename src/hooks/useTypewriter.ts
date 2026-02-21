import { useState, useEffect } from 'react';

export const useTypewriter = (
    text: string,
    speed: number = 30,
    delay: number = 1200,
    trigger: boolean = true
) => {
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (!trigger) return;

        let timeoutId: NodeJS.Timeout;
        let charIndex = 0;

        const type = () => {
            if (charIndex <= text.length) {
                setDisplayText(text.slice(0, charIndex));
                charIndex++;
                timeoutId = setTimeout(type, speed);
            } else {
                setIsComplete(true);
            }
        };

        const startTimeout = setTimeout(type, delay);

        return () => {
            clearTimeout(startTimeout);
            clearTimeout(timeoutId);
        };
    }, [text, speed, delay, trigger]);

    return { displayText, isComplete };
};
