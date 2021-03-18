import React from "react";
import { useLocation } from "react-router-dom";
export default function Header({ editLearningObjectives, back, logout }) {
  const location = useLocation();

  let logoLink = "";

  if (location.pathname.includes("skills")) {
    logoLink = "/skills";
  } else if (location.pathname.includes("Mentors")) {
    logoLink = "/MentorsView";
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="nav-link" href={logoLink}>
          <img
            src="https://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png"
            alt="code your future"
            className="header-img"
          ></img>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {back ? (
                <a className="student-progress" href="/MentorsView">
                  {back}
                </a>
              ) : (
                editLearningObjectives
              )}
            </li>
          </ul>
          {location.pathname !== "/" && (
            <a href="/api/logout">
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/159/159707.svg"
                alt="logout"
                className="logout-img"
              ></img>
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
