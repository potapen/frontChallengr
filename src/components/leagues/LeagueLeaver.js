import React from "react";
import "./LeagueInviter.js";
import axios from "axios";

import authToken from "../../utils/authToken";
import backendHost from "../../utils/backendHost";

function LeagueLeaver({ league, updateLeaguesList }) {
  const leaveLeague = async () => {
    await axios.patch(
      `${backendHost}/api/leagues/${league._id}/leave`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
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
