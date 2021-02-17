import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
export default function Header({ editLearningObjectives, logout, back }) {
  let location = useLocation();

  let logoLink = "";

  if (location.pathname.includes("skills")) {
    logoLink = "/skills";
  } else if (location.pathname.includes("Mentors")) {
    logoLink = "/MentorsView";
  }

  return (
    <div className="header">
      <a href={logoLink} className="header-img">
        <img
          src="https://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png"
          alt="code your future"
          className="header-img"
        ></img>
      </a>

      <h3>{editLearningObjectives}</h3>

      <a href="/MentorsView">
        <h3 className="signup-link">{back}</h3>
      </a>
      {logout}
    </div>
  );
}
