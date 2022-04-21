import React from "react";

import GameCard from "./GameCard";
import { Grid } from "@mui/material";

import "./GamesList.css";

function GamesList({ games, updateGamesList }) {
  return (
    <div className="gamesPageContainer">
      <h1>Games</h1>
      <div className="gamesListContainer">
        <Grid container spacing={1}>
          {games.length > 0 &&
            games.map((game) => {
              return (
                <Grid key={game._id} item xs={12}>
                  <GameCard
                    key={game._id}
                    gameProps={game}
                    updateGamesList={updateGamesList}
                  />
                </Grid>
              );
            })}
        </Grid>
      </div>
    </div>
  );
}

export default GamesList;
