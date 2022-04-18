import React from "react";
import { loginUrl } from "./spotify";
import { deployedLoginUrl } from "./spotify";
import "./login.css";
import Button from "@mui/material/Button";

function Login() {
  console.log(window.location.href);
  return (
    <div className="login">
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
        alt="Spotify Logo"
      />
      {/* <img src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt=""/> */}

      <Button variant="contained" href={deployedLoginUrl} color="primary">
        login with spotify
      </Button>
      {/* <a href={deployedLoginUrl}>login with spotify</a> */}

      <button className="spotify-button">
        <a href={loginUrl}>Login for testing</a>
      </button>
    </div>
  );
}

export default Login;
