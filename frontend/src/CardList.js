import React from "react";
import Card from "./Card.js";
import "./cardList.css";

function CardList() {
  return (
    <div className="card-container">
      <Card />
      <Card />
    </div>
  );
}

export default CardList;
