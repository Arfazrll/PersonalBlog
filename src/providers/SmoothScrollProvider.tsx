'use client';

import { ReactLenis } from 'lenis/react';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root options={{
            lerp: 0.1,
            duration: 1.5,
            smoothWheel: true,
            // smoothTouch is causing TS error in this version's types
            // @ts-ignore
            smoothTouch: false
        }}>
            {children}
        </ReactLenis>
    );
}
