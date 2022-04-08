export const authEndpoint = "https://accounts.spotify.com/authorize";
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "c4cbffae207c414eb633445b69de2543";
const redirectUri = "http://localhost:3000/";
const deployedRedirectUri =
  "https://brendanpotter00.github.io/Spotify_Uncovered_v2/";
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

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

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${deployedRedirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
