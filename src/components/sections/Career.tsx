import React from 'react';
import careerData from '../../data/career.json';

interface CareerProps {
  onBack: () => void;
}

interface Experience {
  title: string;
  company: string;
  description: string;
  period: string;
  tasks: string[];
}

interface Education {
  school: string;
  degree: string;
  period: string;
}

const Career: React.FC<CareerProps> = ({ onBack }) => {
  return (
    <div className="career-section">
      <div className="section-header">
        <h2>Parcours</h2>
        <button onClick={onBack} className="back-button">Retour</button>
      </div>

      <h3 className="career-subtitle">Expériences Professionnelles</h3>
      {careerData.experiences.map((experience: Experience, index: number) => (
        <div key={index} className="experience-item">
          <h3>{experience.title}</h3>
          <p className="experience-company">
            {experience.company} ({experience.description})
          </p>
          <p className="experience-period">{experience.period}</p>
          <ul className="experience-tasks">
            {experience.tasks.map((task: string, taskIndex: number) => (
              <li key={taskIndex}>{task}</li>
            ))}
          </ul>
        </div>
      ))}

      <h3 className="career-subtitle">Formation</h3>
      {careerData.education.map((education: Education, index: number) => (
        <div key={index} className="education-item">
          <h3>{education.school}</h3>
          <p className="education-title">{education.degree}</p>
          <p className="education-period">{education.period}</p>
        </div>
      ))}
    </div>
  );
};

export default Career; 