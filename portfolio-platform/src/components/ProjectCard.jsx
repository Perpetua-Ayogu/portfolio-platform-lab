import { Link } from "react-router-dom";
import ProjectImage from "./ProjectImage";

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <ProjectImage project={project} />
      <div className="card-content">
        <p className="eyebrow">{project.category}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <ul className="tags" aria-label="Technologies">
          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        <Link className="project-link" to={`/projects/${project.id}`}>View {project.title} <span aria-hidden="true">↗</span></Link>
      </div>
    </article>
  );
}

export default ProjectCard;
