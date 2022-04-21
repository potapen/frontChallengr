import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import backendHost from "../../utils/backendHost";
import { useParams } from "react-router-dom";
import CustomCarousel from "../../interactivity/CustomCarousel";
import { Typography } from "@mui/material";
import HomeLeagueStatsCard from "./HomeLeagueStatsCard";

import "./HomeLeaguesStats.css";

import { AuthContext } from "../../context/auth.context";

function HomeLeaguesStats() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const [leaguesStats, setLeaguesStats] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  const getLeaguesStats = async () => {
    const s = await axios.get(`${backendHost}/api/stats/profile/${user._id}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    console.log();
    setLeaguesStats(s.data.statsPerLeague);
  };

  useEffect(() => {
    getLeaguesStats();
  }, []);

  return (
    <div style={{ width: "100%" }} className="leaguesStatsContainer">
      <Typography variant="h6" gutterBottom component="div">
        Leagues stats ({`${leaguesStats.length}`})
      </Typography>
      {leaguesStats.length > 0 && (
        <CustomCarousel list={leaguesStats}>
          {(leagueStats) => {
            return (
              <HomeLeagueStatsCard
                key={leagueStats.countPerLeague._id}
                league={leagueStats.league}
                fullRankingPerLeague={leagueStats.fullRankingPerLeague}
              />
            );
          }}
        </CustomCarousel>
      )}
    </div>
  );
}

export default HomeLeaguesStats;
