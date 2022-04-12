import React from "react";
import { loginUrl } from "./spotify";
import { deployedLoginUrl } from "./spotify";
import "./login.css";

function Login() {
  return (
    <div className="login">
      I am the login button
      <button className="spotify-button">
        <a href={loginUrl}>Login for testing</a>
      </button>
      <button className="spotify-button">
        <a href={deployedLoginUrl}>Login for deployment</a>
      </button>
    </div>
  );
}

export default Login;
