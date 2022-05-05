import React, { useEffect, useState, Component } from "react";
import "./phrases.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Phrases({ props }) {
  const [phrase, setPhrase] = useState(false);
  let e = props.energy;
  let v = props.valence;
  let d = props.dance;

  function isLow(value) {
    return value <= 25;
  }

  function isLowMed(value) {
    return value <= 40 && value > 25;
  }

  function isMed(value) {
    return value <= 55 && value > 40;
  }

  function isMedHigh(value) {
    return value <= 70 && value > 55;
  }

  function isHigh(value) {
    return value > 70;
  }

  function determinePhrase() {
    if (isLowMed(v) && isMed(e) && isLowMed(d))
      return "Feeling kinda meh, huh? It's okay we've all been there";
    if (
      (isLow(e) || isLowMed(e)) &&
      (isLow(d) || isLowMed(d) || isMed(d)) &&
      (isMedHigh(v) || isHigh(v))
    )
      return "I think you could stand to spice it up a bit. Not EVERY song needs to be a slow song";
    if (
      (isMedHigh(e) || isHigh(e)) &&
      (isMedHigh(v) || isHigh(v)) &&
      (isLow(d) || isLowMed(d) || isMed(d))
    )
      return "Aww you're happy AND energetic?? That's so nice :)";
    if (
      (isMedHigh(e) || isHigh(e)) &&
      (isMedHigh(d) || isHigh(d)) &&
      (isLow(v) || isLowMed(v) || isMed(v))
    )
      return "Have you heard of 'chill'? You could use it";
    if (
      (isLow(e) || isLowMed(e)) &&
      (isLow(v) || isLowMed(v) || isMed(v)) &&
      (isLow(d) || isLowMed(d) || isMed(d))
      // (isMedHigh(d) || isHigh(d))
    )
      return "You seem like you could use a pick me up. Grab a coffee and go for a walk";
    if ((isMedHigh(v) || isHigh(v)) && (isMed(e) || isMedHigh(e) || isHigh(e)))
      return "Your music suggests you are doing great. Way to embrace 'fake it till you make it'";
    if (isMed(v) && isMed(d) && isMed(e))
      return "Nothin wrong with floating in the middle";
    if (
      ((isMed(v) || isMedHigh(v)) && isMed(d) && isMed(e)) ||
      ((isMed(d) || isMedHigh(d)) && isMed(v) && isMed(e)) ||
      ((isMed(e) || isMedHigh(e)) && isMed(d) && isMed(v))
    )
      return "Congrats! You're just barely not basic :)";
    if (isMed(d) && isMed(e)) return "Ahhh so you're the mellow type";
    if (isHigh(e))
      return "Maybe you should lay off the caffeine for a bit, just a suggestion";
    if (isHigh(d)) return "Wow... I hope you're at least a good dancer";
    if (isLow(v) || isLowMed(v))
      return "You seem a bit sad, might I suggest Spotify's 'Mood Booster' playlist";
    else return "I like your tunes!";
  }

  const handleChange = () => {
    setPhrase(true);
  };

  //CodePen for Phrase button
  //https://codepen.io/chancesq/pen/MWKREVg?editors=1100

  return (
    <div className="phrase-container">
      {/* <div className="phrase">{determinePhrase()}</div> */}

      {phrase ? (
        <Typography sx={{ padding: 1 }} variant="h4">
          {determinePhrase()}
        </Typography>
      ) : (
        // <div className="phrase"></div>
        // <button className="phraseButton" onClick={() => handleChange()}>
        //   click
        // </button>
        <Button
          variant="contained"
          onClick={() => handleChange()}
          color="primary"
          sx={{ borderRadius: 7 }}
        >
          <Typography sx={{ padding: 1 }} variant="h6">
            Click Me
          </Typography>
        </Button>
      )}
    </div>
  );
}

export default Phrases;
