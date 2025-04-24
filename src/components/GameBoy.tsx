import { useState, useEffect } from 'react';
import '../index.css';

interface Quest {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface Project {
  title: string;
  content: string;
  link: string;
  date: string;
  skills: string[];
  webLink?: string;
}

interface Position {
  x: number;
  y: number;
}

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

const GameBoy = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState('');
  const [isPowered, setIsPowered] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [contrastMode, setContrastMode] = useState<'normal' | 'high-contrast' | 'low-contrast'>('normal');
  const [timeSpent, setTimeSpent] = useState(0);
  const [visitedSections, setVisitedSections] = useState<string[]>([]);
  const [quests, setQuests] = useState<Quest[]>([
    {
      id: 'visit-skills',
      title: 'Explorateur de Compétences',
      description: 'Visite la section Compétences',
      completed: false
    },
    {
      id: 'time-spent',
      title: 'Visiteur Assidu',
      description: 'Passe 10 secondes sur le portfolio',
      completed: false
    },
    {
      id: 'visit-all',
      title: 'Explorateur Complet',
      description: 'Visite toutes les sections du portfolio',
      completed: false
    },
    {
      id: 'change-contrast',
      title: 'Maître des Couleurs',
      description: 'Teste tous les modes de contraste',
      completed: false
    }
  ]);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('right');
  const [snakeScore, setSnakeScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
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

  const menuItems = [
    { id: 'pro', label: 'Projets Professionnels' },
    { id: 'perso', label: 'Projets Personnels' },
    { id: 'skills', label: 'Compétences' },
    { id: 'games', label: 'Mini-Jeux' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', contrastMode);
  }, [contrastMode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setLoading(false);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const batteryTimer = setInterval(() => {
      setBatteryLevel((prev) => (prev > 0 ? prev - 1 : 0));
    }, 60000);

    return () => clearInterval(batteryTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!loading && isPowered) {
        setTimeSpent(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, isPowered]);

  useEffect(() => {
    if (currentSection && !visitedSections.includes(currentSection)) {
      setVisitedSections(prev => [...prev, currentSection]);
    }
  }, [currentSection]);

  useEffect(() => {
    const checkQuests = () => {
      setQuests(prevQuests => 
        prevQuests.map(quest => {
          let shouldComplete = false;

          switch (quest.id) {
            case 'visit-skills':
              shouldComplete = visitedSections.includes('skills');
              break;
            case 'time-spent':
              shouldComplete = timeSpent >= 10;
              break;
            case 'visit-all':
              shouldComplete = visitedSections.length >= 4;
              break;
            case 'change-contrast':
              shouldComplete = contrastMode === 'low-contrast';
              break;
          }

          if (!quest.completed && shouldComplete) {
            console.log(`Quest ${quest.id} completed!`);
            return { ...quest, completed: true };
          }
          return quest;
        })
      );
    };

    checkQuests();
  }, [timeSpent, visitedSections, contrastMode]);

  useEffect(() => {
    const savedQuests = localStorage.getItem('quests');
    if (savedQuests) {
      const parsedQuests = JSON.parse(savedQuests);
      setQuests(parsedQuests);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('quests', JSON.stringify(quests));
  }, [quests]);

  useEffect(() => {
    const savedTime = localStorage.getItem('timeSpent');
    if (savedTime) {
      setTimeSpent(parseInt(savedTime));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('timeSpent', timeSpent.toString());
  }, [timeSpent]);

  useEffect(() => {
    const savedSections = localStorage.getItem('visitedSections');
    if (savedSections) {
      setVisitedSections(JSON.parse(savedSections));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('visitedSections', JSON.stringify(visitedSections));
  }, [visitedSections]);

  useEffect(() => {
    if (currentSection === 'snake' && gameStarted && !gameOver) {
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
            setSnakeScore(prev => prev + 1);
            // Générer une nouvelle position pour la nourriture
            let newFood;
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
  }, [currentSection, direction, food, gameStarted, gameOver]);

  useEffect(() => {
    if (currentSection === 'snake') {
      const handleKeyDown = (e: KeyboardEvent) => {
        e.preventDefault(); // Empêche le défilement de la page
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
    }
  }, [currentSection, direction, gameStarted]);

  useEffect(() => {
    if (currentSection === 'pong' && pongState.gameStarted && !pongState.gameOver) {
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
  }, [currentSection, pongState.gameStarted, pongState.gameOver]);

  useEffect(() => {
    if (currentSection === 'pong') {
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
    }
  }, [currentSection, pongState.gameOver]);

  const handlePowerToggle = () => {
    setIsPowered(!isPowered);
    if (isPowered) {
      setLoading(true);
      setProgress(0);
    }
  };

  const handleKeyPress = (key: string) => {
    if (!isPowered || loading) return;

    if (currentSection === 'snake') {
      switch (key) {
        case 'up':
          if (direction !== 'down') setDirection('up');
          break;
        case 'down':
          if (direction !== 'up') setDirection('down');
          break;
        case 'left':
          if (direction !== 'right') setDirection('left');
          break;
        case 'right':
          if (direction !== 'left') setDirection('right');
          break;
      }
      if (!gameStarted) setGameStarted(true);
      return;
    }

    switch (key) {
      case 'up':
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : menuItems.length - 1));
        break;
      case 'down':
        setSelectedIndex((prev) => (prev < menuItems.length - 1 ? prev + 1 : 0));
        break;
      case 'a':
        if (currentSection === '') {
          setCurrentSection(menuItems[selectedIndex].id);
        }
        break;
      case 'b':
        if (currentSection !== '') {
          setCurrentSection('');
        }
        break;
    }
  };

  const handleContrastChange = () => {
    const modes: ('normal' | 'high-contrast' | 'low-contrast')[] = ['normal', 'high-contrast', 'low-contrast'];
    const currentIndex = modes.indexOf(contrastMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setContrastMode(modes[nextIndex]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const renderStatusBar = () => {
    if (!isPowered) return null;

    return (
      <div className="status-bar">
        <div className="battery">
          <div className="battery-icon">
            <div className="battery-level" style={{ width: `${batteryLevel}%` }} />
          </div>
          <span>{batteryLevel}%</span>
        </div>
        <div className="time">{formatTime(currentTime)}</div>
        <div className="date">{formatDate(currentTime)}</div>
      </div>
    );
  };

  const renderQuests = () => {
    const completedQuests = quests.filter(quest => quest.completed).length;
    const totalQuests = quests.length;

    return (
      <div className="quest-section">
        <h2>Quêtes ({completedQuests}/{totalQuests})</h2>
        <div className="quest-list">
          {quests.map(quest => (
            <div key={quest.id} className={`quest-item ${quest.completed ? 'completed' : ''}`}>
              <div className="quest-info">
                <div className="quest-title">{quest.title}</div>
                <div className="quest-description">{quest.description}</div>
              </div>
              <div className={`quest-status ${quest.completed ? 'completed' : ''}`}>
                {quest.completed ? '✓' : '○'}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSection = () => {
    if (!isPowered) {
      return (
        <div className="screen-off">
          <div className="power-off-text">POWER OFF</div>
        </div>
      );
    }

    return (
      <>
        {renderStatusBar()}
        <div className="content">
          <div className="portfolio-title">PORTFOLIO</div>
          {(() => {
            if (currentSection === 'quests') {
              return renderQuests();
            }

            if (currentSection === '') {
              return (
                <div className="menu">
                  {menuItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={`menu-item ${index === selectedIndex ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedIndex(index);
                        setCurrentSection(item.id);
                      }}
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              );
            }

            switch (currentSection) {
              case 'pro':
                return (
                  <div className="section">
                    <h2>Projets Professionnels</h2>
                    <div className="project-list">
                      <div className="project">
                        <h3>Heva</h3>
                        <div className="project-item">
                          <h4>Osiris</h4>
                          <p>Simulation de contribution à la clause de sauvegarde d'entreprises vendant du matériel médical pour le SNITEM.</p>
                          <div className="project-date">Septembre 2023 - Février 2024</div>
                          <div className="skills">
                            {['React', 'Typescript', 'Redux', 'PostgreSQL'].map((skill) => (
                              <span key={skill} className="skill-tag">{skill}</span>
                            ))}
                          </div>
                        </div>
                        <div className="project-item">
                          <h4>Apollo</h4>
                          <p>Dashboard de visualisation de données pour l'entreprise Novartis, qui permet de voir et interpréter des suivis médicaux de patients.</p>
                          <div className="project-date">Février 2024 - Juillet 2024</div>
                          <div className="skills">
                            {['React', 'Typescript', 'Redux', 'Python', 'Minio', 'FastAPI'].map((skill) => (
                              <span key={skill} className="skill-tag">{skill}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="project">
                        <h3>Gutenberg Technology</h3>
                        <div className="project-item">
                          <h4>MEFio</h4>
                          <p>Plateforme de gestion de contenu collaboratif</p>
                          <div className="project-date">Septembre 2022 - Septembre 2023</div>
                          <div className="skills">
                            {['Typescript', 'React', 'Angular', 'Node'].map((skill) => (
                              <span key={skill} className="skill-tag">{skill}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="project">
                        <h3>Ciril Group</h3>
                        <div className="project-item">
                          <h4>Toolkit E2E</h4>
                          <p>Outil permettant de faciliter le développement de tests end-to-end</p>
                          <div className="project-date">Septembre 2019 - Septembre 2020</div>
                          <div className="skills">
                            {['Typescript', 'PostgreSQL'].map((skill) => (
                              <span key={skill} className="skill-tag">{skill}</span>
                            ))}
                          </div>
                        </div>
                        <div className="project-item">
                          <h4>Système de logging</h4>
                          <p>Outil de logging créé pour les développeurs de Ciril GROUP pour simplifier la recherche de problèmes.</p>
                          <div className="project-date">Septembre 2020 - Septembre 2021</div>
                          <div className="skills">
                            {['C', 'Java'].map((skill) => (
                              <span key={skill} className="skill-tag">{skill}</span>
                            ))}
                          </div>
                        </div>
                        <div className="project-item">
                          <h4>Système de sondes</h4>
                          <p>Outils qui analyse les applications clientes pour prévenir de potentielles pannes ou crashs.</p>
                          <div className="project-date">Septembre 2021 - Septembre 2022</div>
                          <div className="skills">
                            {['C', 'Java'].map((skill) => (
                              <span key={skill} className="skill-tag">{skill}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              case 'perso':
                return (
                  <div className="section">
                    <h2>Projets Personnels</h2>
                    <div className="project-list">
                      <div className="project">
                        <h3>Golang</h3>
                        {[
                          {
                            title: "Go Data Structure",
                            content: "Ce projet a pour but de mettre à disposition une collection de structure de données complexes en Go.",
                            link: "https://github.com/dterbah/gods",
                            date: "Juin 2024",
                            skills: ["Go", "CI/CD"]
                          },
                          {
                            title: "Go Package Manager",
                            content: "Ce projet est inspriré de NPM. Il permet de créer, manager et mettre à jour facilement un projet en Go.",
                            link: "https://github.com/dterbah/gopm",
                            date: "Juillet 2024",
                            skills: ["Go", "CI/CD"]
                          },
                          {
                            title: "Go-Test-Gen",
                            content: "Il s'agit d'un générateur de templates de tests pour un fichier/projet écrit en Go.",
                            link: "https://github.com/dterbah/go-test-gen",
                            date: "Juin 2024",
                            skills: ["Go", "CI/CD"]
                          },
                          {
                            title: "Go-Logic",
                            content: "Ce projet permet de résoudre des expressions booléennes, de les simplifier, de générer un graphe décrivant l'expression et des tables de vérités.",
                            link: "https://github.com/dterbah/go-logic?tab=readme-ov-file",
                            date: "Juillet 2024",
                            skills: ["Go", "CI/CD"]
                          }
                        ].map((project) => (
                          <div key={project.title} className="project-item">
                            <h4>{project.title}</h4>
                            <p>{project.content}</p>
                            <div className="project-date">{project.date}</div>
                            <div className="skills">
                              {project.skills.map((skill) => (
                                <span key={skill} className="skill-tag">{skill}</span>
                              ))}
                            </div>
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="github-link">
                              <span>Voir sur GitHub</span>
                            </a>
                          </div>
                        ))}
                      </div>
                      <div className="project">
                        <h3>Web</h3>
                        {[
                          {
                            title: "Konect",
                            content: "Ce logiciel de NoCode permet d'assembler des briques pour créer des processus complexes.",
                            link: "https://github.com/KonectTeam/konect",
                            date: "Avril 2023 - Juillet 2023",
                            skills: ["Typescript", "VueJS", "Python", "Flask", "Rest"],
                            webLink: "https://konect-app.netlify.app/"
                          },
                          {
                            title: "Data-France-Visualization",
                            content: "Application qui permet de visualiser des données concernant la France (consommation, prix, ...).",
                            link: "https://github.com/dterbah/Data-France-Visualization",
                            date: "Mars 2023",
                            skills: ["Typescript", "VueJS", "Rest"],
                            webLink: "https://data-france-visualization.netlify.app/"
                          },
                          {
                            title: "Pokedex",
                            content: "Application listant des pokemons avec leurs statistiques, un simulateur d'achats d'objets et un mini quizz.",
                            link: "https://github.com/dterbah/pokedex",
                            date: "Octobre 2024",
                            skills: ["Typescript", "Angular", "Rest"],
                            webLink: "https://dterbah-pokedexv2.netlify.app"
                          }
                        ].map((project) => (
                          <div key={project.title} className="project-item">
                            <h4>{project.title}</h4>
                            <p>{project.content}</p>
                            <div className="project-date">{project.date}</div>
                            <div className="skills">
                              {project.skills.map((skill) => (
                                <span key={skill} className="skill-tag">{skill}</span>
                              ))}
                            </div>
                            <div className="project-links">
                              <a href={project.link} target="_blank" rel="noopener noreferrer" className="github-link">
                                <span>Voir sur GitHub</span>
                              </a>
                              {project.webLink && (
                                <a href={project.webLink} target="_blank" rel="noopener noreferrer" className="web-link">
                                  <span>Voir le site</span>
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              case 'skills':
                return (
                  <div className="section">
                    <h2>Compétences</h2>
                    <div className="skills-list">
                      <div className="skills-category">
                        <h3>Frontend</h3>
                        {[
                          { name: 'React', level: 5 },
                          { name: 'TypeScript', level: 5 },
                          { name: 'VueJS', level: 4 },
                          { name: 'Angular', level: 3 },
                        ].map((skill) => (
                          <div key={skill.name} className="skill-item">
                            <span>{skill.name}</span>
                            <div className="skill-level">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`skill-dot ${i < skill.level ? 'filled' : ''}`}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="skills-category">
                        <h3>Backend</h3>
                        {[
                          { name: 'Go', level: 5 },
                          { name: 'Python', level: 4 },
                          { name: 'Node.js', level: 4 },
                          { name: 'Java', level: 3 },
                          { name: 'C', level: 3 },
                        ].map((skill) => (
                          <div key={skill.name} className="skill-item">
                            <span>{skill.name}</span>
                            <div className="skill-level">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`skill-dot ${i < skill.level ? 'filled' : ''}`}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="skills-category">
                        <h3>Base de données</h3>
                        {[
                          { name: 'PostgreSQL', level: 4 },
                          { name: 'MongoDB', level: 3 },
                        ].map((skill) => (
                          <div key={skill.name} className="skill-item">
                            <span>{skill.name}</span>
                            <div className="skill-level">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`skill-dot ${i < skill.level ? 'filled' : ''}`}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="skills-category">
                        <h3>DevOps</h3>
                        {[
                          { name: 'CI/CD', level: 4 },
                          { name: 'Docker', level: 3 },
                          { name: 'Kubernetes', level: 2 },
                        ].map((skill) => (
                          <div key={skill.name} className="skill-item">
                            <span>{skill.name}</span>
                            <div className="skill-level">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`skill-dot ${i < skill.level ? 'filled' : ''}`}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              case 'games':
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
                        <button className="game-button" onClick={() => setCurrentSection('snake')}>
                          Jouer
                        </button>
                      </div>
                      <div className="game-item">
                        <h3>Pong</h3>
                        <p>Le premier jeu vidéo commercial. Utilise ↑↓ pour déplacer la raquette.</p>
                        <div className="game-controls">
                          <span>↑↓</span>
                        </div>
                        <button className="game-button" onClick={() => setCurrentSection('pong')}>
                          Jouer
                        </button>
                      </div>
                      <div className="game-item">
                        <h3>Space Invaders</h3>
                        <p>Défends la Terre contre les aliens. Utilise ←→ pour te déplacer et A pour tirer.</p>
                        <div className="game-controls">
                          <span>←→ A</span>
                        </div>
                        <button className="game-button" onClick={() => setCurrentSection('space-invaders')}>
                          Jouer
                        </button>
                      </div>
                    </div>
                  </div>
                );
              case 'snake':
                return (
                  <div className="section">
                    <h2>Snake</h2>
                    <div className="game-container">
                      <div className="game-score">Score: {snakeScore}</div>
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
                            <button className="game-button" onClick={resetSnakeGame}>
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
                      <button className="game-button" onClick={() => {
                        setCurrentSection('games');
                        resetSnakeGame();
                      }}>
                        Retour
                      </button>
                    </div>
                  </div>
                );
              case 'pong':
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
                            <button className="game-button" onClick={resetPongGame}>
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
                      <button className="game-button" onClick={() => {
                        setCurrentSection('games');
                        resetPongGame();
                      }}>
                        Retour
                      </button>
                    </div>
                  </div>
                );
              case 'space-invaders':
                return (
                  <div className="section">
                    <h2>Space Invaders</h2>
                    <div className="game-container">
                      <div className="game-score">Score: 0</div>
                      <div className="game-board">
                        {/* Le jeu sera implémenté ici */}
                      </div>
                      <button className="game-button" onClick={() => setCurrentSection('games')}>
                        Retour
                      </button>
                    </div>
                  </div>
                );
              case 'contact':
                return (
                  <div className="section">
                    <h2>Contact</h2>
                    <div className="contact-info">
                      <a href="mailto:dterbah@gmail.com" className="contact-link">
                        <span className="contact-label">Email:</span> dterbah@gmail.com
                      </a>
                      <a href="https://github.com/dterbah" target="_blank" rel="noopener noreferrer" className="contact-link">
                        <span className="contact-label">GitHub:</span> github.com/dterbah
                      </a>
                      <a href="https://www.linkedin.com/in/dterbah/" target="_blank" rel="noopener noreferrer" className="contact-link">
                        <span className="contact-label">LinkedIn:</span> linkedin.com/in/dterbah
                      </a>
                    </div>
                  </div>
                );
            }
          })()}
        </div>
      </>
    );
  };

  const resetSnakeGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection('right');
    setSnakeScore(0);
    setGameOver(false);
    setGameStarted(false);
  };

  const resetPongGame = () => {
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
    <div className="gameboy">
      <div className="power-section">
        <div className="power-led" />
        <span className="power-text">POWER</span>
        <div className="power-button" onClick={handlePowerToggle} />
      </div>
      <div className="contrast-button" onClick={handleContrastChange}>
        <div className="contrast-icon" />
      </div>
      <div className="quest-button" onClick={() => setCurrentSection('quests')}>
        <div className="quest-icon">!</div>
      </div>
      <div className="screen">
        {loading ? (
          <div className="loading-screen">
            <div className="loading-text">Chargement...</div>
            <div className="loading-bar">
              <div
                className="loading-progress"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          renderSection()
        )}
      </div>
      <div className="controls">
        <div className="dpad">
          <div className="dpad-button up" onClick={() => handleKeyPress('up')}>↑</div>
          <div className="dpad-button right" onClick={() => handleKeyPress('right')}>→</div>
          <div className="dpad-button down" onClick={() => handleKeyPress('down')}>↓</div>
          <div className="dpad-button left" onClick={() => handleKeyPress('left')}>←</div>
        </div>
        <div className="action-buttons">
          <div className="action-button" onClick={() => handleKeyPress('b')}>B</div>
          <div className="action-button" onClick={() => handleKeyPress('a')}>A</div>
        </div>
      </div>
    </div>
  );
};

export default GameBoy; 