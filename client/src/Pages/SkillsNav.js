import React, { useEffect, useState } from "react";
import SkillTracker from "./SkillsTracker";
import { useHistory, Route, NavLink } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { skills, skillLabel } from "../components/consts/skillsConst";

export default function SkillsNav() {
  let history = useHistory();
  const [userName, setUserName] = useState({});
  useEffect(() => {
    fetch(`/api/verify`)
      .then((res) => {
        if (res.status !== 200) {
          history.push("/");
        }
        return res.json();
      })
      .then((data) => {
        window.localStorage.setItem("role", data.role);
        window.localStorage.setItem("name", data.name);
        if (data == "not authorized" || data.role == "Mentor") {
          history.push("/");
        }
      });
  }, []);
 

  return (
    <div className="skillsnav-page">
      <div>
        <Header />
      </div>
      <h1 className="welcome-msg">
        Welcome {window.localStorage.getItem("name")}
      </h1>
      <div className="skills-main-container">
        <div className="skills-container">
          {skills.map((skill) => (
            <NavLink
              to={`/skills/${skill}`}
              activeClassName="active-skill-display"
              className="default-skill-display"
            >
              {skillLabel(skill)}
            </NavLink>
          ))}
        </div>

        <div>
          {skills.map((skill) => (
          
            <Route
              path={`/skills/${skill}`}
              component={() => <SkillTracker skill={skill} />}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
