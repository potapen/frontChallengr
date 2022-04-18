import React from "react";
import "./LeagueInviter.js";
import axios from "axios";

import authToken from "../../utils/authToken";
import backendHost from "../../utils/backendHost";

function LeagueDeleter({ league, updateLeaguesList }) {
  const deleteLeague = async () => {
    await axios.delete(`${backendHost}/api/leagues/${league._id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    updateLeaguesList();
  };

  return (
    <button type="button" onClick={deleteLeague}>
      Delete
    </button>
  );
}

export default LeagueDeleter;
