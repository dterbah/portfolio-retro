import React from 'react';

const Skills = () => {
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
};

export default Skills; 