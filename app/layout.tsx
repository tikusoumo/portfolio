import './globals.css';
import type { Metadata } from 'next';
import { Inter, Cinzel } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { AudioProvider } from '@/components/audio-provider';
import { Toaster } from '@/components/ui/sonner';
import { CustomCursor } from '@/components/ui/custom-cursor';
import meta from '@/content/meta.json';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(meta.url),
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  authors: [{ name: meta.name }],
  creator: meta.name,
  icons: {
    icon: meta.favicon || '/favicon.ico',
    shortcut: meta.favicon || '/favicon.ico',
    apple: meta.favicon || '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: meta.url,
    siteName: `${meta.name} Portfolio`,
    title: meta.title,
    description: meta.description,
    images: [
      {
        url: meta.ogImage,
        width: 1200,
        height: 630,
        alt: meta.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
    images: [meta.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { GamingProvider } from '@/components/gaming-provider';
import { ThemeSelector } from '@/components/ui/theme-selector';
// ... other imports

// ... metadata ...

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="cursor-none"> {/* Hide default cursor */}
      <body className={`${inter.variable} ${cinzel.variable} font-body bg-background transition-colors duration-500`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <GamingProvider>
            <AudioProvider>
              <CustomCursor />
              {children}
              <ThemeSelector />
              <Toaster />
            </AudioProvider>
          </GamingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}