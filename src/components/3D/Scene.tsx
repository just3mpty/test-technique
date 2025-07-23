'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Model from './Model';

export default function Scene({ path }: { path: string }) {
  return (
    <Canvas style={{ width: '100%', height: '100vh' }}>
      <ambientLight intensity={1.5} />
      <OrbitControls enableZoom={false} />
      <Model modelPath={path} />
      <Environment preset='city' />
    </Canvas>
  );
}
