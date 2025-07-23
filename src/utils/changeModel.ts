import { gsap } from 'gsap';
import * as THREE from 'three';

type Params = {
  direction: 'next' | 'prev';
  setIndex: (callback: (i: number) => number) => void;
  projectsLength: number;
  modelRef: React.RefObject<THREE.Group | null>;
};

export const changeModel = async ({ direction, setIndex, projectsLength, modelRef }: Params) => {
  const model = modelRef.current;
  if (!model) return;

  const outTl = gsap.timeline();

  outTl.to(
    model.position,
    {
      y: 20,
      duration: 0.4,
      ease: 'power2.inOut',
    },
    0
  );

  await outTl.then();

  setIndex((prev) => {
    if (direction === 'next') return (prev + 1) % projectsLength;
    return (prev - 1 + projectsLength) % projectsLength;
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  const newModel = modelRef.current;
  if (!newModel) return;

  gsap.set(newModel.position, { y: -20 });

  gsap.timeline().to(
    newModel.position,
    {
      y: -5,
      duration: 0.4,
      ease: 'power2.inOut',
    },
    0
  );
};
