import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">UnderCover</h1>
          <p className="text-gray-400">Le jeu de déduction et de bluff</p>
        </header>

        {/* Start Game Button */}
        <div className="text-center mb-12">
          <Link
            href="/setup"
            className="inline-block bg-white text-black px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            Lancer le jeu
          </Link>
        </div>

        {/* Rules Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold border-b border-gray-700 pb-2">Règles du jeu</h2>

          {/* Objectif */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold text-lg">Objectif du jeu</h3>
            <p className="mt-3 text-gray-300">
              Les joueurs doivent découvrir qui sont les Espions et, si inclus, Monsieur Blanc,
              tout en essayant de ne pas se faire démasquer.
            </p>
          </div>

          {/* Préparation */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold text-lg">Préparation</h3>
            <div className="mt-3 text-gray-300 space-y-2">
              <p>
                Chaque joueur reçoit un mot secret. Les <strong>Civils</strong> ont tous le même mot,
                tandis que les <strong>Espions</strong> ont un mot légèrement différent.
              </p>
              <p>
                <strong>Monsieur Blanc</strong>, s'il est inclus, ne reçoit aucun mot et doit improviser.
              </p>
              <p className="text-sm text-gray-400">
                (Par exemple : "pomme" pour les Civils et "poire" pour les Espions)
              </p>
            </div>
          </div>

          {/* Déroulement */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold text-lg">Déroulement</h3>
            <div className="mt-3 text-gray-300 space-y-2">
              <p>
                Le jeu se joue en tours. À chaque tour, un joueur décrit son mot en une phrase
                ou un mot, sans le dire directement.
              </p>
              <p>
                Après chaque tour, les joueurs discutent et tentent de deviner qui est suspect.
              </p>
            </div>
          </div>

          {/* Accusations et éliminations */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold text-lg">Accusations et éliminations</h3>
            <div className="mt-3 text-gray-300 space-y-2">
              <p>
                À la fin de chaque tour, les joueurs votent pour éliminer un joueur qu'ils
                soupçonnent d'être un Espion ou Monsieur Blanc.
              </p>
              <p>
                Le joueur avec le plus de votes est éliminé et révèle son rôle.
              </p>
            </div>
          </div>

          {/* Conditions de victoire */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold text-lg">Conditions de victoire</h3>
            <div className="mt-3 text-gray-300 space-y-2">
              <p>
                <strong>Les Civils gagnent</strong> si tous les Espions (et Monsieur Blanc, s'il est inclus) sont éliminés.
              </p>
              <p>
                <strong>Les Espions gagnent</strong> s'ils sont en majorité ou si les Civils ne peuvent plus les identifier.
              </p>
              <p>
                <strong>Monsieur Blanc gagne</strong> s'il reste parmi les trois derniers joueurs sans être démasqué.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
