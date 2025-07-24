'use client';
import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import styles from '../app/styles/components/Homepage.module.scss';
import { useGSAP } from '@gsap/react';
import TransitionLink from './TransitionLink';

const Title = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [splittedTitle, setSplittedTitle] = useState<SplitText | null>(null);

  const animateTitle = () => {
    if (!splittedTitle) return;
    gsap.to(splittedTitle.chars, {
      y: -50,
      stagger: {
        from: 'random',
        each: 0.02,
      },
      duration: 0.3,
      ease: 'back.out',
    });
  };
  const resetTitle = () => {
    if (!splittedTitle) return;
    gsap.to(splittedTitle.chars, {
      y: 0,
      stagger: {
        from: 'random',
        each: 0.02,
      },
      duration: 0.3,
      ease: 'back.out',
    });
  };

  useGSAP(() => {
    gsap.registerPlugin(SplitText);
    const title = new SplitText(titleRef.current, { type: 'chars' });
    setSplittedTitle(title);
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
      <TransitionLink mouseEnter={animateTitle} mouseLeave={resetTitle} href='/projects'>
        Allez je suis chaud
      </TransitionLink>
    </section>
  );
};

export default Title;
