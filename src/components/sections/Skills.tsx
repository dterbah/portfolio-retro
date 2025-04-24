import React from 'react';
import skillsData from '../../data/skills.json';

const Skills = () => {
  return (
    <div className="section">
      <h2>Compétences</h2>
      <div className="skills-list">
        {skillsData.categories.map((category) => (
          <div key={category.name} className="skills-category">
            <h3>{category.name}</h3>
            {category.skills.map((skill) => (
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
        ))}
      </div>
    </div>
  );
};

export default Skills; 