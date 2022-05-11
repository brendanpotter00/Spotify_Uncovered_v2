import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { buildStyles } from "react-circular-progressbar";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import "./statGauge.css";
import "react-circular-progressbar/dist/styles.css";
import Phrases from "./Phrases";
import Typography from "@mui/material/Typography";

const percentage = 66;
function StatGauge({ props }) {
  function percentDifference(a, b) {
    return Math.abs(a - b) / ((a + b) / 2);
  }

  // weightedAvgs goes through the values for a certain stat and uses the percent difference between the number
  // and 50 to create weights that get multiplied by the value so that the stats are a bit more spread out and more accurate
  function weightedAvgs(metrics) {
    let weights = metrics.map((n) => percentDifference(50, n));
    const [sum, weightSum] = weights.reduce(
      (acc, w, i) => {
        acc[0] = acc[0] + metrics[i] * w;
        acc[1] = acc[1] + w;
        return acc;
      },
      [0, 0]
    );
    return Math.round(sum / weightSum);
  }

  //getting all energies, loudnesses, and valences in arrays
  let allEnergies = [];
  let allValences = [];
  let allDancies = [];
  for (let track of props) {
    allEnergies.push(track.energy);
    allValences.push(track.valence);
    allDancies.push(track.danceability);
  }

  //getting the weighted avgerages of all metrics to place in the bars
  let energyAvg = weightedAvgs(allEnergies);
  let valenceAvg = weightedAvgs(allValences);
  let danceAvg = weightedAvgs(allDancies);

  // sends the weighted avgs to the phrase component to determine the phrase the user gets
  let phraseProps = {
    energy: energyAvg,
    valence: valenceAvg,
    dance: danceAvg,
  };

  return (
    <div>
      <div className="bars">
        <div className="firstbar">
          <CircularProgressbar
            className="circleBar"
            value={energyAvg}
            text={`${energyAvg}`}
            background
            backgroundPadding={6}
            styles={buildStyles({
              rotation: 1,
              strokeLinecap: "round",
              textSize: "1.8rem",
              pathTransitionDuration: 0.5,
              backgroundColor: "#FDA766",
              textColor: "#fff",
              pathColor: "#fff",
              trailColor: "transparent",
            })}
          />
          <Typography
            sx={{
              padding: 1,
              typography: { xs: "Subtitle2", sm: "h5", md: "h4" },
            }}
          >
            Energy
          </Typography>
        </div>
        <div className="secondbar">
          <CircularProgressbar
            className="circleBar"
            value={valenceAvg}
            text={`${valenceAvg}`}
            background
            backgroundPadding={6}
            styles={buildStyles({
              rotation: 1,
              strokeLinecap: "round",
              textSize: "1.8rem",
              pathTransitionDuration: 0.5,
              backgroundColor: "#FD9346",
              textColor: "#fff",
              pathColor: "#fff",
              trailColor: "transparent",
            })}
          />
          <Typography
            sx={{
              padding: 1,
              typography: { xs: "Subtitle2", sm: "h5", md: "h4" },
            }}
          >
            Happiness
          </Typography>
        </div>
        <div className="thirdbar">
          <CircularProgressbar
            className="circleBar"
            value={danceAvg}
            text={`${danceAvg}`}
            background
            backgroundPadding={6}
            styles={buildStyles({
              rotation: 1,
              strokeLinecap: "round",
              textSize: "1.8rem",
              pathTransitionDuration: 0.5,
              backgroundColor: "#FD7F2C",
              textColor: "#fff",
              pathColor: "#fff",
              trailColor: "transparent",
            })}
          />
          <Typography
            sx={{
              padding: 1,
              typography: { xs: "Subtitle2", sm: "h5", md: "h4" },
            }}
          >
            Danceability
          </Typography>
        </div>
      </div>
      <Phrases props={phraseProps} />
    </div>
  );
}

export default StatGauge;
