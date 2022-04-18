import React from "react";
import axios from "axios";

import backendHost from "../../utils/backendHost";

function GameDeleter({ game, updateGamesList }) {

  const storedToken = localStorage.getItem("authToken");

  const deleteGame = async () => {
    await axios.delete(`${backendHost}/api/Games/${game._id}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    updateGamesList(game);
  };

  return (
    <button type="button" onClick={deleteGame}>
      Delete
    </button>
  );
}

export default GameDeleter;
