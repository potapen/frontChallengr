import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import authToken from "../../utils/authToken";
import LeagueStats from "./LeagueStats";
import { useParams } from "react-router-dom";

function LeaguesStats() {
  const { profileId } = useParams();

  const [leaguesStats, setLeaguesStats] = useState([]);

  const getLeaguesStats = async () => {
    const s = await axios.get(
      `http://localhost:3000/api/stats/profile/${profileId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    setLeaguesStats(s.data.statsPerLeague);
  };

  useEffect(() => {
    getLeaguesStats();
  }, []);

  return (
    <div>
      <h1>List of Leagues</h1>
      <ul>
        {leaguesStats.length > 0 &&
          leaguesStats.map((leagueStats) => {
            return (
              <LeagueStats
                key={leagueStats.countPerLeague._id}
                countPerLeague={leagueStats.countPerLeague}
                countPerUser={leagueStats.countPerUser}
                countPerWinner={leagueStats.countPerWinner}
                fullRankingPerLeague={leagueStats.fullRankingPerLeague}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default LeaguesStats;
