import React from 'react';

interface EducationProps {
  onBack: () => void;
}

const Education: React.FC<EducationProps> = ({ onBack }) => {
  return (
    <div className="education-section">
      <div className="section-header">
        <h2>Formation</h2>
        <button onClick={onBack} className="back-button">Retour</button>
      </div>
      
      <div className="education-item">
        <h3>INSA de Lyon</h3>
        <p className="education-title">Diplôme d'ingénieur en informatique</p>
        <p className="education-period">2019 - 2022</p>
      </div>

      <div className="education-item">
        <h3>Aalto University, Helsinki, Finlande</h3>
        <p className="education-title">Semestre Erasmus</p>
        <p className="education-period">Septembre 2021 - Décembre 2021</p>
      </div>

      <div className="education-item">
        <h3>IUT Fontainebleau</h3>
        <p className="education-title">DUT Informatique, mention très bien</p>
        <p className="education-period">2017 - 2019</p>
      </div>
    </div>
  );
};

export default Education; 