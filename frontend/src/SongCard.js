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
            <Typography variant="h4">{trackInfo.name}</Typography>
          </div>
          <div class="songArtist">
            <Typography variant="h5">{trackInfo.artists}</Typography>
          </div>
        </div>

        <div class="songMetrics">
          <div class="metric">
            <div class="statName">
              <Typography variant="h5">{"Energy: "}</Typography>
            </div>
            <div class="stat">
              <Typography variant="h5">{trackInfo.energy}</Typography>
            </div>
          </div>

          <div class="metric">
            <div class="statName">
              <Typography variant="h5">{"Danceability: "}</Typography>
            </div>
            <div class="stat">
              <Typography variant="h5">{trackInfo.danceability}</Typography>
            </div>
          </div>

          <div class="metric">
            <div class="statName">
              <Typography variant="h5">{"Happiness: "}</Typography>
            </div>
            <div class="stat">
              <Typography variant="h5">{trackInfo.valence}</Typography>
            </div>
          </div>
          {/* <div class="rank">1</div> */}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default SongCard;
