import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import { TrackAnalysis, UserTracks } from "react-spotify-api";
import "./dashboard.css";

import BasicTable from "./BasicTable.js";
import StatGauge from "./StatGauge";
import CardList from "./CardList";
//import { Input, List, Avatar } from "antd";

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

function SearchBar({ props }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFts, setSearchFts] = useState([]);
  const [top, setTop] = useState([]);

  const spotify = props.spotify;

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    setSearchFts([]);

    const searchResults = spotify
      .searchTracks(searchTerm, { limit: 3, offset: 1 })
      .then((results) => {
        let resultFts = results.tracks.items.map((track) => {
          spotify.getAudioFeaturesForTrack(track.id).then((info) => {
            let temp = {
              id: track.id,
              name: track.name,
              artists: track.artists[0].name,
              energy: info.energy,
              loudness: info.loudness,
              valence: info.valence,
              danceability: calculateDance(info.tempo, info.energy,info.valence), 
              img: track.album.images[0].url,
            };
            
            setSearchFts((searchFts) => [...searchFts, temp]);

            // if (!ids.includes(temp.id)) {
            //   setSearchFts((searchFts) => [...searchFts, temp]);
            // }

          

            // if (filtered.length >= 3) {
            //   setSearchFts(filtered);
            // }
            // let top3 = searchFts.slice(-3);
            // console.log(top3);

            console.log(searchFts);
          });
        });
      });
  }, [searchTerm]);

  let html = [];

  for (let track of searchFts) {
    const ret = (
      <div class="top20Row">
        <div class="top20Img">
          <img src={track.img} alt={"Song Cover for" + track.name} />
        </div>
        <div class="songInfo">
          <div class="songName">{track.name}</div>
          <div class="songArtist">{track.artists}</div>
        </div>

        <div class="songMetrics">
          <div class="metric">
            <div class="stringName">{"Energy: "}</div>
            <div class="stat">{track.energy}</div>
          </div>

          <div class="metric">
            <div class="stringName">{"Dance: "}</div>
            <div class="stat">{track.danceability}</div>
          </div>

          <div class="metric">
            <div class="stringName">{"Happiness: "}</div>
            <div class="stat">{track.valence}</div>
          </div>
          {/* <div class="rank">1</div> */}
        </div>
      </div>
    );
    html.push(ret);
  }

  return (
    <div>
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
              onChange={handleChange}
              value={searchTerm}
              //onChange={(value) => this.getSearchResults(value.target.value)}
              //onSearch={(value) => console.log(value)}
              //onRequestSearch={searchTracksFunction(search)}
            />
          </Search>
        </Toolbar>
      </AppBar>

      <div className="searchResultsContainer">
        <div class="topResults">{html}</div>
      </div>
    </div>
  );
}

export default SearchBar;
