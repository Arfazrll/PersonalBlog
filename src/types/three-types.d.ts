import { ThreeElements } from '@react-three/fiber';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import React from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements extends ThreeElements {
            // MeshLine
            meshLineGeometry: ThreeElements['mesh'] & {
                points?: any;
            };
            meshLineMaterial: ThreeElements['meshStandardMaterial'] & {
                lineWidth?: number;
                map?: any;
                useMap?: number;
                color?: any;
                opacity?: number;
                transparent?: boolean;
                resolution?: any;
                repeat?: any;
                depthTest?: boolean;
            };
            // Spline
            'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
                url?: string;
                'loading-anim-type'?: string;
                [key: string]: any;
            }, HTMLElement>;
        }
    }
}
