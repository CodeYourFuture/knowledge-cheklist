import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import EditBox from "../components/EditBox";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { skills, skillLabel } from "../components/consts/skillsConst";

export default function MentorsEditLearningObj() {
  let back = "Students Progress";
  let logout = (
    <a href="/">
      <img
        src="https://www.flaticon.com/svg/static/icons/svg/159/159707.svg"
        alt="logout"
        className="logout-img"
      ></img>
    </a>
  );
  return (
    <Router>
      <Header logout={logout} back={back} />
      <div className="mentorsedit-page"></div>

      <div className="edit-display-container">
        <div className="skillNav-display ">
          <ul>
            {skills.map((skill) => (
              <li>
                <NavLink
                  to={`/MentorsEditLearningObj/${skill}`}
                  activeClassName="active-skill-display"
                  className="default-skill-display"
                >
                  {skillLabel(skill)}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <Switch>
          <Route path="/MentorsEditLearningObj/:id" children={<EditBox />} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}
