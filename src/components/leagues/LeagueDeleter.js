import React from "react";
import "./LeagueInviter.css";
import axios from "axios";

import authToken from "../../utils/authToken";

function LeagueDeleter({ league, handleDelete }) {
  const deleteLeague = async () => {
    await axios.delete(`http://localhost:3000/api/leagues/${league._id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  };

  return (
    <button type="button" onClick={deleteLeague}>
      Delete
    </button>
  );
}

export default LeagueDeleter;
