// fonts.js

//  <-- J'ai désactivé la font GOTHAM car je n'ai pas le fichier. Pour éviter de surcharger le projet en la téléchargeant + convertion en woff2, j'ai remplacé par la font Barlow récupéré depuis Google Fonts. -->

// import localFont from 'next/font/local';
// export const Gotham = localFont({
//   src: [
//     {
//       path: '/fonts/gotham-book.otf',
//       weight: '400',
//       style: 'normal',
//     },
//   ],
//   variable: '--font-gotham',
// });

import { Barlow } from 'next/font/google';
export const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-barlow',
});
