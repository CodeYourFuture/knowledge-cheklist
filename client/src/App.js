import React, {  useState } from "react";


import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import SkillsNav from "./Pages/SkillsNav";
import Modal from "./components/Modal";
import MentorsView from "./Pages/MentorsView";
import MentorsEditLearningObj from "./Pages/MentorsEditLearningObj";

export function App() {

  return (
    <BrowserRouter>
      <main role="main">
        <div>
          <Switch>
            <Route exact path="/" component={LoginForm} />
            <Route path="/signup" component={SignupForm} />

            <Route path="/skills" component={SkillsNav} />

            <Route path="/MentorsView" component={MentorsView} />
            <Route
              path="/MentorsEditLearningObj/:id?"
              component={MentorsEditLearningObj}
            />
          </Switch>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
