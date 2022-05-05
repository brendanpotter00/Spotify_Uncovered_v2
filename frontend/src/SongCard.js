import React from "react";
import "./songCard.css";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
function setText(txt) {}

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
            <Typography sx={{ typography: { xs: "h3", sm: "h4" } }}>
              {trackInfo.name}
            </Typography>
          </div>
          <div class="songArtist">
            <Typography sx={{ typography: { xs: "h4", sm: "h5" } }}>
              {trackInfo.artists}
            </Typography>
          </div>
        </div>

        <div class="songMetrics">
          <div class="metric">
            <div class="statName">
              <Typography sx={{ typography: { xs: "h4", sm: "h5" } }}>
                {"Energy: "}
              </Typography>
            </div>
            <div class="stat">
              <Typography sx={{ typography: { xs: "h4", sm: "h5" } }}>
                {trackInfo.energy}
              </Typography>
            </div>
          </div>

          <div class="metric">
            <div class="statName">
              <Typography sx={{ typography: { xs: "h4", sm: "h5" } }}>
                {"Danceability: "}
              </Typography>
            </div>
            <div class="stat">
              <Typography sx={{ typography: { xs: "h4", sm: "h5" } }}>
                {trackInfo.danceability}
              </Typography>
            </div>
          </div>

          <div class="metric">
            <div class="statName">
              <Typography sx={{ typography: { xs: "h4", sm: "h5" } }}>
                {"Happiness: "}
              </Typography>
            </div>
            <div class="stat">
              <Typography sx={{ typography: { xs: "h4", sm: "h5" } }}>
                {trackInfo.valence}
              </Typography>
            </div>
          </div>
          {/* <div class="rank">1</div> */}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default SongCard;
