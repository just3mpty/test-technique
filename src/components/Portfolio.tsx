'use client';

import { useRef, useState } from 'react';
import { ProjectType } from '@/types/ProjectType';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { getModelPath } from '@/utils/getModelPath';
import dynamic from 'next/dynamic';
import styles from '../app/styles/components/Homepage.module.scss';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const Model = dynamic(() => import('./3D/Model'), { ssr: false });

type Props = {
  projects: ProjectType[];
};

export default function PortfolioClient({ projects }: Props) {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const project = projects[index];

  const animateTextChange = (direction: 'next' | 'prev') => {
    if (animating) return;

    setAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setIndex((i) =>
          direction === 'next'
            ? (i + 1) % projects.length
            : (i - 1 + projects.length) % projects.length
        );

        setTimeout(() => {
          const newTitleSplit = new SplitText(titleRef.current, { type: 'chars' });
          const newDescSplit = new SplitText(descRef.current, { type: 'chars' });

          gsap.set([newTitleSplit.chars, newDescSplit.chars], { y: 50, opacity: 0 });

          gsap
            .timeline({
              onComplete: () => setAnimating(false),
            })
            .to(newTitleSplit.chars, {
              y: 0,
              opacity: 1,
              stagger: 0.03,
              ease: 'power3.out',
              duration: 0.6,
            })
            .to(
              newDescSplit.chars,
              {
                y: 0,
                opacity: 1,
                stagger: {
                  from: 'start',
                  each: 0.03,
                },
                ease: 'power3.out',
                duration: 0.2,
              },
              '-=0.6'
            );
        }, 200);
      },
    });

    const oldTitleSplit = new SplitText(titleRef.current, { type: 'chars' });
    const oldDescSplit = new SplitText(descRef.current, { type: 'chars' });

    tl.to(oldTitleSplit.chars, {
      y: -50,
      opacity: 0,
      stagger: 0.03,
      ease: 'power3.in',
      duration: 0.4,
    }).to(
      oldDescSplit.chars,
      {
        y: -50,
        opacity: 0,
        stagger: 0.03,
        ease: 'power3.in',
        duration: 0.15,
      },
      '-=0.6'
    );
  };

  return (
    <div className={styles.container}>
      {project && (
        <>
          <div className={styles.projects}>
            <h2 ref={titleRef}>{project.title}</h2>
            <p ref={descRef}>{project.description}</p>
            <ul>
              {project.tags?.map((tag, i) => (
                <li key={i}>{tag.tag}</li>
              ))}
            </ul>
            <div className={styles.buttons}>
              <button onClick={() => animateTextChange('prev')} disabled={animating}>
                ← Précédent
              </button>
              <button onClick={() => animateTextChange('next')} disabled={animating}>
                Suivant →
              </button>
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
