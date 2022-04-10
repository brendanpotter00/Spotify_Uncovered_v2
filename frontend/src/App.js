import "./App.css";
import Login from "./Login.js";
import Dashboard from "./Dashboard.js";
import React, { useEffect, useState } from "react";
import { getTokenFromResponse } from "./spotify.js";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

function App() {
  const [token, setToken] = useState(null);

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
        console.log("USER", user);
      });
    }

    console.log("i have a token", token);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <code>Spotify uncovered</code>
        {token ? <Dashboard /> : <Login />}
      </header>
    </div>
  );
}

export default App;
