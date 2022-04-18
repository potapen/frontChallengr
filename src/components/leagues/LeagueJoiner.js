import React, { useState } from "react";
import axios from "axios";

import backendHost from "../../utils/backendHost";

function LeagueJoiner() {
  const [inviteKey, setInviteKey] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  const joinLeague = async (event) => {
    event.preventDefault();
    await axios.patch(
      `${backendHost}/api/leagues/join`,
      { inviteKey },
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
  };

  const handleChanges = (event) => {
    setInviteKey(event.target.value);
  };

  return (
    <form onSubmit={joinLeague} encType="multipart/form-data">
      <div>
        <label htmlFor="name">Invite Key</label>
        <input
          id="inviteKey"
          name="inviteKey"
          value={inviteKey}
          type="text"
          onChange={handleChanges}
        />
      </div>
      <button type="submit">Join</button>
    </form>
  );
}

export default LeagueJoiner;
