import type { Metadata, Viewport } from 'next';
import { Zen_Old_Mincho, Manrope, JetBrains_Mono } from 'next/font/google';
import '@styles/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { SplashIntro } from '@/components/splash-intro';

/**
 * Mincho for display: its thick-to-hairline stroke contrast is the same shape
 * as the flower's filaments, and it is the only face here that carries kanji,
 * so every Japanese glyph on the site is explicitly set in it.
 *
 * One weight, deliberately. Google splits a Japanese family into ~120
 * unicode-range chunks and next/font emits an @font-face for every chunk of
 * every weight, so each extra weight costs another ~90KB of CSS and ~4MB in
 * the bundle. Hierarchy comes from size here, which suits a mincho better than
 * faux-bolding it anyway.
 */
const mincho = Zen_Old_Mincho({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mincho',
  display: 'swap',
});

/** Body face — Latin only, so it stays cheap. */
const body = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-data',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'April Bords Nerosa — Full-stack developer',
  description:
    'Portfolio of April Bords Nerosa, a full-stack developer in Davao building web applications, desktop tools, and the systems underneath them.',
  icons: {
    icon: [{ url: '/icon.png' }],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b0608',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${body.variable} ${mincho.variable} ${mono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <SplashIntro />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
