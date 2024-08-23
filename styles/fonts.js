
import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';

export const poppins = Poppins({ 
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    style: ['normal']

});
export const geologicaSharp = localFont({
    src:'../public/fonts/Geologica-Sharp-VariableFont_wght.woff2',
});

export const anton = localFont({
  src:'../public/fonts/Anton-Regular.ttf'
})