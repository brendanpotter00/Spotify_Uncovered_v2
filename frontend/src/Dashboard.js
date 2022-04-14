import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrackAnalysis, UserTracks } from "react-spotify-api";
import "./dashboard.css";
import Card from "./Card.js";
import StatGauge from "./StatGauge";
import CardList from "./CardList";

function Dashboard({ props }) {
  const spotify = props.spotify;
  const [tracks, setTracks] = useState([]);
  const [fts, setFts] = useState([]); 

  useEffect(() => {
    spotify.getMyTopTracks().then(
      (tracks) => {
        let trackFts = tracks.items.map((track) => {
          spotify.getAudioFeaturesForTrack(track.id).then(results => {
            let temp = {
              id: track.id, 
              name: track.name, 
              artists: track.artists[0].name, 
              energy: results.energy 
            }
            setTracks(tracks => [...tracks, temp])
          })
        });
      }
      ,
      (err) => {
        console.log("Error:", err);
      }
    );
  }, []);

  const itemRows = [];

  for (let item of tracks) {
    const row = (
      <tr>
        <td>{item.name}</td>
        <td>{item.pop}</td>
        <td>{item.artists}</td>
        <td>{item.energy}</td>
      </tr>
    );
    itemRows.push(row);
  }

  //html code below to display
  return (
    <div className="dashboard_container">
      I am the dashboard and the user is logged in
      <p>dashbaord: red / card and cardlist: green</p>
      <div className="work">
        <table>
          <tbody>{itemRows}</tbody>
        </table>
      </div>
      <StatGauge />
      <CardList />
    </div>
  );
}

export default Dashboard;
