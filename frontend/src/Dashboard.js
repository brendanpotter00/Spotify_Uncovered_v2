import React, { useEffect, useState, Component } from "react";
import "./dashboard.css";
import SongCard from "./SongCard.js";
import StatGauge from "./StatGauge";
import SearchBar from "./SearchBar.js";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

function Dashboard({ props }) {
  const spotify = props.spotify;
  const [tracks, setTracks] = useState([]);

  //FUNCTION CREATION HERE===============================================
  // valence: float 0-1
  // loudness: float 0-60 DB
  // energy: float 0-1
  //https://developer.spotify.com/documentation/web-api/reference/#/operations/get-audio-features

  function calculateDance(tempo,energy,happy) 
{ 
  energy = Math.round(energy * 100);
  happy = Math.round(happy * 100); 
  let diff =  Math.abs(130 - tempo); 
  let n =  (130 + tempo) / 2 ;
  let percentDiff = (diff/n) * 100; 

  let scale = ((100) - (percentDiff )) * (100 - 1) / ((100)- 1) + 1 ;  
  return Math.round(((1.1*energy) + ( .75 * scale) +(.90 * happy)) / 2.75); 

}
  function intForZeroToOne(metric) {
    return Math.round(metric * 100);
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
              energy: intForZeroToOne(results.energy),
              valence: intForZeroToOne(results.valence),
              danceability: intForZeroToOne(results.danceability),
              //danceability: calculateDance(results.tempo, results.energy,results.valence), 
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
  );
}

export default Dashboard;
