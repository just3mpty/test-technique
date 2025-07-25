'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Model from './Model';
import * as THREE from 'three';

export default function Scene({
  path,
  modelRef,
}: {
  path: string;
  modelRef: React.RefObject<THREE.Mesh | null>;
}) {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
      <ambientLight intensity={1.5} />
      <OrbitControls enableZoom={false} />
      <Model modelRef={modelRef} modelPath={path} />
      <Environment preset='studio' />
    </Canvas>
  );
}
