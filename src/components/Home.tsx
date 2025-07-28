import React from "react";
import { Link } from "react-router-dom";
import icon from "../assets/icon.png";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Hangman Game</h1>
      <img src={icon} alt="" />
      <p className="desc">guess the word</p>
      <Link to="/game" className="go-to-game-button">
        Start playing
      </Link>
    </div>
  );
}
