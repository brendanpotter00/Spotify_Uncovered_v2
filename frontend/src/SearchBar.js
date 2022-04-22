import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import { TrackAnalysis, UserTracks } from "react-spotify-api";
import "./dashboard.css";
import Card from "./Card.js";
import BasicTable from "./BasicTable.js";
import StatGauge from "./StatGauge";
import CardList from "./CardList";
import { Input, List, Avatar } from "antd";

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

function SearchBar({ props }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFts, setSearchFts] = useState([]);

  const spotify = props.spotify;

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  function getUnique(arr, comp) {
    const unique = arr.map((e) => e[comp]);
  }

  useEffect(() => {
    const searchResults = spotify
      .searchTracks(searchTerm, { limit: 1, offset: 2 })
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
              img: track.album.images[0].url,
            };
            setSearchFts((searchFts) => [...searchFts, temp]);
            //=============================================================================
            // searchFts;
            // console.log("HERERERE" + JSON.stringify(searchFts));
            // searchFts = searchFts.filter((searchFt, index) => {
            //   const temp2 = JSON.stringify(value);
            // });

            var stringObj = JSON.stringify(searchFts);
            // var clean = stringObj.filter(
            //   (stringObj, index, self) =>
            //     index === self.findIndex((t) => t.id === stringObj.id)
            // );

            // console.log(clean);

            const uniqueArray = searchFts.filter((value, index) => {
              const _value = JSON.stringify(value);
              return (
                index ===
                searchFts.findIndex((obj) => {
                  return JSON.stringify(obj) === _value;
                })
              );
            });
            //setSearchFts(uniqueArray);

            // setSearchFts(
            //   (searchFts = searchFts.filter(
            //     (value, index, self) =>
            //       index === self.findIndex((t) => t.id === value.id)
            //   ))
            // );

            //WORKS
            //setSearchFts((searchFts) => [...searchFts, temp]);
            //setSearchFts([...new Set((searchFts) => [...searchFts, temp])]);
            //=============================================================================
            console.log(searchFts);
          });
        });
      });
  }, [searchTerm]);

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
              onSearch={(value) => console.log(value)}
              //onRequestSearch={searchTracksFunction(search)}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default SearchBar;
