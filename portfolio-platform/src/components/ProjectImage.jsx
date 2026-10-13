import { useState } from "react";

function ProjectImage({ project }) {
  const [hasError, setHasError] = useState(false);

  if (!project.image || hasError) {
    return <div className="project-image image-placeholder" aria-label={project.category}>{project.category}</div>;
  }

  return <img className="project-image" src={project.image} alt={project.title} onError={() => setHasError(true)} />;
}

export default ProjectImage;
