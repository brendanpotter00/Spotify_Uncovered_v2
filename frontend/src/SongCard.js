import React from "react";
import "./songCard.css";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import Typography from "@mui/material/Typography";

let theme = createTheme();
theme = responsiveFontSizes(theme);

function SongCard({ trackInfo }) {
  return (
    <ThemeProvider theme={theme}>
      <div class="top20Row">
        <div class="top20Img">
          <img src={trackInfo.img} alt={"Song Cover for" + trackInfo.name} />
        </div>
        <div class="songInfo">
          <div class="songName">
            <Typography variant="h5">{trackInfo.name}</Typography>
          </div>
          <div class="songArtist">
            <Typography variant="h6">{trackInfo.artists}</Typography>
          </div>
        </div>

        <div class="songMetrics">
          <div class="metric">
            <div class="stringName">{"Energy: "}</div>
            <div class="stat">{trackInfo.energy}</div>
          </div>

          <div class="metric">
            <div class="stringName">{"Loudness: "}</div>
            <div class="stat">{trackInfo.loudness}</div>
          </div>

          <div class="metric">
            <div class="stringName">{"Happiness: "}</div>
            <div class="stat">{trackInfo.valence}</div>
          </div>
          {/* <div class="rank">1</div> */}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default SongCard;
