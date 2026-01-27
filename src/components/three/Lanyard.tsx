'use client';

import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer, Text } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { portfolioData } from '@/data/portfolio';

extend({ MeshLineGeometry, MeshLineMaterial });

useGLTF.preload('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb');
useTexture.preload('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/SOT1hmCesOHxEYxL7vkoZ/c57b29c85912047c414311723320c16b/band.jpg');

// ============================================
// HOLOGRAPHIC AVATAR COMPONENT
// Multi-layer glow effect with gradient border
// ============================================
function HolographicAvatar({
    url,
    position,
    size = 0.13
}: {
    url: string;
    position: [number, number, number];
    size?: number
}) {
    const texture = useTexture(url);
    const sideLength = size * 2;

    return (
        <group position={position}>
            {/* Layer 1: Outer glow (Cyan) - z: 0.00 */}
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={[sideLength + 0.08, sideLength + 0.08]} />
                <meshBasicMaterial color="#06b6d4" transparent opacity={0.15} />
            </mesh>

            {/* Layer 2: Middle glow (Violet) - z: 0.01 */}
            <mesh position={[0, 0, 0.01]}>
                <planeGeometry args={[sideLength + 0.05, sideLength + 0.05]} />
                <meshBasicMaterial color="#8b5cf6" transparent opacity={0.25} />
            </mesh>

            {/* Layer 3: Inner glow (Indigo) - z: 0.02 */}
            <mesh position={[0, 0, 0.02]}>
                <planeGeometry args={[sideLength + 0.025, sideLength + 0.025]} />
                <meshBasicMaterial color="#6366f1" transparent opacity={0.6} />
            </mesh>

            {/* Layer 4: Avatar border - z: 0.03 */}
            <mesh position={[0, 0, 0.03]}>
                <planeGeometry args={[sideLength + 0.012, sideLength + 0.012]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>

            {/* Layer 5: Avatar image - z: 0.04 */}
            <mesh position={[0, 0, 0.04]}>
                <planeGeometry args={[sideLength, sideLength]} />
                <meshBasicMaterial map={texture} />
            </mesh>
        </group>
    );
}

// ============================================
// MAIN LANYARD EXPORT
// ============================================
export function Lanyard() {
    return (
        <div className="w-full h-full min-h-[500px] relative z-20">
            <Canvas camera={{ position: [0, 0, 13], fov: 25 }} gl={{ alpha: true }}>
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

// ============================================
// BAND COMPONENT (Physics + Card)
// ============================================
function Band({ maxSpeed = 50, minSpeed = 10 }) {
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
        angularDamping: 2,
        linearDamping: 2
    };

    const { nodes, materials } = useGLTF(
        'https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb'
    ) as any;

    const bandTexture = useTexture(
        'https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/SOT1hmCesOHxEYxL7vkoZ/c57b29c85912047c414311723320c16b/band.jpg'
    );

    const { width, height } = useThree((state) => state.size);

    const [curve] = useState(
        () => new THREE.CatmullRomCurve3([
            new THREE.Vector3(),
            new THREE.Vector3(),
            new THREE.Vector3(),
            new THREE.Vector3()
        ])
    );

    const [dragged, drag] = useState<THREE.Vector3 | false>(false);
    const [hovered, hover] = useState(false);

    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
    useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

    useEffect(() => {
        if (hovered) {
            document.body.style.cursor = dragged ? 'grabbing' : 'grab';
            return () => {
                document.body.style.cursor = 'auto';
            };
        }
    }, [hovered, dragged]);

    useFrame((state, delta) => {
        if (dragged) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
            dir.copy(vec).sub(state.camera.position).normalize();
            vec.add(dir.multiplyScalar(state.camera.position.length()));
            [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
            card.current?.setNextKinematicTranslation({
                x: vec.x - dragged.x,
                y: vec.y - dragged.y,
                z: vec.z - dragged.z
            });
        }

        if (fixed.current) {
            [j1, j2].forEach((ref) => {
                if (!ref.current.lerped) {
                    ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
                }
                const clampedDistance = Math.max(
                    0.1,
                    Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
                );
                ref.current.lerped.lerp(
                    ref.current.translation(),
                    delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
                );
            });

            curve.points[0].copy(j3.current.translation());
            curve.points[1].copy(j2.current.lerped);
            curve.points[2].copy(j1.current.lerped);
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
                <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
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
                        onPointerUp={(e) => {
                            (e.target as Element).releasePointerCapture(e.pointerId);
                            drag(false);
                        }}
                        onPointerDown={(e) => {
                            (e.target as Element).setPointerCapture(e.pointerId);
                            drag(
                                new THREE.Vector3()
                                    .copy(e.point)
                                    .sub(vec.copy(card.current.translation()))
                            );
                        }}
                    >
                        {/* ========================================
                            CARD BASE - Premium Dark Material
                        ======================================== */}
                        <mesh geometry={nodes.card.geometry}>
                            <meshPhysicalMaterial
                                color="#0a0a12"
                                clearcoat={1}
                                clearcoatRoughness={0.1}
                                roughness={0.3}
                                metalness={0.4}
                            />
                        </mesh>

                        {/* Clip & Clamp - Metal */}
                        <mesh
                            geometry={nodes.clip.geometry}
                            material={materials.metal}
                            material-roughness={0.3}
                        />
                        <mesh geometry={nodes.clamp.geometry} material={materials.metal} />

                        {/* ========================================
                            CARD CONTENT - LARGER SIZES
                            All elements scaled up for visibility
                        ======================================== */}
                        <group position={[0, 0.48, 0]}>

                            {/* TOP ACCENT LINE - thicker */}
                            <mesh position={[0, 0.18, 0.01]}>
                                <planeGeometry args={[0.60, 0.010]} />
                                <meshBasicMaterial color="#6366f1" />
                            </mesh>

                            {/* AVATAR - BIGGER (0.14 instead of 0.09) */}
                            <HolographicAvatar
                                url={portfolioData.personal.avatar}
                                position={[0, -0.02, 0.02]}
                                size={0.14}
                            />

                            {/* DIVIDER LINE - thicker */}
                            <mesh position={[0, -0.25, 0.07]}>
                                <planeGeometry args={[0.45, 0.004]} />
                                <meshBasicMaterial color="#6366f1" transparent opacity={0.7} />
                            </mesh>

                            {/* NAME - LARGER FONT (0.065 instead of 0.048) */}
                            <Text
                                position={[0, -0.36, 0.08]}
                                fontSize={0.065}
                                color="#ffffff"
                                anchorX="center"
                                anchorY="middle"
                                maxWidth={0.65}
                                textAlign="center"
                                fontWeight="bold"
                            >
                                {portfolioData.personal.name}
                            </Text>

                            {/* TITLE - LARGER FONT (0.040 instead of 0.028) */}
                            <Text
                                position={[0, -0.48, 0.08]}
                                fontSize={0.040}
                                color="#a1a1aa"
                                anchorX="center"
                                anchorY="middle"
                                maxWidth={0.60}
                                textAlign="center"
                            >
                                {portfolioData.personal.title}
                            </Text>

                            {/* BOTTOM DECORATIVE - larger dots */}
                            <mesh position={[0, -0.58, 0.01]}>
                                <planeGeometry args={[0.40, 0.005]} />
                                <meshBasicMaterial color="#8b5cf6" transparent opacity={0.5} />
                            </mesh>
                            <mesh position={[-0.24, -0.58, 0.01]}>
                                <circleGeometry args={[0.008, 16]} />
                                <meshBasicMaterial color="#06b6d4" />
                            </mesh>
                            <mesh position={[0.24, -0.58, 0.01]}>
                                <circleGeometry args={[0.008, 16]} />
                                <meshBasicMaterial color="#06b6d4" />
                            </mesh>

                            {/* BOTTOM ACCENT LINE - thicker */}
                            <mesh position={[0, -0.68, 0.01]}>
                                <planeGeometry args={[0.60, 0.008]} />
                                <meshBasicMaterial color="#6366f1" transparent opacity={0.3} />
                            </mesh>
                        </group>
                    </group>
                </RigidBody>
            </group>

            {/* LANYARD BAND */}
            <mesh ref={band}>
                <meshLineGeometry />
                <meshLineMaterial
                    color="white"
                    depthTest={false}
                    resolution={new THREE.Vector2(width, height)}
                    useMap={1}
                    map={bandTexture}
                    repeat={new THREE.Vector2(-3, 1)}
                    lineWidth={1}
                />
            </mesh>
        </>
    );
}