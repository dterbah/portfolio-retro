import { useState, useEffect } from 'react';

interface PongState {
  paddle1Y: number;
  paddle2Y: number;
  ballX: number;
  ballY: number;
  ballSpeedX: number;
  ballSpeedY: number;
  score1: number;
  score2: number;
  gameStarted: boolean;
  gameOver: boolean;
}

interface PongProps {
  onBack: () => void;
}

const Pong = ({ onBack }: PongProps) => {
  const [pongState, setPongState] = useState<PongState>({
    paddle1Y: 50,
    paddle2Y: 50,
    ballX: 50,
    ballY: 50,
    ballSpeedX: 2,
    ballSpeedY: 2,
    score1: 0,
    score2: 0,
    gameStarted: false,
    gameOver: false
  });

  useEffect(() => {
    if (pongState.gameStarted && !pongState.gameOver) {
      const gameLoop = setInterval(() => {
        setPongState(prev => {
          // Mise à jour de la position de la balle
          let newBallX = prev.ballX + prev.ballSpeedX;
          let newBallY = prev.ballY + prev.ballSpeedY;
          let newBallSpeedX = prev.ballSpeedX;
          let newBallSpeedY = prev.ballSpeedY;
          let newScore1 = prev.score1;
          let newScore2 = prev.score2;
          let newPaddle2Y = prev.paddle2Y;

          // IA simple : suit la balle avec un léger délai
          if (newBallX > 50) {
            const targetY = newBallY - 10; // Ajuster pour viser le centre de la raquette
            if (newPaddle2Y < targetY) {
              newPaddle2Y = Math.min(80, newPaddle2Y + 3);
            } else if (newPaddle2Y > targetY) {
              newPaddle2Y = Math.max(0, newPaddle2Y - 3);
            }
          }

          // Collision avec les murs haut et bas
          if (newBallY <= 0 || newBallY >= 100) {
            newBallSpeedY = -newBallSpeedY;
          }

          // Collision avec les raquettes
          if (newBallX <= 5 && newBallY >= prev.paddle1Y && newBallY <= prev.paddle1Y + 20) {
            newBallSpeedX = -newBallSpeedX;
            // Augmenter légèrement la vitesse
            newBallSpeedX *= 1.1;
            newBallSpeedY *= 1.1;
          }

          if (newBallX >= 95 && newBallY >= newPaddle2Y && newBallY <= newPaddle2Y + 20) {
            newBallSpeedX = -newBallSpeedX;
            // Augmenter légèrement la vitesse
            newBallSpeedX *= 1.1;
            newBallSpeedY *= 1.1;
          }

          // Marquer des points
          if (newBallX < 0) {
            newScore2 += 1;
            newBallX = 50;
            newBallY = 50;
            newBallSpeedX = 2;
            newBallSpeedY = 2;
          }
          if (newBallX > 100) {
            newScore1 += 1;
            newBallX = 50;
            newBallY = 50;
            newBallSpeedX = -2;
            newBallSpeedY = 2;
          }

          // Vérifier la fin de partie
          if (newScore1 >= 5 || newScore2 >= 5) {
            return { ...prev, gameOver: true };
          }

          return {
            ...prev,
            ballX: newBallX,
            ballY: newBallY,
            ballSpeedX: newBallSpeedX,
            ballSpeedY: newBallSpeedY,
            score1: newScore1,
            score2: newScore2,
            paddle2Y: newPaddle2Y
          };
        });
      }, 50);

      return () => clearInterval(gameLoop);
    }
  }, [pongState.gameStarted, pongState.gameOver]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (pongState.gameOver) return;

      setPongState(prev => {
        let newPaddle1Y = prev.paddle1Y;

        switch (e.key) {
          case 'ArrowUp':
            newPaddle1Y = Math.max(0, prev.paddle1Y - 5);
            break;
          case 'ArrowDown':
            newPaddle1Y = Math.min(80, prev.paddle1Y + 5);
            break;
        }

        return {
          ...prev,
          paddle1Y: newPaddle1Y,
          gameStarted: true
        };
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pongState.gameOver]);

  const resetGame = () => {
    setPongState({
      paddle1Y: 50,
      paddle2Y: 50,
      ballX: 50,
      ballY: 50,
      ballSpeedX: 2,
      ballSpeedY: 2,
      score1: 0,
      score2: 0,
      gameStarted: false,
      gameOver: false
    });
  };

  return (
    <div className="section">
      <h2>Pong</h2>
      <div className="game-container">
        <div className="game-score">
          <span>Joueur: {pongState.score1}</span>
          <span>IA: {pongState.score2}</span>
        </div>
        <div className="game-board">
          <div
            className="pong-paddle"
            style={{
              left: '0%',
              top: `${pongState.paddle1Y}%`,
              width: '5%',
              height: '20%'
            }}
          />
          <div
            className="pong-paddle"
            style={{
              right: '0%',
              top: `${pongState.paddle2Y}%`,
              width: '5%',
              height: '20%'
            }}
          />
          <div
            className="pong-ball"
            style={{
              left: `${pongState.ballX}%`,
              top: `${pongState.ballY}%`,
              width: '5%',
              height: '5%'
            }}
          />
          {pongState.gameOver && (
            <div className="game-over">
              <div className="game-over-text">
                {pongState.score1 > pongState.score2 ? 'Vous avez gagné!' : 'L\'IA a gagné!'}
              </div>
              <button className="game-button" onClick={resetGame}>
                Rejouer
              </button>
            </div>
          )}
        </div>
        <div className="game-controls">
          <div className="player-controls">
            <span>Contrôles: ↑↓</span>
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

export default Pong; 