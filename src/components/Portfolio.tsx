'use client';

import { useRef, useState } from 'react';
import { ProjectType } from '@/types/ProjectType';
import { getModelPath } from '@/utils/getModelPath';
import styles from '../app/styles/components/Homepage.module.scss';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import { changeText } from '@/utils/changeText';
import Scene from './3D/Scene';
import Link from 'next/link';
import Image from 'next/image';

gsap.registerPlugin(SplitText);

type Props = {
  projects: ProjectType[];
};

export default function PortfolioClient({ projects }: Props) {
  const [index, setIndex] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLUListElement>(null);

  const project = projects[index];

  const handleChange = (direction: 'next' | 'prev') => {
    changeText({
      direction,
      setIndex,
      projectsLength: projects.length,
      titleRef,
      descRef,
      tagsRef,
    });
  };

  return (
    <div className={styles.container} ref={projectRef}>
      {project && (
        <>
          <div className={styles.projects}>
            <div className={styles.header}>
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
            <p ref={descRef}>{project.description}</p>
            <ul ref={tagsRef}>
              {project.tags?.map((tag, i) => (
                <li key={i}>{tag.tag}</li>
              ))}
            </ul>
            <div className={styles.buttons}>
              <button onClick={() => handleChange('prev')}>← Précédent</button>
              <button onClick={() => handleChange('next')}>Suivant →</button>
            </div>
          </div>

          <div className={styles.canvas}>
            <Scene path={getModelPath(project)} />
          </div>
        </>
      )}
    </div>
  );
}
