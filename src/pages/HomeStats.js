import React from "react";
import { useParams } from "react-router-dom";
import LeaguesStats from "../components/stats/LeaguesStats";

function HomeStats({ league }) {
  const { leagueId } = useParams();

  return (
    <div>
      <div>HomeStats</div>
      <LeaguesStats />
    </div>
  );
}

export default HomeStats;
