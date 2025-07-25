import { gsap } from 'gsap';
import * as THREE from 'three';

type Params = {
  direction?: 'next' | 'prev';
  modelRef: React.RefObject<THREE.Mesh | null>;
};

export const animateModelChange = async ({ modelRef }: Params) => {
  const model = modelRef.current;
  if (!model) return;

  const outTl = gsap.timeline();
  outTl
    .to(
      model.position,
      {
        y: -10,
        duration: 0.6,
        ease: 'back.in',
      },
      '<'
    )
    .to(
      model.rotation,
      {
        y: '+=6.28319',
        duration: 0.6,
        ease: 'back.in',
      },
      '<'
    );

  await outTl.then();

  const newModel = modelRef.current;
  if (!newModel) return;

  gsap.set(newModel.position, { y: 10 });
  gsap.set(newModel.rotation, { y: 0 });

  const inTl = gsap.timeline();
  inTl
    .to(
      newModel.position,
      {
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      },
      '<'
    )
    .to(
      newModel.rotation,
      {
        y: '+=6.28319',
        duration: 0.6,
        ease: 'power2.out',
      },
      '<'
    );

  await inTl.then();
};
