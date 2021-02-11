import React, { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import Footer from "./Footer";
import Header from "./Header";
import LoginImage from "../login-image.jpg";
import useFormValidation from "./useFormValidation";
import "../App.css";
import loginValidation from "./loginValidation";
import {useHistory } from "react-router-dom";

export default function LoginForm() {
  let history = useHistory();
  const [serverError, setServerError] = useState("");
  const intialState = {
    userEmail: "",
    userPassword: "",
  };
  const {
    input,
    isValid,
  } = useFormValidation(loginValidation, intialState);

  useEffect(() => {
    if (isValid) {
      fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: input.userEmail,
          userPassword: input.userPassword,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            throw data;
          }

          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("user", data.id);
          window.localStorage.setItem("name", data.name);
          window.localStorage.setItem("role", data.role);
          let role = data.role;
          role === "Student"
            ? history.push("/skills")
            : history.push("/MentorsView");
        })
        .catch(({ error }) => setServerError(error));
    }
  }, [isValid]);

 

  return (
    <div className="login-container">
      <Header />
      <img
        src={LoginImage}
        alt="code your future"
        border="0"
        className="login-image"
      ></img>

      <Container className="main-container">
        <div className="signup-prompt">
          <em>Login with Github</em>

          <a
            href={`https://github.com/login/oauth/authorize?client_id=${process.env.github_client_id}`}
            className="register"
          >
            login/Signup
          </a>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
