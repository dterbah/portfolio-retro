import React from 'react';
import Snake from '../games/Snake';
import Pong from '../games/Pong';
import CatchTheDot from '../games/CatchTheDot';

interface GamesProps {
  currentGame: string;
  onBack: () => void;
}

const Games = ({ currentGame, onBack }: GamesProps) => {
  if (currentGame === 'snake') {
    return <Snake onBack={onBack} />;
  }
  if (currentGame === 'pong') {
    return <Pong onBack={onBack} />;
  }
  if (currentGame === 'catch-the-dot') {
    return <CatchTheDot onBack={onBack} />;
  }

  return (
    <div className="section">
      <h2>Mini-Jeux</h2>
      <div className="games-list">
        <div className="game-item">
          <h3>Snake</h3>
          <p>Le classique jeu du serpent. Utilise les flèches pour diriger le serpent et manger les pommes.</p>
          <div className="game-controls">
            <span>↑↓←→</span>
          </div>
          <button className="game-button" onClick={() => onBack()}>
            Jouer
          </button>
        </div>
        <div className="game-item">
          <h3>Pong</h3>
          <p>Le premier jeu vidéo commercial. Utilise ↑↓ pour déplacer la raquette.</p>
          <div className="game-controls">
            <span>↑↓</span>
          </div>
          <button className="game-button" onClick={() => onBack()}>
            Jouer
          </button>
        </div>
        <div className="game-item">
          <h3>Catch the Dot</h3>
          <p>Attrape le point qui apparaît à l'écran avant que le temps ne soit écoulé.</p>
          <div className="game-controls">
            <span>↑↓←→</span>
          </div>
          <button className="game-button" onClick={() => onBack()}>
            Jouer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Games; 