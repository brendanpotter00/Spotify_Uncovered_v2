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
  const [audioFeatures, setAudioFeatures] = useState([]);
  const [trackFeatures, setTrackFeatures] = useState([]);

  let features = {
    name: "",
    id: "",
    album: "",
    danceability: "",
    artist: "",
    energy: "",
  };

  let listProps = [];

  useEffect(() => {
    spotify.getMyTopTracks().then(
      (tracks) => {
        setTracks(tracks.items);
        // for (let track of tracks) {
        //   let temp = {
        //     name: track.name,
        //     id: track.id,
        //     artist: track.artist,
        //   };
        //   listProps.push(temp);
        // }
      },
      (err) => {
        console.log("Error:", err);
      }
    );
  }, []);

  //create an item then map it to a card in typescript
  const itemRows = [];
  for (let item of tracks) {
    const row = (
      <tr>
        <td>{item.name}</td>
        <td>{item.popularity}</td>
        <td>{item.artists[0].name}</td>
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
