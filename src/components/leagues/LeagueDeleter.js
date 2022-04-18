import React from "react";
import "./LeagueInviter.js";
import axios from "axios";

import backendHost from "../../utils/backendHost";

function LeagueDeleter({ league, updateLeaguesList }) {

  const storedToken = localStorage.getItem("authToken");
  const deleteLeague = async () => {
    await axios.delete(`${backendHost}/api/leagues/${league._id}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    updateLeaguesList(league);
  };

  return (
    <button type="button" onClick={deleteLeague}>
      Delete
    </button>
  );
}

export default LeagueDeleter;
