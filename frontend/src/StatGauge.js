import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { buildStyles } from "react-circular-progressbar";
import "./statGauge.css";
import "react-circular-progressbar/dist/styles.css";

const percentage = 66;
function StatGauge({ props }) {
  const firstSongValence = 0;
  console.log(props);
  //props[0].valence;
  return (
    <div className="bars">
      <div className="firstbar">
        <h3> Bar 1 </h3>
        <CircularProgressbar
          className="circleBar"
          value={percentage}
          text={`${firstSongValence}%`}
          styles={buildStyles({
            rotation: 0.25,
            strokeLinecap: "round",
            textSize: "16px",
            pathTransitionDuration: 0.5,
            pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
            textColor: "#f88",
            trailColor: "#d6d6d6",
            backgroundColor: "#3e98c7",
          })}
        />
      </div>
      <div className="secondbar">
        <h3> Bar 2 </h3>
        <CircularProgressbar
          className="circleBar"
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            rotation: 0.25,
            strokeLinecap: "round",
            textSize: "16px",
            pathTransitionDuration: 0.5,
            pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
            textColor: "#f88",
            trailColor: "#d6d6d6",
            backgroundColor: "#3e98c7",
          })}
        />
      </div>
      <div className="thirdbar">
        <h3> Bar 3 </h3>
        <CircularProgressbar
          className="circleBar"
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            rotation: 0.25,
            strokeLinecap: "round",
            textSize: "16px",
            pathTransitionDuration: 0.5,
            pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
            textColor: "#f88",
            trailColor: "#d6d6d6",
            backgroundColor: "#3e98c7",
          })}
        />
      </div>
    </div>
  );
}

export default StatGauge;
