import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";

export const HoverScrambleText = ({ text, className }: { text: string; className?: string }) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+";
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseOver = () => {
        let iteration = 0;
        setIsScrambling(true);
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        if (letter === " " || letter === "\n") return letter;
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                setIsScrambling(false);
                if (intervalRef.current) clearInterval(intervalRef.current);
            }
            iteration += 2;
        }, 30);
    };

    return (
        <span 
            className={cn(
                className,
                "transition-colors duration-300 cursor-default",
                isScrambling ? "text-primary/80 dark:text-primary" : "inherit",
                "hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary hover:to-purple-500"
            )} 
            onMouseOver={handleMouseOver}
        >
            {displayText.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                    {line}
                    {i !== displayText.split('\n').length - 1 && <br className="hidden md:block" />}
                </React.Fragment>
            ))}
        </span>
    );
};
