import { useState } from "react";

const emptyForm = { title: "", description: "", category: "", technologies: "", image: "", github: "" };

function ProjectForm({ onAddProject }) {
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !form.category.trim()) {
      setMessage("Please enter a title, description, and category.");
      return;
    }
    if ([form.image, form.github].some((value) => value.trim() && !/^https?:\/\/\S+$/i.test(value.trim()))) {
      setMessage("Use a full http:// or https:// URL for links.");
      return;
    }
    onAddProject({
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category.trim(),
      technologies: [...new Set(form.technologies.split(",").map((technology) => technology.trim()).filter(Boolean))],
      image: form.image.trim(),
      github: form.github.trim()
    });
    setForm(emptyForm);
    setMessage("Project added! Find it in My Projects.");
  }

  return (
    <aside className="form-panel">
      <p className="eyebrow">KEEP CREATING</p>
      <h2>Add a project</h2>
      <p>Give your next idea a place to shine.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Project title *</label>
        <input id="title" name="title" value={form.title} onChange={handleChange} required />
        <label htmlFor="description">Description *</label>
        <textarea id="description" name="description" rows="4" value={form.description} onChange={handleChange} required />
        <label htmlFor="category">Category *</label>
        <input id="category" name="category" placeholder="e.g. Frontend Development" value={form.category} onChange={handleChange} required />
        <label htmlFor="technologies">Technologies</label>
        <input id="technologies" name="technologies" placeholder="React, JavaScript, CSS" value={form.technologies} onChange={handleChange} />
        <label htmlFor="image">Image URL (optional)</label>
        <input id="image" name="image" type="url" value={form.image} onChange={handleChange} />
        <label htmlFor="github">Repository URL (optional)</label>
        <input id="github" name="github" type="url" value={form.github} onChange={handleChange} />
        <button type="submit">Add project <span aria-hidden="true">+</span></button>
        <p className="form-note">New projects stay until you refresh the page.</p>
        <p role="status">{message}</p>
      </form>
    </aside>
  );
}

export default ProjectForm;
