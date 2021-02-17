import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
export default function Header({ editLearningObjectives, logout, back }) {
  let location = useLocation();

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a href={logoLink}>
        <img
          src="https://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png"
          alt="code your future"
          className="header-img"
        ></img>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <h3>{editLearningObjectives}</h3>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
    // <div className="header">

    //   <a href="/MentorsView">
    //     <h3 className="signup-link">{back}</h3>
    //   </a>
    //   {logout}
    // </div>
  );
}
