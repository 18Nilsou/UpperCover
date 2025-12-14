'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Cookie helper functions
const setCookie = (name: string, value: string, days: number = 365) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export default function SetupPage() {
  const router = useRouter();
  const [playerCount, setPlayerCount] = useState(4);
  const [spyCount, setSpyCount] = useState(1);
  const [includeMrWhite, setIncludeMrWhite] = useState(false);
  const [mrWhiteCount, setMrWhiteCount] = useState(0);

  // Load settings from cookies on mount
  useEffect(() => {
    const savedPlayerCount = getCookie('playerCount');
    const savedSpyCount = getCookie('spyCount');
    const savedIncludeMrWhite = getCookie('includeMrWhite');
    const savedMrWhiteCount = getCookie('mrWhiteCount');

    if (savedPlayerCount) setPlayerCount(parseInt(savedPlayerCount));
    if (savedSpyCount) setSpyCount(parseInt(savedSpyCount));
    if (savedIncludeMrWhite) setIncludeMrWhite(savedIncludeMrWhite === 'true');
    if (savedMrWhiteCount) setMrWhiteCount(parseInt(savedMrWhiteCount));
  }, []);

  // Calculate remaining slots for civils
  const getRemainingSlots = () => {
    const mrWhite = includeMrWhite ? mrWhiteCount : 0;
    return playerCount - spyCount - mrWhite;
  };

  // Get max spy count
  const getMaxSpyCount = () => {
    const mrWhite = includeMrWhite ? mrWhiteCount : 0;
    return playerCount - mrWhite - 1;
  };

  // Get max Mr White count
  const getMaxMrWhiteCount = () => {
    return playerCount - spyCount - 1;
  };

  const handleStartGame = () => {
    // Store game settings in sessionStorage
    sessionStorage.setItem('playerCount', playerCount.toString());
    sessionStorage.setItem('spyCount', spyCount.toString());
    sessionStorage.setItem('includeMrWhite', includeMrWhite.toString());
    sessionStorage.setItem('mrWhiteCount', mrWhiteCount.toString());

    // Save settings to cookies
    setCookie('playerCount', playerCount.toString());
    setCookie('spyCount', spyCount.toString());
    setCookie('includeMrWhite', includeMrWhite.toString());
    setCookie('mrWhiteCount', mrWhiteCount.toString());
    
    // Redirect to game page
    router.push('/game');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-8">
          Configuration de la partie
        </h1>

        {/* Player Count */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-3">
            Nombre de joueurs
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPlayerCount(Math.max(2, playerCount - 1))}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-xl font-bold"
              disabled={playerCount <= 2}
            >
              -
            </button>
            <span className="text-3xl font-bold w-16 text-center">{playerCount}</span>
            <button
              onClick={() => setPlayerCount(Math.min(10, playerCount + 1))}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-xl font-bold"
              disabled={playerCount >= 10}
            >
              +
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-2">Entre 2 et 10 joueurs</p>
        </div>

        {/* Spy Count */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-3">
            Nombre d&apos;espions
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSpyCount(Math.max(0, spyCount - 1))}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-xl font-bold"
              disabled={spyCount <= 0}
            >
              -
            </button>
            <span className="text-3xl font-bold w-16 text-center">{spyCount}</span>
            <button
              onClick={() => setSpyCount(Math.min(getMaxSpyCount(), spyCount + 1))}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-xl font-bold"
              disabled={spyCount >= getMaxSpyCount()}
            >
              +
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-2">De 0 à {getMaxSpyCount()} espions</p>
        </div>

        {/* Mr White Option */}
        <div className="mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeMrWhite}
              onChange={(e) => setIncludeMrWhite(e.target.checked)}
              className="w-5 h-5 cursor-pointer"
            />
            <span className="text-lg">Inclure Monsieur Blanc</span>
          </label>
          <p className="text-gray-400 text-sm mt-2 ml-8">
            Monsieur Blanc ne reçoit aucun mot et doit improviser
          </p>
        </div>

        {/* Mr White Count (shown only if enabled) */}
        {includeMrWhite && (
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-3">
              Nombre de Monsieur Blanc
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMrWhiteCount(Math.max(0, mrWhiteCount - 1))}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-xl font-bold"
                disabled={mrWhiteCount <= 0}
              >
                -
              </button>
              <span className="text-3xl font-bold w-16 text-center">{mrWhiteCount}</span>
              <button
                onClick={() => setMrWhiteCount(Math.min(getMaxMrWhiteCount(), mrWhiteCount + 1))}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-xl font-bold"
                disabled={mrWhiteCount >= getMaxMrWhiteCount()}
              >
                +
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-2">De 0 à {getMaxMrWhiteCount()} Monsieur Blanc</p>
          </div>
        )}

        {/* Civil Count Display */}
        <div className="mb-8 bg-gray-700 p-4 rounded-lg">
          <p className="text-lg">
            <span className="font-semibold">Civils :</span> {getRemainingSlots()}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {spyCount} espion{spyCount > 1 ? 's' : ''} + {includeMrWhite ? mrWhiteCount : 0} Monsieur Blanc + {getRemainingSlots()} civil{getRemainingSlots() > 1 ? 's' : ''} = {playerCount} joueurs
          </p>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStartGame}
          className="w-full bg-white text-black px-6 py-4 rounded-lg text-xl font-semibold hover:bg-gray-200 transition-colors"
        >
          Commencer
        </button>
      </div>
    </div>
  );
}
