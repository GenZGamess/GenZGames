import React from "react";
import "../styles/GameCard.css";

function GameCard({ cover, title, price, platforms }) {
  return (
    <div id="GameContainer">
      <img src={cover} alt="Cover" id="cover" />
      <h3 id="title">{title}</h3>
      <div id="platforms">
        <img src="/res/playstation.png" alt="" className="icon" />
        <img src="/res/monitor.png" alt="" className="icon" />
        <img src="/res/xbox.png" alt="" className="icon" />
      </div>
      <div id="buyContainer">
        <div id="price">{price}</div>
        <button id="buy">Add to Cart</button>
      </div>
    </div>
  );
}

export default GameCard;