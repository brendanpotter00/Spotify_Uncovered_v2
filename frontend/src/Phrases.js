import React from "react";
import "./phrases.css";

function Phrases({ props }) {
    let e = props.energy
    let v = props.valence
    let l = props.loudness

    function isLow(value) {
        return (value <= 25)
    }

    function isLowMed(value) {
        return (value <= 40 && value>25)
    }

    function isMed(value) {
        return (value <= 55 && value>40)
    }

    function isMedHigh(value) {
        return (value <= 70 && value>55)
    }

    function isHigh(value) {
        return (value>70)
    }

    function determinePhrase(){
        if (isLowMed(v) && isMed(e) && isLowMed(l)) return ("Feeling kinda meh, huh? It's okay we've all been there")
        if ((isLow(e) || isLowMed(e)) && (isLow(l) || isLowMed(l) || isMed(l)) && (isMedHigh(v) || isHigh(v))) return ("I think you could stand to spice it up a bit. Not EVERY song needs to be a slow song")
        if ((isMedHigh(e) || isHigh(e)) && (isMedHigh(v) || isHigh(v)) && (isLow(l) || isLowMed(l) || isMed(l))) return ("Aww you're happy AND energetic?? That's so nice... I guess :)")
        if ((isMedHigh(e) || isHigh(e)) && (isMedHigh(l) || isHigh(l)) && (isLow(v) || isLowMed(v) || isMed(v))) return ("Have you heard of 'chill'? You could use it")
        if ((isLow(e) || isLowMed(e)) && (isLow(v) || isLowMed(v) || isMed(v)) && (isMedHigh(l) || isHigh(l))) return ("You seem like you could use a pick me up. Grab a coffee and go for a walk")
        if ((isMedHigh(v) || isHigh(v)) && (isMed(e) || isMedHigh(e) || isHigh(e))) return ("Your music suggests you are doing great. Way to embrace 'fake it till you make it'")
        if (isMed(v) && isMed(l) && isMed(e)) return ("Nothin wrong with floating in the middle")
        if (((isMed(v) || isMedHigh(v)) && isMed(l) && isMed(e)) || ((isMed(l) || isMedHigh(l)) && isMed(v) && isMed(e)) || ((isMed(e) || isMedHigh(e)) && isMed(l) && isMed(v))) return("Congrats! You're just barely not basic :)")
        if (isMed(l) && isMed(e)) return ("Ahhh so you're the mellow type")
        if (isHigh(e)) return ("Maybe you should lay off the caffeine for a bit, just a suggestion")
        if (isHigh(l)) return ("Wow... that's really loud. Maybe take a break?")
        if (isLow(v) || isLowMed(v)) return ("You seem a bit sad, might I suggest Spotify's 'Mood Booster' playlist")
        else return ("I like your tunes!")
    }




    return(
        <div className="phrase">{determinePhrase()}</div>
    );
}

export default Phrases;