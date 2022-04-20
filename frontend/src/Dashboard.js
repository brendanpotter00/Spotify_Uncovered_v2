import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrackAnalysis, UserTracks } from "react-spotify-api";
import "./dashboard.css";
import Card from "./Card.js";
import BasicTable from "./BasicTable.js";
import StatGauge from "./StatGauge";
import CardList from "./CardList";
//=======================================================================

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Dashboard({ props }) {
  const spotify = props.spotify;
  const [tracks, setTracks] = useState([]);
  const [fts, setFts] = useState([]);
  const [exp, setExp] = useState([]);

  //FUNCTION CREATION HERE===============================================
  // valence: float 0-1
  // loudness: float 0-60 DB
  // energy: float 0-1

  useEffect(() => {
    spotify.getMyTopTracks().then(
      (tracks) => {
        let trackFts = tracks.items.map((track) => {
          //console.log(track.album.images[0].url);
          spotify.getAudioFeaturesForTrack(track.id).then((results) => {
            let temp = {
              id: track.id,
              name: track.name,
              artists: track.artists[0].name,
              energy: results.energy,
              loudness: results.loudness,
              //remove acoutstic
              acousticness: results.acousticness,
              valence: results.valence,
              img: track.album.images[0].url,
            };
            console.log(temp);
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
  const trackInfo = [];
  const divRowsFor20MostListened = [];
  //variables for 1-10 metric transformation===================================
  let transformedEnergy = 0;
  let transformedValence = 0;
  let transformedLoudness = 0;

  for (let item of tracks) {
    //FUNCTION FOR TRANSFORMING METRICS FOR CARDS HERE=============================
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
            <div class="stat">{item.valence}</div>
          </div>
        </div>
      </div>
    );
    divRowsFor20MostListened.push(row);

    //FUNCTION FOR FINDING METRIC AVGS=============================
    //below probably goes inside function
    let trackInfoTemp = {
      name: item.name,
      artists: item.artists,
      energy: item.energy,
      loudness: item.loudness,
      valence: item.valence,
      img: item.img,
    };
    trackInfo.push(trackInfoTemp);
  }

  return (
    <div className="dashboard_container">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              spotify uncovered
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      <StatGauge props={trackInfo} />

      <div class="top20Table">{divRowsFor20MostListened}</div>
      {/* <BasicTable props={trackInfo} /> */}

      {/* <CardList /> */}
    </div>
  );
}

export default Dashboard;
