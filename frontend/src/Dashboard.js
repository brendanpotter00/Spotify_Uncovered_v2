import react, { useState } from "react";
import axios from "axios";
import { UserTracks } from "react-spotify-api";
import "./dashboard.css";
import Card from "./Card.js";
import StatGauge from "./StatGauge";
import CardList from "./CardList";

function Dashboard({ props }) {
  //console.log("USER IN DASH", spotify);
  const topTrackEndpoint = "https://api.spotify.com/v1/me/top/tracks";
  const spotify = props.spotify;
  const token = props.token;
  const [data, setData] = useState([]);
  //separation
  const [topTracks, setTopTracks] = useState([]);
  const [topTracksNames, setTopTracksNames] = useState([]);
  //const [topArtists, setTopArtists] = useState([]);

  //doesnt do much but should be what 2 is
  //1
  spotify.getMyTopTracks().then(
    (artists) => {
      setTopTracks((prevEntries) => {
        return [artists.items, ...prevEntries];
      });
    },
    (err) => {
      console.log("Error:", err);
    },
    (err) => {
      console.log("Error:", err);
    }
  );

  //gets the aritsts in the console but needs to set varible to display useState
  //2
  let topArtists;

  spotify.getMyTopArtists().then(
    (artists) => {
      topArtists = artists.items;
      console.log(topArtists);
    },
    (err) => {
      console.log("Error:", err);
    }
  );

  //3
  //trying to use axios to get it but has to use server to server communication not frontend
  const handleTopTracks = () => {
    axios
      .get(topTrackEndpoint, {
        headers: {
          Authorization: "Bearer" + token,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  //html code below to display
  return (
    <div className="dashboard_container">
      I am the dashboard and the user is logged in
      <button onClick={handleTopTracks}> display top tracks</button>
      {data?.items ? (
        data.item.map((item) => <p>{item.name}</p>)
      ) : (
        <p>dashbaord: red / card and cardlist: green</p>
      )}
      <StatGauge />
      <CardList />
    </div>
  );
}

export default Dashboard;
