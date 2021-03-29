import React, { useState, useEffect } from "react";
import { Container, btn } from "react-bootstrap";
import Footer from "./Footer";
import Header from "./Header";
import LoginImage from "../login-image.jpg";
import "../App.css";
const { REACT_APP_GITHUB_CLIENT_ID } = process.env;
const githubCallBackLink = `https://github.com/login/oauth/authorize?client_id=${REACT_APP_GITHUB_CLIENT_ID}`;

export default function LoginForm() {
  const [clientId, setClientId] = useState(null);

  const getClientId = () => {
    fetch("/api/github-client-id")
      .then((res) => res.json())
      .then((data) => {
        setClientId(data.github_client_id);
      });
  };

  useEffect(getClientId, []);

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
        <div className="signup-prompt ">
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${clientId}`}
            className="register text-white btn btn-dark   text-center "
          >
            <i class="fab fa-github"></i> Sign in with Github
          </a>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
