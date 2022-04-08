import React from "react";
import { loginUrl } from "./spotify";
import "./login.css";

function Login() {
  return (
    <div className="login">
      I am the login button
      <button className="spotify-button">
        <a href={loginUrl}>Login</a>
      </button>
    </div>
  );
}

export default Login;
