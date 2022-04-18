import "./App.css";
import Login from "./Login.js";
import Dashboard from "./Dashboard.js";
// import React, { useEffect, useState } from "react";
import { getTokenFromResponse } from "./spotify.js";
import SpotifyWebApi from "spotify-web-api-js";

import * as React from "react";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  palette: {
    primary: {
      light: "#DF7C52",
      main: "#d85c27",
      dark: "#97401B",
      contrastText: "#fff",
    },
    secondary: {
      light: "#587CA5",
      main: "#2f5c8f",
      dark: "#204064",
      contrastText: "#fff",
    },
  },
});

const spotify = new SpotifyWebApi();

function App() {
  const [token, setToken] = React.useState(null);
  const [user, setUser] = React.useState(null);

  //This function sets the access token and gets the user with the access code given from the spotify api
  React.useEffect(() => {
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
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          {token ? <Dashboard props={props} /> : <Login />}
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
