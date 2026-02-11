"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { usePerformance } from "@/hooks/usePerformance";

// Initialize RectAreaLight uniforms
if (typeof window !== "undefined") {
    RectAreaLightUniformsLib.init();
}

const DEFAULT_THEME = {
    background: 0x000000,
    gridColor: 0x333333,
    accentColor: 0xF00589,
};

interface OceanMeshProps {
    geoSize: number;
    geoFragments: number;
    waveAmplitude: number;
    waveSpeed: number;
    accentColor: number;
    showWireframe: boolean;
    opacity: number;
}

function OceanMesh({
    geoSize,
    geoFragments,
    waveAmplitude,
    waveSpeed,
    accentColor,
    showWireframe,
    opacity,
}: OceanMeshProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    const { geometry, waves } = useMemo(() => {
        const geo = new THREE.PlaneGeometry(geoSize, geoSize, geoFragments, geoFragments);
        const positionAttribute = geo.getAttribute("position");
        const waveData: Array<{
            x: number;
            y: number;
            z: number;
            ang: number;
            amp: number;
            speed: number;
        }> = [];

        for (let i = 0; i < positionAttribute.count; i++) {
            waveData.push({
                x: positionAttribute.getX(i),
                y: positionAttribute.getY(i),
                z: positionAttribute.getZ(i),
                ang: Math.PI * 2,
                amp: Math.random() * waveAmplitude,
                speed: 0.03 + Math.random() * waveSpeed,
            });
        }

        return { geometry: geo, waves: waveData };
    }, [geoSize, geoFragments, waveAmplitude, waveSpeed]);

    useFrame(() => {
        if (!meshRef.current) return;

        const positionAttribute = meshRef.current.geometry.getAttribute("position");

        for (let i = 0; i < positionAttribute.count; i++) {
            const wave = waves[i];
            positionAttribute.setX(i, wave.x + Math.cos(wave.ang) * wave.amp);
            positionAttribute.setY(i, wave.y + Math.sin(wave.ang / 2) * wave.amp);
            positionAttribute.setZ(i, wave.z + Math.cos(wave.ang / 3) * wave.amp);
            wave.ang += wave.speed;
        }

        positionAttribute.needsUpdate = true;
    });

    const wireframeMaterial = useMemo(
        () =>
            new THREE.MeshBasicMaterial({ // Swapped from Physical to Basic for performance
                color: accentColor,
                wireframe: true,
                transparent: true,
                opacity: 0.5,
            }),
        [accentColor]
    );

    const surfaceMaterial = useMemo(
        () =>
            new THREE.MeshStandardMaterial({ // Swapped from Physical to Standard
                color: accentColor,
                transparent: true,
                opacity: opacity,
                wireframe: false,
            }),
        [accentColor, opacity]
    );

    return (
        <group rotation={[-90 * Math.PI / 180, 0, 0]}>
            <mesh ref={meshRef} geometry={geometry} material={surfaceMaterial} receiveShadow />
            {showWireframe && (
                <mesh geometry={geometry} material={wireframeMaterial} />
            )}
        </group>
    );
}

function Boat({ data, color }: { data: any; color: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (!meshRef.current) return;
        const time = clock.getElapsedTime() * 3;

        meshRef.current.rotation.z = (Math.sin(time / data.vel) * data.amp * Math.PI) / 180;
        meshRef.current.rotation.x = (Math.cos(time) * data.vel * Math.PI) / 180;
        meshRef.current.position.y = Math.sin(time / data.vel) * data.pos;
    });

    return (
        <mesh
            ref={meshRef}
            position={data.position}
            rotation={[0, data.rotationY, 0]}
            scale={data.scale}
            castShadow
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
}

function BoatGroup({ count, spreadRange, color }: { count: number; spreadRange: number; color: number }) {
    const boats = useMemo(() => {
        const items: any[] = [];
        for (let i = 0; i < count; i++) {
            const x = -Math.random() * spreadRange + Math.random() * spreadRange;
            const z = -Math.random() * spreadRange + Math.random() * spreadRange;
            const sX = Math.random();
            const sY = 0.5 + Math.random() * 2;

            items.push({
                position: [x, 0, z],
                scale: [sX, sY, sX],
                rotationY: (Math.random() * 360 * Math.PI) / 180,
                vel: 1 + Math.random() * 4,
                amp: 1 + Math.random() * 6,
                pos: Math.random() * 0.2,
            });
        }
        return items;
    }, [count, spreadRange]);

    return (
        <group>
            {boats.map((boat, i) => (
                <Boat key={i} data={boat} color={color} />
            ))}
        </group>
    );
}

function SceneContent({
    backgroundColor,
    accentColor,
    rotationSpeed,
    showGrid,
    showBoats,
    boatCount,
    boatSpread,
    oceanSize,
    oceanFragments,
    waveAmplitude,
    waveSpeed,
    showWireframe,
    oceanOpacity,
}: any) {
    const { scene, camera } = useThree();
    const groupRef = useRef<THREE.Group>(null);

    useEffect(() => {
        scene.fog = new THREE.Fog(backgroundColor, 5, 20);
        scene.background = new THREE.Color(backgroundColor);
    }, [scene, backgroundColor]);

    useFrame(() => {
        camera.lookAt(0, 0, 0);
        if (groupRef.current) {
            groupRef.current.rotation.y += rotationSpeed;
        }
    });

    return (
        <>
            <hemisphereLight args={[0xFFD3D3, accentColor, 1]} />
            <pointLight args={[accentColor, 1]} position={[-5, -10, -10]} />

            <group ref={groupRef}>
                {showGrid && <gridHelper args={[20, 20, 0x444444, 0x222222]} position={[0, -1, 0]} />}
                {showBoats && <BoatGroup count={boatCount} spreadRange={boatSpread} color={accentColor} />}
                <OceanMesh
                    geoSize={oceanSize}
                    geoFragments={oceanFragments}
                    waveAmplitude={waveAmplitude}
                    waveSpeed={waveSpeed}
                    accentColor={accentColor}
                    showWireframe={showWireframe}
                    opacity={oceanOpacity}
                />
            </group>
        </>
    );
}

export interface LiquidOceanProps {
    className?: string;
    backgroundColor?: number;
    gridColor?: number;
    accentColor?: number;
    fov?: number;
    rotationSpeed?: number;
    showGrid?: boolean;
    showBoats?: boolean;
    boatCount?: number;
    boatSpread?: number;
    oceanSize?: number;
    oceanFragments?: number;
    waveAmplitude?: number;
    waveSpeed?: number;
    showWireframe?: boolean;
    oceanOpacity?: number;
    children?: React.ReactNode;
}

export function LiquidOcean({
    className,
    backgroundColor = DEFAULT_THEME.background,
    accentColor = DEFAULT_THEME.accentColor,
    fov = 20,
    rotationSpeed = 0.001,
    showGrid = true,
    showBoats = true,
    boatCount = 5,
    boatSpread = 5,
    oceanSize = 25,
    oceanFragments = 15, // Desktop optimization: Reduced from 25/40 to 15
    waveAmplitude = 0.2,
    waveSpeed = 0.05,
    showWireframe = true,
    oceanOpacity = 0.85,
    children,
}: LiquidOceanProps) {
    const [isVisible, setIsVisible] = React.useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { isLowPowerMode } = usePerformance();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // Mobile Fallback: Lightweight CSS Gradient
    if (isLowPowerMode) {
        return (
            <div
                ref={containerRef}
                className={cn("relative w-full h-full min-h-[400px] overflow-hidden bg-black", className)}
                style={{
                    backgroundColor: `#${backgroundColor.toString(16).padStart(6, '0')}`
                }}
            >
                <div className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `radial-gradient(circle at 50% 120%, #${accentColor.toString(16).padStart(6, '0')}, transparent)`
                    }}
                />
                {children}
            </div>
        );
    }

    return (
        <div ref={containerRef} className={cn("relative w-full h-full min-h-[400px] overflow-hidden bg-black cursor-crosshair", className)}>
            <Canvas
                dpr={1}
                frameloop={isVisible ? "always" : "never"}
                camera={{ position: [0, 2, 10], fov }}
                gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
                style={{ position: "absolute", inset: 0 }}
            >
                <SceneContent
                    backgroundColor={backgroundColor}
                    accentColor={accentColor}
                    rotationSpeed={rotationSpeed}
                    showGrid={showGrid}
                    showBoats={showBoats}
                    boatCount={boatCount}
                    boatSpread={boatSpread}
                    oceanSize={oceanSize}
                    oceanFragments={oceanFragments}
                    waveAmplitude={waveAmplitude}
                    waveSpeed={waveSpeed}
                    showWireframe={showWireframe}
                    oceanOpacity={oceanOpacity}
                />
            </Canvas>

            {children && (
                <div className="absolute inset-0 pointer-events-none select-none z-10">
                    {children}
                </div>
            )}
        </div>
    );
}

export default LiquidOcean;
