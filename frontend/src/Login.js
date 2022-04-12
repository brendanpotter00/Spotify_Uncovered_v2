import React from "react";
import { loginUrl } from "./spotify";
import { deployedLoginUrl } from "./spotify";
import "./login.css";

function Login() {
  console.log(window.location.href);
  return (
    <div className="login">
      I am the login button
      {window.location.href == "http://localhost:3000/Spotify_Uncovered_v2" ? (
        <button className="spotify-button">
          <a href={loginUrl}>Login for testing</a>
        </button>
      ) : (
        <button className="spotify-button">
          <a href={deployedLoginUrl}>Login for deployment</a>
        </button>
      )}
    </div>
  );
}

export default Login;
