// fonts.js
<<<<<<< HEAD

//  <-- J'ai désactivé la font GOTHAM car je n'ai pas le fichier. Pour éviter de surcharger le projet en la téléchargeant + convertion en woff2, j'ai remplacé par la font Barlow récupéré depuis Google Fonts. -->

// import localFont from 'next/font/local';
// export const Gotham = localFont({
//   src: [
//     {
//       path: '/fonts/gotham-book.otf',
=======
import localFont from 'next/font/local';

// export const Gotham = localFont({
//   src: [
//     {
//       path: '../../public/fonts/gotham-book.otf',
>>>>>>> 145141e29ac014f90fc9e00428debe1b6b799b1a
//       weight: '400',
//       style: 'normal',
//     },
//   ],
<<<<<<< HEAD
//   variable: '--font-gotham',
// });

import { Barlow } from 'next/font/google';
export const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-barlow',
});
=======
//   variable: '--font-gotham', // CSS variable optionnelle
// });
>>>>>>> 145141e29ac014f90fc9e00428debe1b6b799b1a
