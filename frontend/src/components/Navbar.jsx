import { Link } from "react-router-dom";
import navbarStyles from "../styles/componentStyles/navbar.module.css";
import { useState } from "react";

export default function Navbar() {
  const [classic, setClassic] = useState("#2c57af");
  const [solver, setSolver] = useState("#7a7d85");
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav className={`${navbarStyles.navbar} ${navbarStyles.navbar1}`}>
      <header>
        <h1 className={`${navbarStyles.linkContainer}`}>
          <Link to="/">Sudoku.com</Link>
        </h1>
        <nav className={`${navbarStyles.navbar} ${navbarStyles.navbar3}`}>
          <div className={navbarStyles.linkContainer} onClick={() => {
            setClassic("#2c57af");
            setSolver("#7a7d85");
          }}>
            <Link to="" style={{
              color: classic
            }}>Classic</Link>
          </div>
          <div className={navbarStyles.linkContainer} onClick={() => {
            setClassic("#7a7d85");
            setSolver("#2c57af");
          }}>
            <Link to="" style={{
              color: solver
            }}>Solver</Link>
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
      <nav className={navbarStyles.mobile}>
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
