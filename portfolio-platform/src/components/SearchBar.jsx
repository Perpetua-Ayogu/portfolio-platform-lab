function SearchBar({ search, onSearchChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="project-search">Search projects</label>
      <input
        id="project-search"
        type="search"
        placeholder="Try React, AWS, or Docker..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;
