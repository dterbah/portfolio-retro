import React from 'react';

const PersonalProjects = () => {
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
};

export default PersonalProjects; 