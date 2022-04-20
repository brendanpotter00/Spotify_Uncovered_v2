import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { buildStyles } from "react-circular-progressbar";
import "./statGauge.css";
import "react-circular-progressbar/dist/styles.css";

const percentage = 66;
function StatGauge({ props }) {
  //console.log(props);
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
          value={energyAvg * 10}
          text={`${energyAvg}`}
          styles={buildStyles({
            rotation: 1,
            strokeLinecap: "round",
            textSize: "16px",
            pathTransitionDuration: 0.5,
            pathColor: `rgba(62, 152, 199, ${percentage / 10})`,
            textColor: "#f88",
            trailColor: "#d6d6d6",
            backgroundColor: "#3e98c7",
          })}
        />
        <h3> Energy </h3>
      </div>
      <div className="secondbar">
        <CircularProgressbar
          className="circleBar"
          value={valenceAvg * 10}
          text={`${valenceAvg}`}
          styles={buildStyles({
            rotation: 1,
            strokeLinecap: "round",
            textSize: "16px",
            pathTransitionDuration: 0.5,
            pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
            textColor: "#f88",
            trailColor: "#d6d6d6",
            backgroundColor: "#3e98c7",
          })}
        />
        <h3> Valence </h3>
      </div>
      <div className="thirdbar">
        <CircularProgressbar
          className="circleBar"
          value={loudnessAvg * 10}
          text={`${loudnessAvg}`}
          styles={buildStyles({
            rotation: 1,
            strokeLinecap: "round",
            textSize: "16px",
            pathTransitionDuration: 0.5,
            pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
            textColor: "#f88",
            trailColor: "#d6d6d6",
            backgroundColor: "#3e98c7",
          })}
        />
        <h3> Loudness </h3>
      </div>
    </div>
  );
}

export default StatGauge;
