import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { buildStyles } from "react-circular-progressbar";
import "./statGauge.css";
import "react-circular-progressbar/dist/styles.css";

const percentage = 66;
function StatGauge({ props }) {

  //props[0].valence;
  //console.log(props[0].valence);

  function avgForMetrics(metrics) {
    return Math.round(metrics.reduce((a, b) => a + b, 0) / metrics.length);
  }

  //getting all energies, loudnesses, and valences in arrays
  let allEnergies = [];
  let allValences = [];
  let allLoudnesses = [];
  for (let track of props) {
    allEnergies.push(track.energy);
    allValences.push(track.valence);
    allLoudnesses.push(track.loudness);
  }

  //getting avgerages of all metrics to place in the bars
  let energyAvg = avgForMetrics(allEnergies);
  let valenceAvg = avgForMetrics(allValences);
  let loudnessAvg = avgForMetrics(allLoudnesses);

  return (
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
        <h3> Energy </h3>
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

        <h3> Happiness </h3>

      </div>
      <div className="thirdbar">
        <CircularProgressbar
          className="circleBar"
          value={loudnessAvg}
          text={`${loudnessAvg}`}
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
        <h3> Loudness </h3>
      </div>
    </div>
  );
}

export default StatGauge;
