import professionalProjectsData from '../../data/professionalProjects.json';

const ProfessionalProjects = () => {
  return (
    <div className="section">
      <h2>Projets Professionnels</h2>
      <div className="project-list">
        {professionalProjectsData.projects.map((company) => (
          <div key={company.company} className="project">
            <h3>{company.company}</h3>
            {company.projects.map((project) => (
              <div key={project.title} className="project-item">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <div className="project-date">{project.date}</div>
                <div className="skills">
                  {project.skills.map((skill) => (
                    <span key={skill} className="skill-tag">{skill}</span>
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

export default ProfessionalProjects; 