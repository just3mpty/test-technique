// src/app/layout.tsx
import { Metadata } from 'next';
import './styles/globals.scss';
import React from 'react';
import { barlow } from '@/utils/fonts';

const APP_TITLE = 'Les Mauvaises';
const APP_DESCRIPTION = "Page projet de l'agence, mais cé moi ki lé fé !";
// Tout le repo a été créé avec l'IA en fait si je comprends bien.

export const metadata: Metadata = {
  applicationName: APP_TITLE,
  title: APP_TITLE,
  description: APP_DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: APP_TITLE,
    title: APP_TITLE,
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: APP_TITLE,
    description: APP_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fr'>
      <head />
      <body className={barlow.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
