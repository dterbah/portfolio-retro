import { useState, useEffect } from 'react';
import '../index.css';

const GameBoy = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState('');
  const [isPowered, setIsPowered] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const menuItems = [
    { id: 'pro', label: 'Projets Professionnels' },
    { id: 'perso', label: 'Projets Personnels' },
    { id: 'skills', label: 'Compétences' },
    { id: 'contact', label: 'Contact' }
  ];

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
                        <div className="project-item">
                          <h4>Go Data Structure</h4>
                          <p>Ce projet a pour but de mettre à disposition une collection de structure de données complexes en Go.</p>
                          <div className="project-date">Juin 2024</div>
                          <div className="skills">
                            {['Go', 'CI/CD'].map((skill) => (
                              <span key={skill} className="skill-tag">{skill}</span>
                            ))}
                          </div>
                        </div>
                        <div className="project-item">
                          <h4>Go Package Manager</h4>
                          <p>Ce projet est inspriré de NPM. Il permet de créer, manager et mettre à jour facilement un projet en Go.</p>
                          <div className="project-date">Juillet 2024</div>
                          <div className="skills">
                            {['Go', 'CI/CD'].map((skill) => (
                              <span key={skill} className="skill-tag">{skill}</span>
                            ))}
                          </div>
                        </div>
                        <div className="project-item">
                          <h4>Go-Test-Gen</h4>
                          <p>Il s'agit d'un générateur de templates de tests pour un fichier/projet écrit en Go.</p>
                          <div className="project-date">Juin 2024</div>
                          <div className="skills">
                            {['Go', 'CI/CD'].map((skill) => (
                              <span key={skill} className="skill-tag">{skill}</span>
                            ))}
                          </div>
                        </div>
                        <div className="project-item">
                          <h4>Go-Logic</h4>
                          <p>Ce projet permet de résoudre des expressions booléennes, de les simplifier, de générer un graphe décrivant l'expression et des tables de vérités.</p>
                          <div className="project-date">Juillet 2024</div>
                          <div className="skills">
                            {['Go', 'CI/CD'].map((skill) => (
                              <span key={skill} className="skill-tag">{skill}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="project">
                        <h3>Web</h3>
                        <div className="project-item">
                          <h4>Konect</h4>
                          <p>Ce logiciel de NoCode permet d'assembler des briques pour créer des processus complexes.</p>
                          <div className="project-date">Avril 2023 - Juillet 2023</div>
                          <div className="skills">
                            {['Typescript', 'VueJS', 'Python', 'Flask', 'Rest'].map((skill) => (
                              <span key={skill} className="skill-tag">{skill}</span>
                            ))}
                          </div>
                        </div>
                        <div className="project-item">
                          <h4>Data-France-Visualization</h4>
                          <p>Application qui permet de visualiser des données concernant la France (consommation, prix, ...).</p>
                          <div className="project-date">Mars 2023</div>
                          <div className="skills">
                            {['Typescript', 'VueJS', 'Rest'].map((skill) => (
                              <span key={skill} className="skill-tag">{skill}</span>
                            ))}
                          </div>
                        </div>
                        <div className="project-item">
                          <h4>Pokedex</h4>
                          <p>Application listant des pokemons avec leurs statistiques, un simulateur d'achats d'objets et un mini quizz.</p>
                          <div className="project-date">Octobre 2024</div>
                          <div className="skills">
                            {['Typescript', 'Angular', 'Rest'].map((skill) => (
                              <span key={skill} className="skill-tag">{skill}</span>
                            ))}
                          </div>
                        </div>
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

  return (
    <div className="gameboy">
      <div className="power-section">
        <div className="power-led" />
        <span className="power-text">POWER</span>
        <div className="power-button" onClick={handlePowerToggle} />
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