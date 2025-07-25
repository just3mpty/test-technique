'use client';

import { Suspense, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useGLTF, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

type Props = {
  modelPath: string;
  modelRef: React.RefObject<THREE.Mesh | null>;
};

export default function Model3D({ modelPath, modelRef }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setError(null);
    setIsLoaded(false);
    if (!modelPath) {
      setError('Aucun chemin de modèle fourni.');
      return;
    }
    let cancelled = false;
    fetch(modelPath)
      .then((res) => {
        if (!res.ok && !cancelled) setError('Modèle non trouvé.');
        else if (!cancelled) setIsLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setError('Erreur de chargement du modèle.');
      });
    return () => {
      cancelled = true;
    };
  }, [modelPath]);

  const gltf = isLoaded && !error ? useGLTF(modelPath) : null;
  const clock = new THREE.Clock();

  useFrame(() => {
    if (!modelRef.current) return;
    modelRef.current.rotation.y -= Math.PI / 1000;
    const elapsed = clock.getElapsedTime();
    modelRef.current.position.y = Math.sin(elapsed) * 0.25;
  });

  if (error) {
    return (
      <Html center>
        <div style={{ color: 'red', background: 'white', padding: 8, borderRadius: 4 }}>
          Erreur : {error}
        </div>
      </Html>
    );
  }

  if (!gltf) {
    return (
      <Html center>
        <div>Chargement du modèle...</div>
      </Html>
    );
  }

  return (
    <Suspense fallback={
      <Html center>
        <div>Chargement du modèle...</div>
      </Html>
    }>
      <primitive scale={0.5} object={gltf.scene} ref={modelRef} />
    </Suspense>
  );
}
