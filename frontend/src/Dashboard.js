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

  for (let item of tracks) {
    const row = (
      <tr>
        <td>{item.name}</td>
        <td>{item.pop}</td>
        <td>{item.artists}</td>
        <td>{item.energy}</td>
        <td>{item.loudness}</td>
        <td>{item.acousticness}</td>
      </tr>
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

    //itemRows.push(row);
  }

  return (
    <div className="dashboard_container">
      I am the dashboard and the user is logged in
      <p>dashbaord: red / card and cardlist: green</p>
      {/* <div className="work">
        <table>
          <tbody>{itemRows}</tbody>
        </table>
      </div> */}
      <BasicTable props={global} />
      <StatGauge />
      <CardList />
    </div>
  );
}

export default Dashboard;
