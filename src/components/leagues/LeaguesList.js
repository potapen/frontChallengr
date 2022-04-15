import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import authToken from "../../utils/authToken";
import LeagueCard from "./LeagueCard";

function LeaguesList() {
  const [leagues, setLeagues] = useState([]);

  const getLeagues = async () => {
    const l = await axios.get("http://localhost:3000/api/leagues", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log(l.data.leagues);
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
      <h1>List of leagues</h1>
      <ul>
        {leagues.length > 0 &&
          leagues.map((league) => {
            console.log(league.name);
            return (
              <LeagueCard
                league={league}
                updateLeaguesList={updateLeaguesList}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default LeaguesList;
