'use client';

import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Suspense } from 'react';
import * as THREE from 'three';

type Props = {
  modelPath: string;
  groupRef: React.RefObject<THREE.Group | null>;
};

export default function Model3D({ modelPath, groupRef }: Props) {
  const gltf = useLoader(GLTFLoader, modelPath);

  return (
    <Suspense fallback={null}>
      <group ref={groupRef} position={[0, -5, -10]}>
        <primitive object={gltf.scene} />
      </group>
    </Suspense>
  );
}
