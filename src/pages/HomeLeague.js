import React from "react";
import NewLeagueForm from "../components/leagues/NewLeagueForm";
import LeaguesList from "../components/leagues/LeaguesList";
import LeagueJoiner from "../components/leagues/LeagueJoiner";

function HomeLeague() {
  return (
    <div>
      <div>HomeLeague</div>
      <LeagueJoiner />
      <NewLeagueForm />
      <LeaguesList />
    </div>
  );
}

export default HomeLeague;
