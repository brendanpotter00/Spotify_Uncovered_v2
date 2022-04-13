import React from "react";
import "./card.css";

function Card({ props }) {
  return (
    <div className="card-container">
      <div className="card">
        <div className="body">
          <img
            src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/retrowave-cd-album-cover-design-template-206d75bf8fa037c71d26282182c1ef97_screen.jpg?ts=1607505810"
            alt=""
            className="image"
          />
          <h3 className="title">The Everyday Salad</h3>
          <ul className="description">
            <li className="stat">energy 5</li>
            <li className="stat">energy 5</li>
            <li className="stat">energy 5</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Card;
