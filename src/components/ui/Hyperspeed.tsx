import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
// EffectComposer removed for performance
import * as THREE from 'three';

const FogController = ({ color, paused }: { color: string, paused?: boolean }) => {
    const { scene } = useThree();
    useEffect(() => {
        if (paused) return; // Don't re-initialize if paused
        scene.fog = new THREE.Fog(color, 50, 190);
        scene.background = new THREE.Color(color);
    }, [scene, color, paused]);
    return null;
};

const MovingRoad = ({ color, paused }: { color: string, paused?: boolean }) => {
    const mesh = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (paused || !mesh.current) return;
        mesh.current.position.z += delta * 20;
        if (mesh.current.position.z > 20) {
            mesh.current.position.z = 0;
        }
    });

    return (
        <group ref={mesh} position={[0, -2, 0]}>
            <gridHelper args={[400, 200, color, color]} />
        </group>
    );
};

const MovingStars = ({ color, paused }: { color: string, paused?: boolean }) => {
    const count = 100; // Aggressively optimized count
    const mesh = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    type Particle = {
        t: number;
        speed: number;
        xFactor: number;
        yFactor: number;
        zFactor: number;
    };

    const particles = useMemo(() => {
        const temp: Particle[] = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, speed, xFactor, yFactor, zFactor });
        }
        return temp;
    }, [count]);

    useFrame((state, delta) => {
        if (paused || !mesh.current) return;
        particles.forEach((particle, i) => {
            let { t, speed, xFactor, yFactor, zFactor } = particle;
            t += speed * 50;
            particle.zFactor += delta * 50;
            if (particle.zFactor > 20) particle.zFactor = -100;

            dummy.position.set(
                xFactor + (xFactor / 10) * particle.zFactor * 0.1,
                yFactor + (yFactor / 10) * particle.zFactor * 0.1,
                particle.zFactor
            );

            dummy.scale.set(0.1, 0.1, 2 + speed * 10);
            dummy.rotation.set(0, 0, 0);
            dummy.updateMatrix();

            if (mesh.current) {
                mesh.current.setMatrixAt(i, dummy.matrix);
            }
            particle.t = t;
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshBasicMaterial color={color} />
        </instancedMesh>
    );
}

export const hyperspeedPresets = {
    one: {
        onSpeedUp: () => { },
        onSlowDown: () => { },
        distortion: 'turbulentDistortion',
        length: 400,
        roadWidth: 10,
        islandWidth: 2,
        lanesPerRoad: 3,
        fov: 90,
        fovSpeedUp: 150,
        speedUp: 2,
        carLightsFade: 0.4,
        totalSideLightSticks: 20,
        lightPairsPerRoadWay: 40,
        shoulderLinesWidthPercentage: 0.05,
        brokenLinesWidthPercentage: 0.1,
        brokenLinesLengthPercentage: 0.5,
        lightStickWidth: [0.12, 0.5],
        lightStickHeight: [1.3, 1.7],
        movingAwaySpeed: [60, 80],
        movingCloserSpeed: [-120, -160],
        carLightsLength: [400 * 0.03, 400 * 0.2],
        carLightsRadius: [0.05, 0.14],
        carWidthPercentage: [0.3, 0.5],
        carShiftX: [-0.8, 0.8],
        carFloorSeparation: [0.05, 1],
        colors: {
            road: 0x080808,
            island: 0x0a0a0a,
            background: 0x000000,
            shoulderLines: 0xFFFFFF,
            brokenLines: 0xFFFFFF,
            leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
            rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
            sticks: 0x03B3C3,
        }
    }
}

interface HyperspeedProps {
    effectOptions?: any;
    className?: string;
    paused?: boolean;
}

const Hyperspeed: React.FC<HyperspeedProps> = ({ effectOptions, className, paused }) => {
    // Helper to ensure valid 6-digit hex color
    const toHex = (num: number | undefined, defaultColor: string) => {
        if (num === undefined) return defaultColor;
        return '#' + num.toString(16).padStart(6, '0');
    };

    // Extract theme colors or defaults
    const roadColor = useMemo(() => toHex(effectOptions?.colors?.shoulderLines, '#444444'), [effectOptions]);
    const starColor = useMemo(() => toHex(effectOptions?.colors?.sticks, '#ffffff'), [effectOptions]);
    const bgColor = useMemo(() => toHex(effectOptions?.colors?.background, '#000000'), [effectOptions]);

    return (
        <div className={`hyperspeed-container w-full h-full relative overflow-hidden ${className}`}>
            <Canvas
                style={{ background: bgColor }}
                camera={{ position: [0, 2, 5], fov: 75 }}
                gl={{
                    antialias: false,
                    powerPreference: "high-performance",
                    preserveDrawingBuffer: false,
                    alpha: false
                }}
                dpr={1} // Lock to 1 for maximum performance
                performance={{ min: 0.5 }}
            >
                <FogController color={bgColor} paused={paused} />
                <MovingRoad color={roadColor} paused={paused} />
                <MovingStars color={starColor} paused={paused} />
            </Canvas>
        </div>
    );
};

export default Hyperspeed;
