import SpotifyWebApi from "spotify-web-api-js";
export const authEndpoint = "https://accounts.spotify.com/authorize";
// Replace with your app's client ID, redirect URI and desired scopes
const clientId_test = "c4cbffae207c414eb633445b69de2543";
const redirectUri_test = "http://localhost:3000/";
const redirectUri_deployed =
  "https://brendanpotter00.github.io/Spotify_Uncovered_v2/";
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

// Gets and parses the token from the response from spotify
export const getTokenFromResponse = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

//URLS that are used to redirect after authorization from spotify
export const deployedLoginUrl = `${authEndpoint}?client_id=${clientId_test}&redirect_uri=${redirectUri_deployed}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

export const loginUrl = `${authEndpoint}?client_id=${clientId_test}&redirect_uri=${redirectUri_test}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
