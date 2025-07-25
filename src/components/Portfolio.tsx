'use client';

import { useRef, useState, useEffect } from 'react';
import { ProjectType } from '@/types/ProjectType';
import { getModelPath } from '@/utils/getModelPath';
import styles from '../app/styles/components/Projects.module.scss';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import { animateTextOut, animateTextIn } from '@/utils/changeText';
import Scene from './3D/Scene';
import Link from 'next/link';
import Image from 'next/image';
import * as THREE from 'three';
import TransitionLink from './TransitionLink';
import { animateModelChange } from '@/utils/changeModel';

gsap.registerPlugin(SplitText);

type Props = {
  projects: ProjectType[];
};

export default function PortfolioClient({ projects }: Props) {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLUListElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Mesh>(null);

  const project = projects[index];

  useEffect(() => {
    if (!isAnimating) return;
    animateTextIn({ titleRef, descRef, tagsRef, paletteRef }).then(() => {
      setIsAnimating(false);
    });
  }, [index]);

  const handleChange = async (direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);

    await animateTextOut({ titleRef, descRef, tagsRef, paletteRef });
    await animateModelChange({ modelRef });

    setIndex((prev) => {
      let nextIdx =
        direction === 'next'
          ? (prev + 1) % projects.length
          : (prev - 1 + projects.length) % projects.length;
      return nextIdx;
    });
  };

  return (
    <section className={styles.container} ref={projectRef}>
      {project && (
        <div className={styles.project}>
          <div className={styles.infos}>
            <h3>La recette</h3>
            <p ref={descRef}>{project.description}</p>
          </div>
          <div className={styles.infos}>
            <h3>Nos ingrédients</h3>
            <ul ref={tagsRef}>
              {project.tags?.map((tag, i) => (
                <li key={i}>#{tag.tag}</li>
              ))}
            </ul>
          </div>
          <div className={styles.infos}>
            <h3>La touche du chef</h3>
            <div ref={paletteRef} className={styles.palette}>
              {project.colors_connection.nodes.map((color, idx) => (
                <span style={{ backgroundColor: color.hex }} key={idx}>
                  {color.title}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.buttons}>
            <button onClick={() => handleChange('prev')}>← Précédent</button>
            <TransitionLink href='/'>Retour à l'accueil</TransitionLink>
            <button onClick={() => handleChange('next')}>Suivant →</button>
          </div>
          <div className={styles.title}>
            <h2 ref={titleRef}>{project.title}</h2>
            {project.url && (
              <Link href={project.url} target='_blank' rel='noreferrer'>
                <Image
                  src={'/icons/external_link.svg'}
                  alt='External link icon'
                  width={60}
                  height={60}
                />
              </Link>
            )}
          </div>
        </div>
      )}
      {project && (
        <div className={styles.canvas}>
          <Scene modelRef={modelRef} path={getModelPath(project)} />
        </div>
      )}
    </section>
  );
}
