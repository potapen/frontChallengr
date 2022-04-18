import React, { useState } from "react";
import "./GameCard.css";
import GameDeleter from "./GameDeleter";
import EditGameForm from "./EditGameForm";
import axios from "axios";
import backendHost from "../../utils/backendHost";

function GameCard({ gameProps, updateGamesList }) {
  const [editMode, setEditMode] = useState(false);
  const [game, setGame] = useState(gameProps);

  const storedToken = localStorage.getItem("authToken");

  const refreshGame = async () => {
    const refreshedGame = await axios.get(
      `${backendHost}/api/games/${game._id}`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    setGame(refreshedGame.data.game);
  };

  return (
    <div className="gameCardContainer">
      {true ? (
        <>
          <img className="gameCardImage" src={game.imageUrl} alt="gameimage" />
          <div>
            <h4>{game.name}</h4>
            <p>{game.description}</p>
            <div>
              <button type="button" onClick={() => setEditMode(!editMode)}>
                {editMode ? "Hide Edit" : "Show Edit"}
              </button>
              {editMode && (
                <EditGameForm game={game} refreshGame={refreshGame} />
              )}
              <GameDeleter game={game} updateGamesList={updateGamesList} />
            </div>
          </div>
        </>
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default GameCard;
