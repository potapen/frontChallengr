import React from "react";
import NewGameForm from "../components/games/NewGameForm";
import GamesList from "../components/games/GamesList";

function HomeGame() {
  return (
    <div>
      <div>HomeGame</div>
      <NewGameForm />
      <GamesList />
    </div>
  );
}

export default HomeGame;
