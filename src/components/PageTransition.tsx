'use client';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import gsap from 'gsap';

const PageTransition = forwardRef((_, ref) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    animateIn() {
      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { y: '100%' },
          {
            y: '0%',
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
              gsap.to(overlayRef.current, {
                y: '-100%',
                duration: 0.6,
                delay: 1,
                ease: 'power2.inOut',
              });
            },
          }
        );
      }
    },
  }));

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#c62368',
        zIndex: 9999,
        pointerEvents: 'none',
        transform: 'translateY(100%)',
      }}
    />
  );
});

PageTransition.displayName = 'PageTransition';

export default PageTransition;
