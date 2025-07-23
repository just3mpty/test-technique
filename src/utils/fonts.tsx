// fonts.js
import localFont from 'next/font/local';

export const Gotham = localFont({
  src: [
    {
      path: '/fonts/gotham-book.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-gotham',
});
