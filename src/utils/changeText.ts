import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

export type AnimateTextParams = {
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  descRef: React.RefObject<HTMLParagraphElement | null>;
  tagsRef: React.RefObject<HTMLUListElement | null>;
  paletteRef: React.RefObject<HTMLDivElement | null>;
};

export const animateTextOut = async ({
  titleRef,
  descRef,
  tagsRef,
  paletteRef,
}: AnimateTextParams) => {
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
  outTimeline.to(
    splitDesc.lines,
    {
      y: -50,
      opacity: 0,
      stagger: 0.02,
      duration: 0.3,
      ease: 'power2.in',
    },
    '<'
  );

  if (tagsRef.current || paletteRef.current) {
    const liElements = tagsRef.current?.querySelectorAll('li');
    const paletteElements = paletteRef.current?.querySelectorAll('span');
    outTimeline.to(
      [liElements, paletteElements],
      {
        opacity: 0,
        x: -50,
        duration: 0.3,
        stagger: 0.06,
        ease: 'power2.out',
      },
      '<'
    );
  }

  await outTimeline.then();
};

export const animateTextIn = async ({
  titleRef,
  descRef,
  tagsRef,
  paletteRef,
}: AnimateTextParams) => {
  const titleElement = titleRef.current;
  const descElement = descRef.current;
  if (!titleElement || !descElement) return;

  const splitTitle = new SplitText(titleElement, { type: 'chars' });
  const splitDesc = new SplitText(descElement, { type: 'lines' });

  gsap.set([splitTitle.chars, splitDesc.lines], {
    y: 50,
    opacity: 0,
  });

  const inTimeline = gsap.timeline();
  inTimeline.to(splitTitle.chars, {
    y: 0,
    opacity: 1,
    stagger: {
      from: 'random',
      each: 0.02,
    },
    duration: 0.4,
    ease: 'power2.out',
  });
  inTimeline.to(
    splitDesc.lines,
    {
      y: 0,
      opacity: 1,
      stagger: 0.02,
      duration: 0.4,
      ease: 'power2.out',
    },
    '<'
  );
  if (tagsRef.current || paletteRef.current) {
    const liElements = tagsRef.current?.querySelectorAll('li');
    const paletteElements = paletteRef.current?.querySelectorAll('span');
    inTimeline.to([liElements, paletteElements], {
      opacity: 1,
      x: 0,
      duration: 0.4,
      stagger: 0.06,
      ease: 'power2.out',
    });
  }
  await inTimeline.then();
};
