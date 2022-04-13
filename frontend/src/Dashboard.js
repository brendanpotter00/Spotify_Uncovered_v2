import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserTracks } from "react-spotify-api";
import "./dashboard.css";
import Card from "./Card.js";
import StatGauge from "./StatGauge";
import CardList from "./CardList";
import { getTopTracks } from "./spotify.js";

function Dashboard({ props }) {
  //console.log("USER IN DASH", spotify);
  const topTrackEndpoint = "https://api.spotify.com/v1/me/top/tracks";
  const spotify = props.spotify;
  const token = props.token;
  const [data, setData] = useState([]);
  //separation
  //const [topTracks, setTopTracks] = useState([]);
  const [topTracksNames, setTopTracksNames] = useState([]);
  const [tracks, setTracks] = useState([]);

  let globalTracks = [];
  useEffect(() => {
    spotify.getMyTopTracks().then(
      (artists) => {
        globalTracks = artists.items;
        setTracks(globalTracks);
      },
      (err) => {
        console.log("Error:", err);
      }
    );
  }, []);

  console.log("this");
  console.log(tracks);

  const itemRows = [];
  for (let item of tracks) {
    const row = (
      <tr>
        <td>{item.name}</td>
        <td>{item.popularity}</td>
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
