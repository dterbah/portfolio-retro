import { useState, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface SnakeProps {
  onBack: () => void;
}

const Snake = ({ onBack }: SnakeProps) => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('right');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const gameLoop = setInterval(() => {
        setSnake(prevSnake => {
          const head = { ...prevSnake[0] };
          
          switch (direction) {
            case 'up':
              head.y -= 1;
              break;
            case 'down':
              head.y += 1;
              break;
            case 'left':
              head.x -= 1;
              break;
            case 'right':
              head.x += 1;
              break;
          }

          // Vérifier les collisions avec les murs
          if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 15) {
            setGameOver(true);
            return prevSnake;
          }

          // Vérifier les collisions avec le serpent
          if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
            setGameOver(true);
            return prevSnake;
          }

          const newSnake = [head, ...prevSnake];

          // Vérifier si le serpent mange la nourriture
          if (head.x === food.x && head.y === food.y) {
            setScore(prev => prev + 1);
            // Générer une nouvelle position pour la nourriture
            let newFood: Position;
            do {
              newFood = {
                x: Math.floor(Math.random() * 20),
                y: Math.floor(Math.random() * 15)
              };
            } while (newSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
            setFood(newFood);
          } else {
            newSnake.pop();
          }

          return newSnake;
        });
      }, 200);

      return () => clearInterval(gameLoop);
    }
  }, [direction, food, gameStarted, gameOver]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'down') setDirection('up');
          break;
        case 'ArrowDown':
          if (direction !== 'up') setDirection('down');
          break;
        case 'ArrowLeft':
          if (direction !== 'right') setDirection('left');
          break;
        case 'ArrowRight':
          if (direction !== 'left') setDirection('right');
          break;
      }
      if (!gameStarted) setGameStarted(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, gameStarted]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection('right');
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
  };

  return (
    <div className="section">
      <h2>Snake</h2>
      <div className="game-container">
        <div className="game-score">Score: {score}</div>
        <div className="game-board">
          {snake.map((segment, index) => (
            <div
              key={index}
              className="snake-segment"
              style={{
                left: `${segment.x * 5}%`,
                top: `${segment.y * 5}%`,
                width: '5%',
                height: '5%'
              }}
            />
          ))}
          <div
            className="snake-food"
            style={{
              left: `${food.x * 5}%`,
              top: `${food.y * 5}%`,
              width: '5%',
              height: '5%'
            }}
          />
          {gameOver && (
            <div className="game-over">
              <div className="game-over-text">Game Over!</div>
              <button className="game-button" onClick={resetGame}>
                Rejouer
              </button>
            </div>
          )}
        </div>
        <div className="game-controls">
          <span>↑↓←→</span>
          <span className="game-controls-separator">ou</span>
          <span>Clavier</span>
        </div>
        <button className="game-button" onClick={onBack}>
          Retour
        </button>
      </div>
    </div>
  );
};

export default Snake; 