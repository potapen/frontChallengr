import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./LeaguesStats.css";
import backendHost from "../../utils/backendHost";
import { useParams } from "react-router-dom";
import LeagueStatsCard from "./LeagueStatsCard";
import CustomCarousel from "../../interactivity/CustomCarousel";

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
    setLeaguesStats(s.data.statsPerLeague);
  };

  useEffect(() => {
    getLeaguesStats(profileId);
  }, []);

  return (
    <div className="statsPageContainer">
      <h1>Stats</h1>
      {leaguesStats.length > 0 && (
        <CustomCarousel list={leaguesStats}>
          {(leagueStats) => {
            return leagueStats.countPerLeague ? (
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
            ) : (
              <h1> No challenges yet in {leagueStats.league.name} league`</h1>
            );
          }}
        </CustomCarousel>
      )}
    </div>
  );
}

export default LeaguesStats;
