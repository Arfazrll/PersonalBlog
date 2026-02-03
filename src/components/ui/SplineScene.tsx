'use client';

import { useEffect, useRef, useState, HTMLAttributes } from 'react';







interface SplineSceneProps extends HTMLAttributes<HTMLDivElement> {
    scene: string;
    className?: string;
}



export function SplineScene({ scene, className, ...props }: SplineSceneProps) {
    const [isLoading, setIsLoading] = useState(true);

    const splineRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Load the Spline Viewer script from CDN
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://unpkg.com/@splinetool/viewer@latest/build/spline-viewer.js'; // Use latest to support new exports
        script.async = true;
        script.onload = () => setIsLoading(false);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // Remove logo from Shadow DOM
    useEffect(() => {
        const removeLogo = () => {
            if (splineRef.current && splineRef.current.shadowRoot) {
                const logo = splineRef.current.shadowRoot.querySelector('#logo');
                if (logo) {
                    logo.remove();
                }
            }
        };

        const currentRef = splineRef.current;
        if (currentRef) {
            currentRef.addEventListener('load', removeLogo);
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener('load', removeLogo);
            }
        };
    }, []);

    return (
        <div className={`relative w-full h-full ${className || ''}`} {...props}>
            <spline-viewer
                ref={splineRef}
                url={scene}
                loading-anim-type="spinner-small-dark"
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
}
