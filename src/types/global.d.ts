import React from 'react';

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
                url?: string;
                'loading-anim-type'?: string;
                [key: string]: any;
            }, HTMLElement>;
        }
    }
}

