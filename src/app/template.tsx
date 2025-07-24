'use client';
import useLenis from '@/hooks/useLenis';
import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import PageTransition from '../components/PageTransition';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const transitionRef = useRef<any>(null);
  useLenis();

  useEffect(() => {
    if (transitionRef.current) {
      transitionRef.current.animateIn();
    }
  }, [pathname]);

  return (
    <>
      <PageTransition ref={transitionRef} />
      {children}
    </>
  );
}
