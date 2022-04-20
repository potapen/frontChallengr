import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import backendHost from "../../utils/backendHost";
import { useParams } from "react-router-dom";
import LeagueStatsCard from "./LeagueStatsCard";

function LeaguesStats() {
  const { profileId } = useParams();

  const [leaguesStats, setLeaguesStats] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  const getLeaguesStats = async () => {
    const s = await axios.get(`${backendHost}/api/stats/profile/${profileId}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    setLeaguesStats(s.data.statsPerLeague);
  };

  useEffect(() => {
    getLeaguesStats();
  }, []);

  return (
    <div>
      <h1>Leagues stats</h1>
      {leaguesStats.length > 0 &&
        leaguesStats.map((leagueStats) => {
          return (
            <LeagueStatsCard
              key={leagueStats.countPerLeague._id}
              league={leagueStats.league}
              countPerLeague={leagueStats.countPerLeague}
              countPerUser={leagueStats.countPerUser}
              countPerWinner={leagueStats.countPerWinner}
              fullRankingPerLeague={leagueStats.fullRankingPerLeague}
            />
          );
        })}
    </div>
  );
}

export default LeaguesStats;
