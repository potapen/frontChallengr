import React from "react";

import ChallengeCard from "./ChallengeCard";
import FilterButtons from "./FilterButtons";

import "./ChallengesList.css";
import { Grid } from "@mui/material";

function ChallengesList({
  games,
  leagues,
  fullChallenges,
  filters,
  updateChallengesList,
  updateFullChallengesList,
  challenges,
  setChallenges,
}) {
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
      <div className="challengesListContainer">
        <Grid container spacing={1}>
          {challenges.length > 0 &&
            challenges.map((challenge) => {
              return (
                <Grid key={challenge._id} item xs={12}>
                  <ChallengeCard
                    key={challenge._id}
                    leagues={leagues}
                    games={games}
                    updateChallengesList={updateChallengesList}
                    updateFullChallengesList={updateFullChallengesList}
                    challengeProps={challenge}
                  />
                </Grid>
              );
            })}
        </Grid>
      </div>
    </div>
  );
}

export default ChallengesList;
