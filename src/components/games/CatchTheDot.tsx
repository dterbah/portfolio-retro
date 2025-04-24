import { useState, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface CatchTheDotProps {
  onBack: () => void;
}

const CatchTheDot = ({ onBack }: CatchTheDotProps) => {
  const [player, setPlayer] = useState<Position>({ x: 50, y: 50 });
  const [target, setTarget] = useState<Position>({ x: 20, y: 20 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const gameLoop = setInterval(() => {
        // Vérifier si le joueur a attrapé la cible
        if (Math.abs(player.x - target.x) < 5 && Math.abs(player.y - target.y) < 5) {
          setScore(prev => prev + 1);
          // Générer une nouvelle position pour la cible
          setTarget({
            x: Math.random() * 90 + 5,
            y: Math.random() * 90 + 5
          });
        }
      }, 50);

      return () => clearInterval(gameLoop);
    }
  }, [gameStarted, gameOver, player, target]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameStarted, gameOver]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (gameOver) return;

      setPlayer(prev => {
        let newX = prev.x;
        let newY = prev.y;

        switch (e.key) {
          case 'ArrowUp':
            newY = Math.max(5, prev.y - 5);
            break;
          case 'ArrowDown':
            newY = Math.min(95, prev.y + 5);
            break;
          case 'ArrowLeft':
            newX = Math.max(5, prev.x - 5);
            break;
          case 'ArrowRight':
            newX = Math.min(95, prev.x + 5);
            break;
        }

        return { x: newX, y: newY };
      });

      if (!gameStarted) setGameStarted(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver, gameStarted]);

  const resetGame = () => {
    setPlayer({ x: 50, y: 50 });
    setTarget({ x: 20, y: 20 });
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
    setTimeLeft(30);
  };

  return (
    <div className="section">
      <h2>Catch the Dot</h2>
      <div className="game-container">
        <div className="game-score">
          <span>Score: {score}</span>
          <span>Temps: {timeLeft}s</span>
        </div>
        <div className="game-board">
          <div
            className="catch-dot-player"
            style={{
              left: `${player.x}%`,
              top: `${player.y}%`,
              width: '10%',
              height: '10%'
            }}
          />
          <div
            className="catch-dot-target"
            style={{
              left: `${target.x}%`,
              top: `${target.y}%`,
              width: '5%',
              height: '5%'
            }}
          />
          {gameOver && (
            <div className="game-over">
              <div className="game-over-text">
                Score final: {score}
              </div>
              <button className="game-button" onClick={resetGame}>
                Rejouer
              </button>
            </div>
          )}
        </div>
        <div className="game-controls">
          <div className="player-controls">
            <span>Contrôles: ↑↓←→</span>
            <span className="game-controls-separator">ou</span>
            <span>Clavier</span>
          </div>
        </div>
        <button className="game-button" onClick={onBack}>
          Retour
        </button>
      </div>
    </div>
  );
};

export default CatchTheDot; 