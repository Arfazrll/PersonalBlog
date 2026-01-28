'use client';

import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { useTexture, Environment, Lightformer, Text, RoundedBox } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { portfolioData } from '@/data/portfolio';

extend({ MeshLineGeometry, MeshLineMaterial });

useTexture.preload('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/SOT1hmCesOHxEYxL7vkoZ/c57b29c85912047c414311723320c16b/band.jpg');

function ResponsiveCamera() {
    const { camera, size } = useThree();

    useEffect(() => {
        const isMobile = size.width < 768;
        if (isMobile) {
            camera.position.set(0, 0, 14); // Original mobile dist
            if (camera instanceof THREE.PerspectiveCamera) camera.fov = 50;
        } else {
            camera.position.set(0, 0, 20); // Original desktop dist
            if (camera instanceof THREE.PerspectiveCamera) camera.fov = 20; // Original FOV
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
            {/* Simple Holographic Layering */}
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
    const band = useRef<any>();
    const fixed = useRef<any>();
    const j1 = useRef<any>();
    const j2 = useRef<any>();
    const j3 = useRef<any>();
    const card = useRef<any>();

    const vec = new THREE.Vector3();
    const ang = new THREE.Vector3();
    const rot = new THREE.Vector3();
    const dir = new THREE.Vector3();

    const segmentProps = {
        type: 'dynamic' as const,
        canSleep: true,
        colliders: false as const,
        angularDamping: 4, // Original Damping
        linearDamping: 4   // Original Damping
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
                        scale={2.25} // Original Scale
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
                    lineWidth={1.0} // Original Width
                />
            </mesh>
        </>
    );
}

export function Lanyard() {
    return (
        <div className="w-full h-full relative z-20">
            <Canvas gl={{ alpha: true, antialias: true }} onCreated={({ gl }) => { gl.setClearColor(new THREE.Color(0x000000), 0); }}>
                <ResponsiveCamera />
                <ambientLight intensity={Math.PI} />
                <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
                    <Band />
                </Physics>
                <Environment blur={0.75}>
                    <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                    <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                    <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                    <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
                </Environment>
            </Canvas>
        </div>
    );
}