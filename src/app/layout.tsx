import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { DemoProvider } from '@/components/demo/demo-context';
import { DemoOverlay } from '@/components/demo/demo-overlay';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export const metadata: Metadata = {
  title: 'ReplyRush AI | Enterprise Instagram Commerce Infrastructure',
  description: 'The operating system for high-volume Instagram commerce. Recover abandoned leads, qualify inquiries, and close sales automatically with grounded AI logic.',
  keywords: 'Instagram Automation, AI Sales Agent, DM Automation, Ecommerce Infrastructure, ReplyRush',
  authors: [{ name: 'ReplyRush AI' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-white/10">
        <FirebaseClientProvider>
          <DemoProvider>
            {children}
            <DemoOverlay />
          </DemoProvider>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}