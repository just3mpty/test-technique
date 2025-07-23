'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Model from './Model';
import * as THREE from 'three';

export default function Scene({
  path,
  groupRef,
}: {
  path: string;
  groupRef: React.RefObject<THREE.Group | null>;
}) {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
      <ambientLight intensity={1.5} />
      <OrbitControls enableZoom={false} />
      <Model groupRef={groupRef} modelPath={path} />
      <Environment preset='city' />
    </Canvas>
  );
}
