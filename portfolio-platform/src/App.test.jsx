import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

function renderApp(path = "/") {
  return render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);
}

async function fillProject(user, title = "Weather app") {
  await user.type(screen.getByLabelText("Project title *"), title);
  await user.type(screen.getByLabelText("Description *"), "A daily forecast.");
  await user.type(screen.getByLabelText("Category *"), "Frontend");
}

describe("portfolio", () => {
  it("filters starting projects live by technology, ignoring case and outer spaces", async () => {
    const user = userEvent.setup();
    renderApp();
    expect(screen.getAllByRole("article")).toHaveLength(3);
    await user.type(screen.getByLabelText("Search projects"), "  amazon ecr  ");
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "AWS Cloud Deployment" })).toBeInTheDocument();
    await user.clear(screen.getByLabelText("Search projects"));
    await user.type(screen.getByLabelText("Search projects"), "no matches");
    expect(screen.getByText("No projects found. Try another search.")).toBeInTheDocument();
    await user.clear(screen.getByLabelText("Search projects"));
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });

  it("adds a project, resets the form, and keeps it when navigating back from details", async () => {
    const user = userEvent.setup();
    renderApp();
    await fillProject(user);
    await user.type(screen.getByRole("textbox", { name: "Technologies" }), "React, CSS, React");
    await user.type(screen.getByLabelText("Repository URL (optional)"), "https://github.com/example/weather");
    await user.click(screen.getByRole("button", { name: "Add project" }));
    expect(screen.getAllByRole("article")).toHaveLength(4);
    expect(screen.getByLabelText("Project title *")).toHaveValue("");
    expect(screen.getByRole("status")).toHaveTextContent("Project added!");
    await user.click(screen.getByRole("link", { name: "View Weather app" }));
    expect(screen.getByRole("heading", { level: 1, name: "Weather app" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByRole("link", { name: /View repository/ })).toHaveAttribute("href", "https://github.com/example/weather");
    await user.click(screen.getByRole("link", { name: /Back to projects/ }));
    expect(screen.getAllByRole("article")).toHaveLength(4);
  });

  it("rejects whitespace-only required fields", async () => {
    const user = userEvent.setup();
    renderApp();
    await fillProject(user, "   ");
    await user.click(screen.getByRole("button", { name: "Add project" }));
    expect(screen.getByRole("status")).toHaveTextContent("Please enter a title");
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });

  it("rejects unsafe repository links", async () => {
    const user = userEvent.setup();
    renderApp();
    await fillProject(user);
    await user.type(screen.getByLabelText("Repository URL (optional)"), "javascript:alert(1)");
    await user.click(screen.getByRole("button", { name: "Add project" }));
    expect(screen.getByRole("status")).toHaveTextContent("Use a full http:// or https:// URL");
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });

  it("renders a project directly from its URL and replaces missing images", () => {
    renderApp("/projects/1");
    expect(screen.getByRole("heading", { level: 1, name: "AWS Cloud Deployment" })).toBeInTheDocument();
    fireEvent.error(screen.getByRole("img"));
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Cloud Engineering")).toBeInTheDocument();
  });

  it.each(["/projects/missing", "/unknown"])("offers a way home from %s", async (path) => {
    const user = userEvent.setup();
    renderApp(path);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/not found/);
    await user.click(screen.getByRole("link", { name: "Back to projects" }));
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });
});
