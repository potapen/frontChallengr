import React from "react";

import CustomCarousel from "../../interactivity/CustomCarousel";
import { Typography } from "@mui/material";
import HomeLeagueStatsCard from "./HomeLeagueStatsCard";

import "./HomeLeaguesStats.css";

function HomeLeaguesStats({ leaguesStats,challenges,setChallenges }) {
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
                key={leagueStats.profile._id}
                league={leagueStats.league}
                fullRankingPerLeague={leagueStats.fullRankingPerLeague}
                challenges={challenges}
                setChallenges={setChallenges}
              />
            );
          }}
        </CustomCarousel>
      )}
    </div>
  );
}

export default HomeLeaguesStats;
