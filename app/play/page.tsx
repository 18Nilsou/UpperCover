'use client';

import Link from 'next/link';

export default function PlayPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-4xl font-bold">La partie commence !</h1>
        
        <div className="bg-gray-800 p-8 rounded-lg space-y-4">
          <h2 className="text-2xl font-semibold">Rappel des règles</h2>
          <div className="text-left text-gray-300 space-y-3">
            <p>1. Chacun décrit son mot à tour de rôle sans le dire directement</p>
            <p>2. Discutez et tentez d&apos;identifier les suspects</p>
            <p>3. Votez pour éliminer un joueur</p>
            <p>4. Le joueur éliminé révèle son rôle</p>
            <p>5. Continuez jusqu&apos;à la victoire d&apos;un camp</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xl text-gray-400">Bonne chance !</p>
          
          <Link
            href="/"
            className="inline-block bg-white text-black px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
