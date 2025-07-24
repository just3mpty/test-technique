import { gsap } from 'gsap';
import * as THREE from 'three';

type Params = {
  direction: 'next' | 'prev';
  setIndex: (callback: (i: number) => number) => void;
  projectsLength: number;
  modelRef: React.RefObject<THREE.Mesh | null>;
};

export const changeModel = async ({ direction, setIndex, projectsLength, modelRef }: Params) => {
  const model = modelRef.current;
  if (!model) return;

  const outTl = gsap.timeline();

  outTl
    .to(
      model.position,
      {
        y: 10,
        duration: 0.6,
        ease: 'back.in',
      },
      '<'
    )
    .to(
      model.rotation,
      {
        y: Math.PI / 500,
        duration: 1,
        ease: 'back.inOut',
      },
      '<'
    );

  await outTl.then();

  setIndex((prev) => {
    if (direction === 'next') return (prev + 1) % projectsLength;
    return (prev - 1 + projectsLength) % projectsLength;
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  const newModel = modelRef.current;
  if (!newModel) return;

  gsap.set(newModel.position, { y: 0 });

  gsap
    .timeline()
    .from(newModel.position, {
      y: -10,
      duration: 0.6,
      ease: 'power2.inOut',
      delay: 2,
    })
    .to(model.rotation, {
      y: 5,
      duration: 1,
      ease: 'power2.inOut',
    });
};
