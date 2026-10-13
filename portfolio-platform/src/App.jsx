
import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Home from "./pages/Home";
import ProjectDetails from "./pages/ProjectDetails";
import startingProjects from "./data/projects";

function App() {
  const [projects, setProjects] = useState(startingProjects);

  function addProject(newProject) {
    setProjects((previousProjects) => [
      ...previousProjects,
      { ...newProject, id: crypto.randomUUID() }
    ]);
  }

  return (
    <>
      <Header />

      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                projects={projects}
                onAddProject={addProject}
              />
            }
          />

          <Route
            path="/projects/:id"
            element={<ProjectDetails projects={projects} />}
          />
          <Route path="*" element={<section className="empty-state"><h1>Page not found</h1><Link to="/">Back to projects</Link></section>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
