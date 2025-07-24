'use client';

import { Suspense } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

type Props = {
  modelPath: string;
  modelRef: React.RefObject<THREE.Mesh | null>;
};

export default function Model3D({ modelPath, modelRef }: Props) {
  const gltf = useGLTF(modelPath);

  const clock = new THREE.Clock();

  useFrame(() => {
    if (!modelRef.current) return;
    modelRef.current.rotation.y -= Math.PI / 1000;
    const elapsed = clock.getElapsedTime();
    modelRef.current.position.y = Math.sin(elapsed) * 0.25;
  });

  return (
    <Suspense fallback={null}>
      <primitive scale={0.5} object={gltf.scene} ref={modelRef} />
    </Suspense>
  );
}
