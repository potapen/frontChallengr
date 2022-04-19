import React from "react";
import "./LeagueInviter.js";
import axios from "axios";

import backendHost from "../../utils/backendHost";

function LeagueLeaver({ league, updateLeaguesList }) {

  const storedToken = localStorage.getItem("authToken");

  const leaveLeague = async () => {
    await axios.patch(
      `${backendHost}/api/leagues/${league._id}/leave`,
      {},
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    updateLeaguesList(league);
  };

  return (
    <button type="button" onClick={leaveLeague}>
      Leave
    </button>
  );
}

export default LeagueLeaver;
