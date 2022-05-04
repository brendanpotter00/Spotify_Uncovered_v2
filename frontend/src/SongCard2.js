import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

export default function SongCard2({ trackInfo }) {
  return (
    //Change to row??
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Card sx={{ display: "flex", borderRadius: 30, boxShadow: 20 }}>
        <CardMedia
          component="img"
          sx={{ width: 151, borderRadius: 50, padding: 2 }}
          image={trackInfo.img}
          alt={trackInfo.name + "album cover"}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flexGrow: "0" }}>
            <Typography component="div" variant="h4">
              {trackInfo.name}
            </Typography>
            <Typography variant="h6" color="text.secondary" component="div">
              {trackInfo.artists}
            </Typography>
          </CardContent>
          <Box
            sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
          ></Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography
              variant="h5"
              color="text.default"
              component="div"
              alignSelf="flex-end"
            >
              {"Energy: " + trackInfo.energy}
            </Typography>
            <Typography
              variant="h5"
              color="text.default"
              component="div"
              alignSelf="flex-end"
            >
              {"Danceability: " + trackInfo.danceability}
            </Typography>
            <Typography
              variant="h5"
              color="text.default"
              component="div"
              alignSelf="flex-end"
            >
              {"Happiness: " + trackInfo.valence}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
      
          </CardContent>
          <Box
            sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
          ></Box>
        </Box>
      </Card>
    </Box>
  );
}
