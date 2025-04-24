import React from 'react';

interface ExperienceProps {
  onBack: () => void;
}

const Experience: React.FC<ExperienceProps> = ({ onBack }) => {
  return (
    <div className="experience-section">
      <div className="section-header">
        <h2>Expériences Professionnelles</h2>
        <button onClick={onBack} className="back-button">Retour</button>
      </div>

      <div className="experience-item">
        <h3>Software Engineer</h3>
        <p className="experience-company">HEVA (Traitement de la donnée de santé)</p>
        <p className="experience-period">Septembre 2023 - aujourd'hui</p>
        <ul className="experience-tasks">
          <li>Création de dashboards graphiques d'études médicales</li>
          <li>Mise en place d'un SaaS visant à optimiser les coûts de traitements médicaux</li>
          <li>Création d'une application de prédiction de dépenses médicales</li>
        </ul>
      </div>

      <div className="experience-item">
        <h3>Développeur FullStack</h3>
        <p className="experience-company">Gutenberg Technology (Edition de livres numériques)</p>
        <p className="experience-period">Septembre 2022 - Septembre 2023</p>
        <ul className="experience-tasks">
          <li>Optimisation du stockage des projets utilisateurs</li>
          <li>Migration de l'application de l'AngularJS à Angular</li>
          <li>Création d'une fonctionnalité de tagging des projets</li>
          <li>Participation à la conception d'architectures logicielles</li>
        </ul>
      </div>

      <div className="experience-item">
        <h3>Apprenti ingénieur R&D</h3>
        <p className="experience-company">Ciril GROUP (Editeur de logiciels et un hebergeur cloud)</p>
        <p className="experience-period">Septembre 2019 - Septembre 2022</p>
        <ul className="experience-tasks">
          <li>Développement d'un système de logging</li>
          <li>Développement d'un système de monitoring pour les applications clientes</li>
          <li>Création d'un framework de tests End-To-End</li>
        </ul>
      </div>
    </div>
  );
};

export default Experience; 