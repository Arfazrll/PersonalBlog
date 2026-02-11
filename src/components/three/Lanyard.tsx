'use client';

import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { useTexture, Text, RoundedBox } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { portfolioData } from '@/data/portfolio';
import { usePerformance } from '@/hooks/usePerformance';

extend({ MeshLineGeometry, MeshLineMaterial });

declare module '@react-three/fiber' {
    interface ThreeElements {
        meshLineGeometry: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
        meshLineMaterial: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
    }
}

useTexture.preload('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/SOT1hmCesOHxEYxL7vkoZ/c57b29c85912047c414311723320c16b/band.jpg');

function ResponsiveCamera() {
    const { camera, size } = useThree();

    useEffect(() => {
        const isMobile = size.width < 768;
        if (isMobile) {
            camera.position.set(0, 0, 14);
            if (camera instanceof THREE.PerspectiveCamera) camera.fov = 50;
        } else {
            camera.position.set(0, 0, 20);
            if (camera instanceof THREE.PerspectiveCamera) camera.fov = 20;
        }
        camera.updateProjectionMatrix();
    }, [size, camera]);

    return null;
}

function HolographicAvatar({ url, position, size = 0.13 }: { url: string; position: [number, number, number]; size?: number }) {
    const texture = useTexture(url);
    const sideLength = size * 2;

    return (
        <group position={position}>
            <mesh position={[0, 0, -0.01]}>
                <planeGeometry args={[sideLength + 0.05, sideLength + 0.05]} />
                <meshBasicMaterial color="#6366f1" transparent opacity={0.3} />
            </mesh>
            <mesh>
                <planeGeometry args={[sideLength, sideLength]} />
                <meshBasicMaterial map={texture} transparent opacity={0.9} />
            </mesh>
            <mesh position={[0, 0, 0.01]}>
                <planeGeometry args={[sideLength, sideLength]} />
                <meshPhysicalMaterial transmission={1} roughness={0.0} thickness={0.05} envMapIntensity={2} transparent opacity={0.5} />
            </mesh>
        </group>
    );
}

function Band({ maxSpeed = 50, minSpeed = 0 }) {
    const band = useRef<any>(null);
    const fixed = useRef<any>(null);
    const j1 = useRef<any>(null);
    const j2 = useRef<any>(null);
    const j3 = useRef<any>(null);
    const card = useRef<any>(null);

    const vec = new THREE.Vector3();
    const ang = new THREE.Vector3();
    const rot = new THREE.Vector3();
    const dir = new THREE.Vector3();

    const segmentProps = {
        type: 'dynamic' as const,
        canSleep: true,
        colliders: false as const,
        angularDamping: 4,
        linearDamping: 4
    };

    const bandTexture = useTexture('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/SOT1hmCesOHxEYxL7vkoZ/c57b29c85912047c414311723320c16b/band.jpg');
    const { width, height } = useThree((state) => state.size);
    const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
    const [dragged, drag] = useState<THREE.Vector3 | false>(false);
    const [hovered, hover] = useState(false);

    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
    useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

    useEffect(() => {
        if (hovered) {
            document.body.style.cursor = dragged ? 'grabbing' : 'grab';
            return () => { document.body.style.cursor = 'auto'; };
        }
    }, [hovered, dragged]);

    const lerpRefs = useRef<Map<any, THREE.Vector3>>(new Map());

    useFrame((state, delta) => {
        if (!card.current || !j1.current || !j2.current || !j3.current || !fixed.current) return;

        if (dragged) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
            dir.copy(vec).sub(state.camera.position).normalize();
            vec.add(dir.multiplyScalar(state.camera.position.length()));
            [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
            card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
        }

        if (fixed.current) {
            [j1, j2].forEach((ref) => {
                if (!lerpRefs.current.has(ref)) lerpRefs.current.set(ref, new THREE.Vector3().copy(ref.current.translation()));
                const lerped = lerpRefs.current.get(ref)!;
                const currentPos = ref.current.translation();
                const clampedDistance = Math.max(0.1, Math.min(1, lerped.distanceTo(currentPos)));
                lerped.lerp(currentPos, delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
            });

            curve.points[0].copy(j3.current.translation());
            curve.points[1].copy(lerpRefs.current.get(j2)!);
            curve.points[2].copy(lerpRefs.current.get(j1)!);
            curve.points[3].copy(fixed.current.translation());
            band.current.geometry.setPoints(curve.getPoints(32));

            ang.copy(card.current.angvel());
            rot.copy(card.current.rotation());
            card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
        }
    });

    curve.curveType = 'chordal';
    bandTexture.wrapS = bandTexture.wrapT = THREE.RepeatWrapping;

    return (
        <>
            <group position={[0, 4, 0]}>
                <RigidBody ref={fixed} {...segmentProps} type="fixed" />
                <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
                <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
                <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>

                <RigidBody
                    position={[2, 0, 0]}
                    ref={card}
                    {...segmentProps}
                    type={dragged ? 'kinematicPosition' : 'dynamic'}
                >
                    <CuboidCollider args={[0.8, 1.125, 0.01]} />
                    <group
                        scale={2.25}
                        position={[0, -1.2, -0.05]}
                        onPointerOver={() => hover(true)}
                        onPointerOut={() => hover(false)}
                        onPointerUp={(e) => { (e.target as Element).releasePointerCapture(e.pointerId); drag(false); }}
                        onPointerDown={(e) => { (e.target as Element).setPointerCapture(e.pointerId); drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))); }}
                    >
                        <RoundedBox args={[1.5, 2.3, 0.02]} radius={0.05} smoothness={4}>
                            <meshPhysicalMaterial color="#0a0a12" clearcoat={1} clearcoatRoughness={0.15} roughness={0.9} metalness={0.8} />
                        </RoundedBox>
                        <mesh position={[0, 1.25, 0]} rotation={[0, Math.PI / 2, 0]}>
                            <torusGeometry args={[0.1, 0.02, 16, 32]} />
                            <meshStandardMaterial color="#888" roughness={0.3} metalness={0.8} />
                        </mesh>
                        <mesh position={[0, 1.15, 0]}>
                            <boxGeometry args={[0.2, 0.1, 0.06]} />
                            <meshStandardMaterial color="#333" roughness={0.5} metalness={0.6} />
                        </mesh>
                        <group position={[0, 0, 0.02]}>
                            <HolographicAvatar url={portfolioData.personal.avatar} position={[0, 0.1, 0.02]} size={0.16} />
                            <Text position={[0, -0.3, 0.05]} fontSize={0.10} color="#ffffff" anchorX="center" anchorY="middle" fontWeight="bold">
                                {portfolioData.personal.name}
                            </Text>
                            <Text position={[0, -0.45, 0.05]} fontSize={0.05} color="#a1a1aa" anchorX="center" anchorY="middle">
                                {portfolioData.personal.title}
                            </Text>
                        </group>
                    </group>
                </RigidBody>
            </group>
            <mesh ref={band}>
                <meshLineGeometry />
                <meshLineMaterial
                    color="white"
                    depthTest={false}
                    resolution={new THREE.Vector2(width, height)}
                    useMap={1}
                    map={bandTexture}
                    repeat={new THREE.Vector2(-4, 1)}
                    lineWidth={1.0}
                />
            </mesh>
        </>
    );
}

export function Lanyard() {
    const { isLowPowerMode } = usePerformance();

    if (isLowPowerMode) {
        return (
            <div className="w-full h-full flex items-center justify-center p-8">
                <div className="relative group transition-all duration-500 hover:scale-105">
                    {/* Glow effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-blue-500/10 to-purple-500/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />

                    {/* Card Container */}
                    <div className="relative w-64 aspect-[1.5/2.3] bg-[#0a0a12]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-center text-center p-6">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-500 to-purple-500" />

                        {/* Static Avatar */}
                        <div className="relative w-32 h-32 mb-6 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl">
                            <img
                                src={portfolioData.personal.avatar}
                                alt={portfolioData.personal.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white tracking-tight">
                                {portfolioData.personal.name}
                            </h3>
                            <p className="text-sm text-zinc-400 font-medium">
                                {portfolioData.personal.title}
                            </p>
                        </div>

                        {/* Aesthetic Footer */}
                        <div className="mt-8 pt-6 border-t border-white/5 w-full">
                            <div className="flex justify-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                </div>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 flex items-center">
                                    Archive Link Active
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full relative z-20">
            <Canvas
                dpr={[1, 1.5]}
                gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
                onCreated={({ gl }) => {
                    gl.setClearColor(new THREE.Color(0x000000), 0);
                }}
            >
                <ResponsiveCamera />
                <ambientLight intensity={2} />
                <directionalLight position={[10, 10, 10]} intensity={1} />
                <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 45}>
                    <Band />
                </Physics>
            </Canvas>
        </div>
    );
}