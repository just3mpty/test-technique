'use client';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import PageTransition from './PageTransition';
import React from 'react';

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  mouseEnter?: () => void;
  mouseLeave?: () => void;
}

const TransitionLink = ({
  href,
  children,
  className,
  mouseEnter,
  mouseLeave,
}: TransitionLinkProps) => {
  const router = useRouter();
  const transitionRef = useRef<any>(null);

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (transitionRef.current) {
      await new Promise((resolve) => {
        transitionRef.current.animateIn();
        setTimeout(resolve, 800);
      });
    }
    router.push(href);
  };

  return (
    <>
      <PageTransition ref={transitionRef} />
      <a
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        href={href}
        onClick={handleClick}
        className={className}
      >
        {children}
      </a>
    </>
  );
};

export default TransitionLink;
