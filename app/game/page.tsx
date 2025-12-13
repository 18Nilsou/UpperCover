'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Role = 'civil' | 'spy' | 'mrwhite';

interface Player {
  id: number;
  role: Role;
  word: string;
}

export default function GamePage() {
  const router = useRouter();
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [showWord, setShowWord] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    // Get settings from sessionStorage
    const playerCount = parseInt(sessionStorage.getItem('playerCount') || '4');
    const spyCount = parseInt(sessionStorage.getItem('spyCount') || '1');
    const includeMrWhite = sessionStorage.getItem('includeMrWhite') === 'true';
    const mrWhiteCount = parseInt(sessionStorage.getItem('mrWhiteCount') || '1');

    // Load words from file
    fetch('/words.txt')
      .then(res => res.text())
      .then(text => {
        const lines = text.split('\n').filter(line => line.trim());
        const randomLine = lines[Math.floor(Math.random() * lines.length)];
        const [civilWord, spyWord] = randomLine.split(',').map(w => w.trim());

        // Assign roles
        const roles = assignRoles(playerCount, spyCount, includeMrWhite, mrWhiteCount);
        
        const newPlayers: Player[] = roles.map((role, index) => ({
          id: index + 1,
          role,
          word: role === 'civil' ? civilWord : role === 'spy' ? spyWord : ''
        }));

        setPlayers(newPlayers);
        setGameStarted(true);
      })
      .catch(error => {
        console.error('Error loading words:', error);
      });
  }, []);

  const assignRoles = (playerCount: number, spyCount: number, includeMrWhite: boolean, mrWhiteCount: number): Role[] => {
    const roles: Role[] = [];
    
    // Add Mr White if enabled
    if (includeMrWhite) {
      for (let i = 0; i < mrWhiteCount; i++) {
        roles.push('mrwhite');
      }
    }
    
    // Add spies
    for (let i = 0; i < spyCount; i++) {
      roles.push('spy');
    }
    
    // Fill rest with civils
    while (roles.length < playerCount) {
      roles.push('civil');
    }
    
    // Shuffle roles
    return roles.sort(() => Math.random() - 0.5);
  };

  const handleShowWord = () => {
    setShowWord(true);
  };

  const handleNextPlayer = () => {
    if (currentPlayer < players.length - 1) {
      setCurrentPlayer(currentPlayer + 1);
      setShowWord(false);
    } else {
      // Game is ready to play
      router.push('/play');
    }
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-2xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
      <div className="max-w-md w-full">
        {!showWord ? (
          // Waiting screen
          <div className="text-center space-y-8">
            <h1 className="text-3xl font-bold">Joueur {currentPlayer + 1}</h1>
            <p className="text-xl text-gray-400">
              Préparez-vous à voir votre mot
            </p>
            <p className="text-gray-500">
              Ne montrez votre mot à personne !
            </p>
            <button
              onClick={handleShowWord}
              className="bg-white text-black px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Voir mon mot
            </button>
          </div>
        ) : (
          // Word reveal screen
          <div className="text-center space-y-8">
            <h2 className="text-2xl font-semibold text-gray-400">Joueur {currentPlayer + 1}</h2>
            
            <div className="bg-gray-800 p-8 rounded-lg border-2 border-gray-700">
              {players[currentPlayer].role === 'mrwhite' ? (
                <div>
                  <p className="text-xl font-bold text-red-400 mb-4">MONSIEUR BLANC</p>
                  <p className="text-gray-400">Vous n'avez pas de mot. Vous devez deviner de quoi les autres parlent !</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-400 mb-2">Votre mot :</p>
                  <p className="text-4xl font-bold">{players[currentPlayer].word}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <p className="text-gray-500">
                Mémorisez bien votre mot et votre rôle
              </p>
              <button
                onClick={handleNextPlayer}
                className="w-full bg-white text-black px-6 py-4 rounded-lg text-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                {currentPlayer < players.length - 1 ? 'Passer au joueur suivant' : 'Commencer la partie'}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-gray-300 p-4 rounded-lg shadow-lg max-w-md w-full">
        <p className="text-sm">
          Les joueurs doivent d&eacute;couvrir qui sont les Espions et, si inclus, Monsieur Blanc...
        </p>
      </div>
    </div>
  );
}
