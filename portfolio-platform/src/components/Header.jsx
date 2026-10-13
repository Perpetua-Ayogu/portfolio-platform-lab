import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <nav className="container" aria-label="Main navigation">
        <Link className="brand" to="/">Perpetua Ayogu <span>/ portfolio</span></Link>
        <Link to="/">My projects</Link>
      </nav>
    </header>
  );
}

export default Header;
