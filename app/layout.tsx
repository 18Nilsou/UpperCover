import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'UnderCover - Jeu de déduction',
  description: 'Le jeu de déduction et de bluff',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
