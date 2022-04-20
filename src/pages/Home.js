import React from "react";
import OngoingChallengesList from "../components/challenges/OngoingChallengesList";
import HomeLeaguesStats from "../components/stats/HomeLeaguesStats";

function Home() {
  return (
    <div className="homeContainer">
      <OngoingChallengesList />
      <HomeLeaguesStats />
    </div>
  );
}

export default Home;
