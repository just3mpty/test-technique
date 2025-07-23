'use client';

import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Suspense } from 'react';

type Props = {
  modelPath: string;
};

export default function Model3D({ modelPath }: Props) {
  const gltf = useLoader(GLTFLoader, modelPath);

  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} scale={1.5} position={[0, -10, -20]} />
    </Suspense>
  );
}
