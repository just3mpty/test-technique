'use client';
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import styles from '../app/styles/components/Homepage.module.scss';
import { useGSAP } from '@gsap/react';
import TransitionLink from './TransitionLink';

const Title = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(SplitText);
    const title = new SplitText(titleRef.current, { type: 'chars' });
    gsap.from(title.chars, {
      y: '100%',
      fontSize: '8vw',
      opacity: 0,
      stagger: {
        from: 'random',
        each: 0.02,
      },
      duration: 0.3,
      ease: 'back.out',
    });
  }, []);

  return (
    <section className={styles.container}>
      <h1 ref={titleRef}>On trinque ?</h1>
      <TransitionLink href='/projects'>Allez je suis chaud</TransitionLink>
    </section>
  );
};

export default Title;
