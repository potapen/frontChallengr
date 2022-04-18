import React from "react";
import axios from "axios";

import authToken from "../../utils/authToken";
import backendHost from "../../utils/backendHost";

function GameDeleter({ game, updateGamesList }) {
  const deleteGame = async () => {
    await axios.delete(`${backendHost}/api/Games/${game._id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
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
