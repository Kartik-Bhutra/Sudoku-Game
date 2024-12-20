import { Link } from "react-router-dom";
import navbarStyles from "../styles/componentStyles/navbar.module.css";

export default function Navbar() {
  return (
    <nav className={`${navbarStyles.navbar} ${navbarStyles.navbar1}`}>
      <header className={navbarStyles.header}>
        <h1 className={`${navbarStyles.linkContainer} ${navbarStyles.heading}`}>
          <Link to="/">Sudoku.com</Link>
        </h1>
        <nav className={`${navbarStyles.navbar} ${navbarStyles.navbar3}`}>
          <div className={navbarStyles.linkContainer}>
            <Link to="">Classic</Link>
          </div>
          <div className={navbarStyles.linkContainer}>
            <Link to="">Solver</Link>
          </div>
        </nav>
      </header>
      <nav className={`${navbarStyles.navbar} ${navbarStyles.navbar2}`}>
        <div className={navbarStyles.linkContainer}>
          <Link to="">Tournament</Link>
        </div>
        <div className={navbarStyles.linkContainer}>
          <Link to="">Daily Challenge</Link>
        </div>
        <div className={navbarStyles.linkContainer}>
          <Link to="">Rules</Link>
        </div>
        <div className={navbarStyles.linkContainer}>
          <Link to="">Profile</Link>
        </div>
      </nav>
    </nav>
  );
}
