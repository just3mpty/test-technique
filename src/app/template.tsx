'use client';
import useLenis from '@/hooks/useLenis';
import React from 'react';

const Template = ({ children }: { children: React.ReactNode }) => {
  useLenis();

  return <>{children}</>;
};

export default Template;
