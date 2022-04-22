import React from "react";
import "./LeaguesList.css";
import LeagueCard from "./LeagueCard";
import { Grid } from "@mui/material";

function LeaguesList({ leagues, updateLeaguesList }) {
  return (
    <div className="leaguesPageContainer">
      <h1>Leagues</h1>
      <div className="leaguesListContainer">
        <Grid container spacing={1}>
          {leagues.length > 0 &&
            leagues.map((league) => {
              return (
                <Grid key={league._id} item xs={12}>
                  <LeagueCard
                    key={league._id}
                    leagueProps={league}
                    updateLeaguesList={updateLeaguesList}
                  />
                </Grid>
              );
            })}
        </Grid>
      </div>
    </div>
  );
}

export default LeaguesList;
