import React from "react";
import NewLeagueForm from "../components/leagues/NewLeagueForm";
import LeaguesList from "../components/leagues/LeaguesList";

function HomeLeague() {
  return (
    <div>
      <div>HomeLeague</div>
      <NewLeagueForm />
      <LeaguesList />
    </div>
  );
}

export default HomeLeague;
