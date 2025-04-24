import personalProjectsData from '../../data/personalProjects.json';

interface Project {
  title: string;
  description: string;
  link: string;
  date: string;
  skills: string[];
  webLink?: string;
}

const PersonalProjects = () => {
  return (
    <div className="section">
      <h2>Projets Personnels</h2>
      <div className="project-list">
        {personalProjectsData.categories.map((category) => (
          <div key={category.name} className="project">
            <h3>{category.name}</h3>
            {category.projects.map((project: Project) => (
              <div key={project.title} className="project-item">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
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
        ))}
      </div>
    </div>
  );
};

export default PersonalProjects; 