import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrackAnalysis, UserTracks } from "react-spotify-api";
import "./dashboard.css";
import Card from "./Card.js";
import BasicTable from "./BasicTable.js";
import StatGauge from "./StatGauge";
import CardList from "./CardList";
//=======================================================================
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
//=======================================================================

function Dashboard({ props }) {
  const spotify = props.spotify;
  const [tracks, setTracks] = useState([]);
  const [fts, setFts] = useState([]);
  const [exp, setExp] = useState([]);

  useEffect(() => {
    spotify.getMyTopTracks().then(
      (tracks) => {
        let trackFts = tracks.items.map((track) => {
          console.log(track.album.images[0].url);
          spotify.getAudioFeaturesForTrack(track.id).then((results) => {
            let temp = {
              id: track.id,
              name: track.name,
              artists: track.artists[0].name,
              energy: results.energy,
              loudness: results.loudness,
              acousticness: results.acousticness,
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

  //create an item then map it to a card in typescript
  // const itemRows = [];
  const global = [];
  const divRowsFor20MostListened = [];
  for (let item of tracks) {
    const row = (
      <div class="top20Row">
        <div class="top20Img">
          <img src={item.img} alt={"Song Cover for" + item.name} />
        </div>
        <div class="songInfo">
          <div class="songName">{item.name}</div>
          <div class="songArtist">{item.artists}</div>
        </div>

        <div class="songMetrics">
          <div class="metric">
            <div class="stringName">{"Energy: "}</div>
            <div class="stat">{item.energy}</div>
          </div>

          <div class="metric">
            <div class="stringName">{"Loudness: "}</div>
            <div class="stat">{item.loudness}</div>
          </div>

          <div class="metric">
            <div class="stringName">{"Acousticness: "}</div>
            <div class="stat">{item.acousticness}</div>
          </div>
        </div>
      </div>
      // <tr>
      //   <td>{item.name}</td>
      //   <td>{item.pop}</td>
      //   <td>{item.artists}</td>
      //   <td>{item.energy}</td>
      //   <td>{item.loudness}</td>
      //   <td>{item.acousticness}</td>
      // </tr>
    );
    let temp = {
      name: item.name,
      artist: item.artists,
      energy: item.energy,
      loudness: item.loudness,
      acousticness: item.acousticness,
      img: item.img,
    };
    global.push(temp);
    divRowsFor20MostListened.push(row);
    //itemRows.push(row);
  }

  return (
    <div className="dashboard_container">
      <div class="top20Table">{divRowsFor20MostListened}</div>
      {/* {<BasicTable props={global} />} */}
      <StatGauge />
      <CardList />
    </div>
  );
}

export default Dashboard;
