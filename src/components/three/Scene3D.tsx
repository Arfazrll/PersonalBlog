'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

function ParticleField() {
    const ref = useRef<THREE.Points>(null);
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(2000 * 3);
        for (let i = 0; i < 2000; i++) {
            const i3 = i * 3;
            const radius = Math.random() * 15;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);
        }
        return positions;
    }, []);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x = state.clock.elapsedTime * 0.02;
            ref.current.rotation.y = state.clock.elapsedTime * 0.03;
        }
    });

    return (
        <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color={isDark ? '#ffffff' : '#3b82f6'}
                size={0.03}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={isDark ? 0.5 : 0.8}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

function FloatingOrb({ position, colorDark, colorLight, scale = 1 }: { position: [number, number, number]; colorDark: string; colorLight: string; scale?: number }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const initialY = position[1];
    const { resolvedTheme } = useTheme();
    const color = resolvedTheme === 'dark' ? colorDark : colorLight;

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.5;
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
            meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
        }
    });

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            <icosahedronGeometry args={[1, 2]} />
            <meshStandardMaterial
                color={color}
                wireframe
                transparent
                opacity={0.3}
                emissive={color}
                emissiveIntensity={0.2}
            />
        </mesh>
    );
}

function GlowRing({ position, colorDark, colorLight, size = 2 }: { position: [number, number, number]; colorDark: string; colorLight: string; size?: number }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const { resolvedTheme } = useTheme();
    const color = resolvedTheme === 'dark' ? colorDark : colorLight;

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <torusGeometry args={[size, 0.02, 16, 100]} />
            <meshStandardMaterial
                color={color}
                transparent
                opacity={0.5}
                emissive={color}
                emissiveIntensity={0.5}
            />
        </mesh>
    );
}

interface Scene3DProps {
    className?: string;
}

export function Scene3D({ className = '' }: Scene3DProps) {
    return (
        <div className={`absolute inset-0 -z-10 ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                dpr={[1, 1.5]} // Keeping reduced DPR
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "default",
                    preserveDrawingBuffer: false,
                    failIfMajorPerformanceCaveat: true,
                }}
                onCreated={({ gl }) => {
                    gl.toneMapping = THREE.ACESFilmicToneMapping;
                    gl.toneMappingExposure = 0.9;
                }}
            >
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.3} color="#94a3b8" />
                <pointLight position={[0, 10, -10]} intensity={0.2} color="#64748b" />

                <ParticleField />

                <FloatingOrb position={[-4, 2, -3]} colorDark="#ffffff" colorLight="#3b82f6" scale={0.8} />
                <FloatingOrb position={[4, -1, -2]} colorDark="#94a3b8" colorLight="#0ea5e9" scale={0.6} />
                <FloatingOrb position={[2, 3, -4]} colorDark="#64748b" colorLight="#06b6d4" scale={0.5} />

                <GlowRing position={[0, 0, -5]} colorDark="#ffffff" colorLight="#3b82f6" size={3} />
                <GlowRing position={[-3, 1, -6]} colorDark="#94a3b8" colorLight="#0ea5e9" size={1.5} />
            </Canvas>
        </div>
    );
}
