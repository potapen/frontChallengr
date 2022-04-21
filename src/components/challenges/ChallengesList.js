import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import backendHost from "../../utils/backendHost";
import ChallengeCard from "./ChallengeCard";
import FilterButtons from "./FilterButtons";

function ChallengesList({
  games,
  leagues,
  fullChallenges,
  filters,
  updateChallengesList,
}) {
  const [challenges, setChallenges] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  const getChallenges = async () => {
    const l = await axios.get(`${backendHost}/api/challenges`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    setChallenges(l.data.challenges);
  };

  useEffect(() => {
    getChallenges();
  }, []);

  const filterGames = (game) => {
    let newChallenges = [...fullChallenges];
    newChallenges = newChallenges.filter((challenge) => {
      return challenge.game.name === game;
    });
    setChallenges(newChallenges);
  };

  const filterLeagues = (league) => {
    let newChallenges = [...fullChallenges];
    newChallenges = newChallenges.filter((challenge) => {
      return challenge.league.name === league;
    });
    setChallenges(newChallenges);
  };

  const resetFilters = () => {
    let newChallenges = [...fullChallenges];
    setChallenges(newChallenges);
  };

  return (
    <div>
      <h1>List of Challenges</h1>
      {filters.menuLeagues && (
        <FilterButtons
          filterItem={filterLeagues}
          menuItems={filters.menuLeagues}
          resetFilters={resetFilters}
        />
      )}
      {filters.menuGames && (
        <FilterButtons
          filterItem={filterGames}
          menuItems={filters.menuGames}
          resetFilters={resetFilters}
        />
      )}
      <ul>
        {challenges.length > 0 &&
          challenges.map((challenge) => {
            return (
              <ChallengeCard
                key={challenge._id}
                challengeProps={challenge}
                updateChallengesList={updateChallengesList}
                leagues={leagues}
                games={games}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ChallengesList;
