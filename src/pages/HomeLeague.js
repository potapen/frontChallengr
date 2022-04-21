import React, { useEffect } from "react";
import NewLeagueForm from "../components/leagues/NewLeagueForm";
import LeaguesList from "../components/leagues/LeaguesList";
import LeagueJoiner from "../components/leagues/LeagueJoiner";
import "./HomeLeague.css";
import FormDialogFAB from "../interactivity/FormDialogFAB";

import { useState } from "react";
import axios from "axios";

import backendHost from "../utils/backendHost";

function HomeLeague() {
  const styleAdd = {
    margin: 0,
    top: "auto",
    right: 120,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };

  const styleJoin = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };

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
      <LeaguesList leagues={leagues} updateLeaguesList={updateLeaguesList} />
      <div>
        <FormDialogFAB
          style={styleAdd}
          color="primary"
          variant="extended"
          text="Create"
        >
          {(callback) => {
            return <NewLeagueForm handleClose={callback} />;
          }}
        </FormDialogFAB>
        <FormDialogFAB
          style={styleJoin}
          color="secondary"
          variant="extended"
          text="Join"
        >
          {(callback) => {
            return <LeagueJoiner onSubmit={callback} />;
          }}
        </FormDialogFAB>
      </div>
    </div>
  );
}

export default HomeLeague;
