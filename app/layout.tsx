import { Jersey_10 } from 'next/font/google';
import "./globals.css";
import Nav from '@/components/Nav';


const jersey = Jersey_10({
  subsets: ['latin'],
  weight: '400',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="en">
      <head>
        <meta name="description" content="Generated by create next app" />
      </head>

      <body className='bg-black text-white' style={{ fontFamily: jersey.style.fontFamily }} >
        <Nav />
        {children}
        </body>

    </html>
  );
}
