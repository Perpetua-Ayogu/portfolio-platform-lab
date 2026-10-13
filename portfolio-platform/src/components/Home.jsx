
import { useState } from "react";
import ProjectForm from "../components/ProjectForm";
import SearchBar from "../components/SearchBar";
import ProjectList from "../components/ProjectList";

function Home({ projects, onAddProject }) {
  const [search, setSearch] = useState("");

  const filteredProjects = projects.filter((project) => {
    const text = `${project.title} ${project.description} ${project.category} ${project.technologies.join(" ")}`.toLowerCase();

    return text.includes(search.trim().toLowerCase());
  });

  return (
    <>
      <div className="intro">
        <p className="eyebrow">LEARNING BY BUILDING</p>
        <h1>Personal Project Showcase</h1>
        <p>
          Explore my projects in React, cloud computing
          and DevOps.
        </p>
      </div>

      <div className="main-layout">
        <ProjectForm onAddProject={onAddProject} />

        <section className="projects-section">
          <SearchBar
            search={search}
            onSearchChange={setSearch}
          />

          <h2 aria-live="polite">My Projects ({filteredProjects.length})</h2>

          <ProjectList projects={filteredProjects} />
        </section>
      </div>
    </>
  );
}

export default Home;
