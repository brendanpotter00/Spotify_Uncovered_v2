import React from "react";
import { loginUrl } from "./spotify";
import { deployedLoginUrl } from "./spotify";
import "./login.css";

function Login() {
  console.log(window.location.href);
  return (
    <div className="login">
      <img src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt=""/>

      {/*{window.location.href == "http://localhost:3000/Spotify_Uncovered_v2" ? (
        <button className="spotify-button">
          <a href={loginUrl}>Login for testing</a>
        </button>
      ) : (
  
        <a href={deployedLoginUrl}>login with spotify</a>
  
      )}
      */}

      <a href={deployedLoginUrl}>login with spotify</a>

      <button className="spotify-button">
        <a href={loginUrl}>Login for testing</a>
      </button>
    </div>
  );
}

export default Login;
