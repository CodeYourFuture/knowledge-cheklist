import React, { useEffect, useState }  from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  NavLink,
} from "react-router-dom";

import EditBox from "../components/EditBox";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { skills, skillLabel } from "../components/consts/skillsConst";

export default function MentorsEditLearningObj() {
   let history = useHistory();
  useEffect(() => {
    fetch(`/api/verify`)
      .then((res) => {
        if (res.status !== 200) {
          history.push("/");
        }
        return res.json();
      })
      .then((data) => {
        if (data == "not authorized" || data.role == "Student") {
          history.push("/");
        }
      })
      .catch((error) => console.log(error));
  }, []);
  let back = "Students Progress";

  return (
    <Router>
      <Header back={back} />
      <div className="mentorsedit-page"></div>

      <div className="edit-display-container">
        <div className="skillNav-display ">
          <ul>
            {skills.map((skill, index) => (
              <li key={index}>
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
