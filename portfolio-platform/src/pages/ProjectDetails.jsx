import { Link, useParams } from "react-router-dom";
import ProjectImage from "../components/ProjectImage";

function ProjectDetails({ projects }) {
  const { id } = useParams();
  const project = projects.find((project) => String(project.id) === id);

  if (!project) {
    return <section className="empty-state"><h1>Project not found</h1><p>This project is unavailable. New projects reset when you refresh.</p><Link to="/">Back to projects</Link></section>;
  }

  return (
    <article className="project-detail">
      <Link to="/">← Back to projects</Link>
      <p className="eyebrow">{project.category}</p>
      <h1>{project.title}</h1>
      <ProjectImage key={project.id} project={project} />
      <p>{project.description}</p>
      <h2>Built with</h2>
      <ul className="tags">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
      {/^https?:\/\//i.test(project.github) && <a href={project.github} target="_blank" rel="noreferrer">View repository ↗</a>}
    </article>
  );
}

export default ProjectDetails;
