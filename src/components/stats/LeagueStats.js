import React, { useEffect } from "react";
import { useState } from "react";

function LeagueStats({
  countPerLeague,
  countPerUser,
  countPerWinner,
  fullRankingPerLeague,
}) {
  return (
    <div>
      <h1>League stats</h1>
      <ol>
        {fullRankingPerLeague[0].map((user) => {
          return <li>{user._id.winners.username} </li>;
        })}
      </ol>
    </div>
  );
}

export default LeagueStats;
