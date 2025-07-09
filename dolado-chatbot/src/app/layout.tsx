import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Dolado Chatbot',
  description: 'Teste prático para Frontend',
  icons: {
    icon: '/dolado-favicon.ico',
    shortcut: '/dolado-favicon.ico',
    apple: '/dolado-favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body
        className={`bg-zinc-950 text-white ${inter.className}`}
        suppressHydrationWarning={true}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
