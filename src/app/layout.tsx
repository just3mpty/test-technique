// src/app/layout.tsx
import './styles/globals.scss';
import React from 'react';

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
