# Portfolio Platform Lab

A simple React portfolio with project cards, live search, an add-project form, and individual project pages.

## Run in your Ubuntu / VS Code Ubuntu terminal

```sh
cd ~/Flatiron/reactlesson/portfolio-platform-lab
npm install
npm run dev
```

Open the local address printed in the terminal. Stop the server with Ctrl+C.

```sh
npm test
npm run build
npm run lint
npm run preview
```

Use Node 24 (the version used to verify this project). The root package manages the app in `portfolio-platform/` as an npm workspace. Run installs from this root folder; the root lockfile records the dependencies.

## How the React pieces fit together

- **Components** are pieces of the screen: Header, ProjectForm, SearchBar, ProjectList, and ProjectCard.
- **Props** pass data down. App sends the projects array to Home, and ProjectList passes one project to each card.
- **State** remembers values while the app runs. App holds projects; Home holds search text; ProjectForm holds input values.
- **Controlled inputs** use `value` and `onChange` so typing updates React state.
- **Events and callbacks** connect the form to App. Submitting calls `onAddProject`; App creates a new array so React displays the new card.
- **Lists** use `map` to make cards and a unique `key` to identify each project. Search uses `filter` on title, description, category, and technologies.
- **Routing** uses React Router: `/` shows all projects and `/projects/:id` shows one. Links change pages without reloading.

Starting projects are in `portfolio-platform/src/data/projects.js`. The existing Home component lives in `src/components/Home.jsx`; `src/pages/Home.jsx` exports it for the route.

Title, description, and category are required. Technologies are comma-separated. Image and repository URLs are optional and must use HTTP or HTTPS. Missing images show a category placeholder.

New projects are stored in memory and reset on refresh. There is no backend or login. For permanent examples, edit the starting data. When deploying, configure your host to serve `index.html` for app routes so direct project URLs work.

The tests cover search, form validation, adding projects, detail navigation, missing images, and unknown URLs.
