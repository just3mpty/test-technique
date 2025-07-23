// src/app/layout.tsx
import { Metadata } from 'next';
import './styles/globals.scss';
import React from 'react';

const APP_TITLE = 'Les Mauvaises';
const APP_DESCRIPTION = "Page projet de l'agence, mais cé moi ki lé fé !";

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
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
