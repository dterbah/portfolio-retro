import { useState, useEffect } from 'react';
import '../index.css';
import ProfessionalProjects from './sections/ProfessionalProjects';
import PersonalProjects from './sections/PersonalProjects';
import Skills from './sections/Skills';
import Games from './sections/Games';
import Contact from './sections/Contact';
import Quests from './sections/Quests';

interface Quest {
  id: string;
  title: string;
  description: string;
  completed: boolean;
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
  }, [currentSection, visitedSections]);

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

  const handlePowerToggle = () => {
    setIsPowered(!isPowered);
    if (isPowered) {
      setLoading(true);
      setProgress(0);
    }
  };

  const handleKeyPress = (key: string) => {
    if (!isPowered || loading) return;

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
              return <Quests quests={quests} />;
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
                return <ProfessionalProjects />;
              case 'perso':
                return <PersonalProjects />;
              case 'skills':
                return <Skills />;
              case 'games':
                return <Games currentGame="" onBack={() => setCurrentSection('games')} />;
              case 'snake':
                return <Games currentGame="snake" onBack={() => setCurrentSection('games')} />;
              case 'pong':
                return <Games currentGame="pong" onBack={() => setCurrentSection('games')} />;
              case 'catch-the-dot':
                return <Games currentGame="catch-the-dot" onBack={() => setCurrentSection('games')} />;
              case 'contact':
                return <Contact />;
            }
          })()}
        </div>
      </>
    );
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