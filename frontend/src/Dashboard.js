import React, { useEffect, useState, Component } from "react";
import "./dashboard.css";
import SongCard from "./SongCard.js";
import StatGauge from "./StatGauge";
import SearchBar from "./SearchBar.js";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import PacmanLoader from "react-spinners/PacmanLoader";
import BarLoader from "react-spinners/BarLoader";

function Dashboard({ props }) {
  const spotify = props.spotify;
  const [tracks, setTracks] = useState([]);

  const [loading, setLoading] = React.useState(true);

  //FUNCTION CREATION HERE===============================================
  // valence: float 0-1
  // loudness: float 0-60 DB
  // energy: float 0-1
  //https://developer.spotify.com/documentation/web-api/reference/#/operations/get-audio-features

  //Turning a float into a two-digit int
  function intForZeroToOne(metric) {
    return Math.round(metric * 100);
  }

  // On component mount this gets the user's top 20 tracks from the spotify api
  // and the stats we use for them and sets this info to trackList
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    let trackList = [];
    spotify.getMyTopTracks().then(
      (tracks) => {
        let trackFts = tracks.items.map((track) => {
          spotify.getAudioFeaturesForTrack(track.id).then((results) => {
            let temp = {
              id: track.id,
              name: track.name,
              artists: track.artists[0].name,
              energy: intForZeroToOne(results.energy),
              valence: intForZeroToOne(results.valence),
              danceability: intForZeroToOne(results.danceability),
              img: track.album.images[0].url,
            };
            setTracks((tracks) => [...tracks, temp]);
          });
        });
      },
      (err) => {
        console.log("Error:", err);
      }
    );
  }, []);

  return (
    <div className="loading">
      {loading ? (
        <div className="loadBar">
          <BarLoader
            height={5}
            width={300}
            color={"#FD9346"}
            loading={loading}
          />
          <h3 className="text"> Analyzing Data</h3>
        </div>
      ) : (
        <div className="dashboard_container">
          <SearchBar props={props}></SearchBar>
          <StatGauge props={tracks} />
          <Box sx={{ width: "100%" }}>
            <div class="top20Table">
              <Stack spacing={2}>
                {tracks.map((track) => (
                  <SongCard trackInfo={track}></SongCard>
                ))}
              </Stack>
            </div>
          </Box>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
