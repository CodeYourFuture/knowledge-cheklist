import React from "react";

export default function Header({ editLearningObjectives, logout, back }) {
  return (
    <div className="header">
      <img
        src="https://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png"
        alt="code your future"
        className="header-img"
      ></img>

      <h3>{editLearningObjectives}</h3>

      <a href="/MentorsView">
        <h3 className="signup-link">{back}</h3>
      </a>
      {logout}
    </div>
  );
}
