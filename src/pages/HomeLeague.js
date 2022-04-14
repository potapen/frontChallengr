import React from "react";
import LeaguesList from "../components/leagues/LeaguesList";
import NewLeagueForm from "../components/leagues/NewLeagueForm";

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
