import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'UpperCover - Jeu de déduction',
  description: 'Le jeu de déduction et de bluff',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-900 flex flex-col">
        <main className="flex-grow">{children}</main>
        <footer className="bg-gray-800 text-gray-400 text-center py-4 mt-8">
          <p>&copy; 2025 UpperCover. Tous droits réservés. @18Nilsou</p>
        </footer>
      </body>
    </html>
  );
}
