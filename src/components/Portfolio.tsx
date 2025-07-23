'use client';

import { useState } from 'react';
import { ProjectType } from '@/types/ProjectType';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { getModelPath } from '@/utils/getModelPath';
import dynamic from 'next/dynamic';
import styles from '../app/styles/components/Homepage.module.scss';

// Dynamically import 3D Model
const Model = dynamic(() => import('./3D/Model'), { ssr: false });

type Props = {
  projects: ProjectType[];
};

export default function PortfolioClient({ projects }: Props) {
  const [index, setIndex] = useState(0);
  const project = projects[index];

  const next = () => setIndex((i) => (i + 1) % projects.length);
  const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length);

  return (
    <div className={styles.container}>
      {project && (
        <>
          <div className={styles.projects}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <ul>
              {project.tags?.map((tag, i) => (
                <li key={i}>{tag.tag}</li>
              ))}
            </ul>
            <div className={styles.buttons}>
              <button onClick={prev}>← Précédent</button>
              <button onClick={next}>Suivant →</button>
            </div>
          </div>

          <div className={styles.canvas}>
            <Canvas camera={{ position: [0, 0, 0], fov: 45 }}>
              <ambientLight />
              <directionalLight position={[2, 2, 2]} />
              <Model modelPath={getModelPath(project)} />
              <OrbitControls />
              <Environment preset='city' />
            </Canvas>
          </div>
        </>
      )}
    </div>
  );
}
