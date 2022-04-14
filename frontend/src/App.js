import "./App.css";
import Login from "./Login.js";
import Dashboard from "./Dashboard.js";
import React, { useEffect, useState } from "react";
import { getTokenFromResponse } from "./spotify.js";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  //This function sets the access token and gets the user with the access code given from the spotify api
  useEffect(() => {
    //code...
    const hash = getTokenFromResponse();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);

      spotify.setAccessToken(_token);
      //grabbing the user
      spotify.getMe().then((user) => {
        //console.log("USER", user);
        setUser(user);
      });
    }

    //console.log("i have a token", token);
  }, []);

  let props = {
    spotify: spotify,
    token: token,
  };

  return (
    <div className="App">
      <header className="App-header">
        <code>Spotify uncovered</code>
        {token ? <Dashboard props={props} /> : <Login />}
      </header>
    </div>
  );
}

export default App;
