'use client';

import { useEffect, useRef, useState, HTMLAttributes } from 'react';







interface SplineSceneProps extends HTMLAttributes<HTMLDivElement> {
    scene: string;
    className?: string;
}



export function SplineScene({ scene, className, ...props }: SplineSceneProps) {
    const splineRef = useRef<HTMLElement>(null);
    const isMounted = useRef(true);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        isMounted.current = true;

        const SCRIPT_ID = 'spline-viewer-script';
        let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement;

        const handleLoad = () => {
            if (isMounted.current) setIsLoaded(true);
        };

        if (!script) {
            script = document.createElement('script');
            script.id = SCRIPT_ID;
            script.type = 'module';
            script.src = 'https://unpkg.com/@splinetool/viewer@latest/build/spline-viewer.js';
            script.async = true;
            script.addEventListener('load', handleLoad);
            document.body.appendChild(script);
        } else {
            if (customElements.get('spline-viewer')) {
                handleLoad();
            } else {
                script.addEventListener('load', handleLoad);
            }
        }

        return () => {
            isMounted.current = false;
            if (script) script.removeEventListener('load', handleLoad);
        };
    }, []);

    // Inject CSS into Shadow DOM non-destructively
    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        const injectStyles = () => {
            if (!isMounted.current) return;

            const currentRef = splineRef.current;
            if (currentRef && currentRef.shadowRoot) {
                const shadow = currentRef.shadowRoot;

                if (!shadow.querySelector('#spline-hide-logo-style')) {
                    const style = document.createElement('style');
                    style.id = 'spline-hide-logo-style';
                    style.textContent = `
                        #logo, 
                        a[href*="spline.design"], 
                        .spline-watermark,
                        #spline-watermark-overlay,
                        div[style*="bottom: 10px"],
                        div[style*="position: absolute; bottom: 10px; right: 10px;"] { 
                            display: none !important; 
                            opacity: 0 !important; 
                            visibility: hidden !important; 
                            pointer-events: none !important;
                        }
                    `;
                    shadow.appendChild(style);
                }
            }
        };

        const currentRef = splineRef.current;
        if (currentRef) {
            injectStyles();
            currentRef.addEventListener('load', injectStyles);

            // Limited attempts to handle late injection without eternal loop
            let attempts = 0;
            intervalId = setInterval(() => {
                if (currentRef.shadowRoot && isMounted.current) {
                    injectStyles();
                    attempts++;
                    if (attempts > 30) clearInterval(intervalId); // Stop after 30s
                }
            }, 1000);
        }

        return () => {
            if (currentRef) currentRef.removeEventListener('load', injectStyles);
            if (intervalId) clearInterval(intervalId);
        };
    }, []);

    return (
        <div className={`relative w-full h-full overflow-hidden ${className || ''}`} {...props}>
            <div className="w-full h-full pt-20">
                <spline-viewer
                    ref={splineRef}
                    url={scene}
                    loading-anim-type="spinner-small-dark"
                    style={{
                        width: '100%',
                        height: '100%',
                        transform: 'scale(1.2)',
                        transformOrigin: 'center center',
                        visibility: isLoaded ? 'visible' : 'hidden',
                        opacity: isLoaded ? 1 : 0,
                        transition: 'opacity 0.8s ease-in-out'
                    }}
                />
            </div>
        </div>
    );
}
