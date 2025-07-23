import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

type Params = {
  direction: 'next' | 'prev';
  setIndex: (callback: (i: number) => number) => void;
  projectsLength: number;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  descRef: React.RefObject<HTMLParagraphElement | null>;
};

export const changeTexte = async ({
  direction,
  setIndex,
  projectsLength,
  titleRef,
  descRef,
}: Params) => {
  const titleElement = titleRef.current;
  const descElement = descRef.current;

  if (!titleElement || !descElement) return;

  const splitTitle = new SplitText(titleElement, { type: 'chars' });
  const splitDesc = new SplitText(descElement, { type: 'lines' });

  const outTimeline = gsap.timeline();

  outTimeline.to(splitTitle.chars, {
    y: -50,
    opacity: 0,
    stagger: {
      from: 'random',
      each: 0.02,
    },
    duration: 0.3,
    ease: 'power2.in',
  });
  outTimeline.to(splitDesc.lines, {
    y: -50,
    opacity: 0,
    stagger: 0.02,
    duration: 0.3,
    ease: 'power2.in',
  });

  await outTimeline.then();

  setIndex((prev) => {
    if (direction === 'next') return (prev + 1) % projectsLength;
    return (prev - 1 + projectsLength) % projectsLength;
  });

  await new Promise((resolve) => setTimeout(resolve, 10));

  const newTitleSplit = new SplitText(titleElement, { type: 'chars' });
  const newDescSplit = new SplitText(descElement, { type: 'lines' });

  gsap.set([newTitleSplit.chars, newDescSplit.lines], {
    y: 50,
    opacity: 0,
  });

  gsap.to(newTitleSplit.chars, {
    y: 0,
    opacity: 1,
    stagger: {
      from: 'random',
      each: 0.02,
    },
    duration: 0.4,
    ease: 'power2.out',
  });
  gsap.to(newDescSplit.lines, {
    y: 0,
    opacity: 1,
    stagger: 0.02,
    duration: 0.4,
    ease: 'power2.out',
  });
};
