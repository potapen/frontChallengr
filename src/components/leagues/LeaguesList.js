import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import "./LeaguesList.css";

import backendHost from "../../utils/backendHost";
import LeagueCard from "./LeagueCard";
import { Grid } from "@mui/material";

function LeaguesList() {
  const [leagues, setLeagues] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  const getLeagues = async () => {
    const l = await axios.get(`${backendHost}/api/leagues`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    setLeagues(l.data.leagues);
  };

  useEffect(() => {
    getLeagues();
  }, []);

  const updateLeaguesList = (league) => {
    getLeagues();
    return;
  };

  return (
    <div>
      <h1>Leagues</h1>
      <div className="leaguesListContainer">
        <Grid container spacing={3}>
          {leagues.length > 0 &&
            leagues.map((league) => {
              return (
                <Grid item xs={12}>
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
