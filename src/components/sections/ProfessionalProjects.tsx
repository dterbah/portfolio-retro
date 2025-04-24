import React from 'react';

const ProfessionalProjects = () => {
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
};

export default ProfessionalProjects; 