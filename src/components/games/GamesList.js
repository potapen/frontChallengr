import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import authToken from "../../utils/authToken";
import backendHost from "../../utils/backendHost";
import GameCard from "./GameCard";

function GamesList() {
  const [games, setGames] = useState([]);

  const getGames = async () => {
    const l = await axios.get(`${backendHost}/api/Games`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    setGames(l.data.games);
  };

  useEffect(() => {
    getGames();
  }, []);

  const updateGamesList = (game) => {
    getGames();
    return;
  };

  return (
    <div>
      <h1>List of Games</h1>
      <ul>
        {games.length > 0 &&
          games.map((game) => {
            return (
              <GameCard
                key={game._id}
                gameProps={game}
                updateGamesList={updateGamesList}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default GamesList;
