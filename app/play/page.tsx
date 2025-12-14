'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Role = 'civil' | 'spy' | 'mrwhite';

interface Player {
  id: number;
  role: Role;
}

export default function PlayPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [revealedRoles, setRevealedRoles] = useState<boolean[]>([]);

  useEffect(() => {
    // Récupérer les joueurs depuis sessionStorage
    const storedPlayers = sessionStorage.getItem('players');
    if (storedPlayers) {
      const parsedPlayers = JSON.parse(storedPlayers);
      setPlayers(parsedPlayers);
      setRevealedRoles(new Array(parsedPlayers.length).fill(false));
    }
  }, []);

  const handleCardClick = (index: number) => {
    if (!revealedRoles[index]) {
      const confirmReveal = window.confirm(`Voulez-vous révéler le rôle du Joueur ${index + 1} ?`);
      if (confirmReveal) {
        setRevealedRoles((prev) => {
          const updated = [...prev];
          updated[index] = true;
          return updated;
        });
      }
    }
  };

  const getRoleLabel = (role: Role) => {
    switch (role) {
      case 'civil':
        return 'Civil';
      case 'spy':
        return 'Espion';
      case 'mrwhite':
        return 'Monsieur Blanc';
      default:
        return '';
    }
  };

  const getRoleColor = (role: Role) => {
    switch (role) {
      case 'civil':
        return 'text-green-400';
      case 'spy':
        return 'text-red-400';
      case 'mrwhite':
        return 'text-yellow-400';
      default:
        return 'text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full text-center space-y-8">
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

        {/* Cartes des joueurs */}
        {players.length > 0 && (
          <div className="bg-gray-800 p-8 rounded-lg space-y-4">
            <h2 className="text-2xl font-semibold">Cartes des joueurs</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {players.map((player, index) => (
                <div
                  key={player.id}
                  onClick={() => handleCardClick(index)}
                  className="bg-gray-700 p-6 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors border-2 border-gray-600 min-h-[120px] flex flex-col items-center justify-center"
                >
                  {revealedRoles[index] ? (
                    <div className="text-center">
                      <p className="text-sm text-gray-400 mb-2">Joueur {index + 1}</p>
                      <p className={`text-xl font-bold ${getRoleColor(player.role)}`}>
                        {getRoleLabel(player.role)}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-300">Joueur {index + 1}</p>
                      <p className="text-sm text-gray-500 mt-2">Cliquez pour révéler</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

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
