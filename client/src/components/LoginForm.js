import React from "react";
import { Container} from "react-bootstrap";
import Footer from "./Footer";
import Header from "./Header";
import LoginImage from "../login-image.jpg";
import "../App.css";

export default function LoginForm() {
 
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
