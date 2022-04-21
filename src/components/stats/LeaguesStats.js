import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import "./LeaguesStats.css";

import backendHost from "../../utils/backendHost";
import { useParams } from "react-router-dom";
import LeagueStatsCard from "./LeagueStatsCard";
import CustomCarousel from "../../interactivity/CustomCarousel";
import { Typography } from "@mui/material";

function LeaguesStats() {
  const { profileId } = useParams();

  const [leaguesStats, setLeaguesStats] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  const getLeaguesStats = async (profileId) => {
    const s = await axios.get(`${backendHost}/api/stats/profile/${profileId}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    console.log();
    setLeaguesStats(s.data.statsPerLeague);
  };

  useEffect(() => {
    console.log("reloadList", profileId);
    getLeaguesStats(profileId);
  }, []);

  return (
    <div className="statsPageContainer">
      <h1>Stats</h1>
      {leaguesStats.length > 0 && (
        <CustomCarousel list={leaguesStats}>
          {(leagueStats) => {
            return (
              <LeagueStatsCard
                getLeaguesStats={getLeaguesStats}
                key={leagueStats.countPerLeague._id}
                profile={leagueStats.profile}
                league={leagueStats.league}
                countPerLeague={leagueStats.countPerLeague}
                countPerUser={leagueStats.countPerUser}
                countPerWinner={leagueStats.countPerWinner}
                fullRankingPerLeague={leagueStats.fullRankingPerLeague}
              />
            );
          }}
        </CustomCarousel>
      )}
    </div>
  );
}

export default LeaguesStats;
