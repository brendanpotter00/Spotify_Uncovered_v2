import React from "react";
import { loginUrl } from "./spotify";
import { deployedLoginUrl } from "./spotify";
import "./login.css";
import Button from "@mui/material/Button";

// gets the user's login token for their spotify
function Login() {
  return (
    <div className="login">
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
        alt="Spotify Logo"
      />

      <Button variant="contained" href={deployedLoginUrl} color="primary">
        login with spotify
      </Button>

      <button className="spotify-button">
        <a href={loginUrl}>Login for testing</a>
      </button>
    </div>
  );
}

export default Login;
