import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrackAnalysis, UserTracks } from "react-spotify-api";
import "./dashboard.css";
import SongCard from "./SongCard.js";
import SearchBar from "./SearchBar.js";
import StatGauge from "./StatGauge";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";

function Dashboard({ props }) {
  const spotify = props.spotify;
  const [tracks, setTracks] = useState([]);
  const [search, setSearch] = useState("");

  //FUNCTION CREATION HERE===============================================
  // valence: float 0-1
  // loudness: float 0-60 DB
  // energy: float 0-1
  //https://developer.spotify.com/documentation/web-api/reference/#/operations/get-audio-features

  function intForZeroToOne(metric) {
    return Math.round(metric * 100);
  }

  function decibalToAudioIntensity(metric) {
    // let audioIntensity = 10 ** ((metric * -1) / 10 - 12);
    return 10 ** ((metric * -1) / 10 - 12);
  }
  function intForLoudness(metric) {
    let temp = Math.round(10 * (decibalToAudioIntensity(metric) * 10 ** 12));

    if (temp >= 100) {
      temp = 100;
    }
    return temp;
  }

  //function for searching tracks
  function searchTracksFunction(query) {
    return spotify.searchTracks(query, { limit: 1, offset: 2 });
  }

  useEffect(() => {
    let trackList = [];
    spotify.getMyTopTracks().then(
      (tracks) => {
        let trackFts = tracks.items.map((track) => {
          spotify.getAudioFeaturesForTrack(track.id).then((results) => {
            let temp = {
              id: track.id,
              name: track.name,
              artists: track.artists[0].name,
              energy: results.energy,
              loudness: results.loudness,
              acousticness: results.acousticness,
              valence: results.valence,
              dancibility: results.dancibility,
              instrumentalness: results.instrumentalness,
              img: track.album.images[0].url,
            };

            setTracks((tracks) => [...tracks, temp]);
            //console.log(tracks);
          });
        });
      },
      (err) => {
        console.log("Error:", err);
      }
    );
  }, []);
  //console.log(tracks);

  //create an item then map it to a card in typescript
  const trackInfo = [];
  const avgsForBars = [];
  const divRowsFor20MostListened = [];
  //variables for 1-10 metric transformation===================================
  let transformedEnergy = 0;
  let transformedValence = 0;
  let transformedLoudness = 0;

  let allEnergies = [];
  let allValences = [];
  let allLoudnesses = [];

  for (let item of tracks) {
    //FUNCTION FOR TRANSFORMING METRICS FOR CARDS HERE=============================
    transformedEnergy = intForZeroToOne(item.energy);
    transformedValence = intForZeroToOne(item.valence);
    transformedLoudness = intForLoudness(item.loudness);

    // divRowsFor20MostListened.push(row);
    allEnergies.push(transformedEnergy);
    allValences.push(transformedValence);

    //FUNCTION FOR FINDING METRIC AVGS=============================
    //below probably goes inside function
    let trackInfoTemp = {
      name: item.name,
      artists: item.artists,
      energy: transformedEnergy,
      loudness: transformedLoudness,
      valence: transformedValence,
      img: item.img,
    };
    trackInfo.push(trackInfoTemp);
  }

  return (
    <div className="dashboard_container">
      <SearchBar></SearchBar>
      <StatGauge props={trackInfo} />
      <Box sx={{ width: "100%" }}>
        <div class="top20Table">
          <Stack spacing={2}>
            {trackInfo.map((track) => (
              <SongCard trackInfo={track}></SongCard>
            ))}
          </Stack>
        </div>
      </Box>
    </div>
  );
}

export default Dashboard;
