import React from "react";
import navbarStyles from "../styles/navbar.module.css";
export default function Header() {
  return (
    <navbar className={`${navbarStyles.navbar} ${navbarStyles.navbar1}`}>
      <header className={navbarStyles.header}>
        <h1 className={`${navbarStyles.linkContainer} ${navbarStyles.heading}`}>
          <a href="">Sudoku.com</a>
        </h1>
        <div className={`${navbarStyles.navbar} ${navbarStyles.navbar3}`}>
          <div className={navbarStyles.linkContainer}>
            <a href="">Classic</a>
          </div>
          <div className={navbarStyles.linkContainer}>
            <a href="">Solver</a>
          </div>
        </div>
      </header>
      <nav className={`${navbarStyles.navbar} ${navbarStyles.navbar2}`}>
        <div className={navbarStyles.linkContainer}>
          <a href="">Tournament</a>
        </div>
        <div className={navbarStyles.linkContainer}>
          <a href="">Daily Challenge</a>
        </div>
        <div className={navbarStyles.linkContainer}>
          <a href="">Rules</a>
        </div>
        <div className={navbarStyles.linkContainer}>
          <a href="">Profile</a>
        </div>
      </nav>
    </navbar>
  );
}
