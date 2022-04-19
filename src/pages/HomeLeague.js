import React from "react";
import NewLeagueForm from "../components/leagues/NewLeagueForm";
import LeaguesList from "../components/leagues/LeaguesList";
import LeagueJoiner from "../components/leagues/LeagueJoiner";
import "./HomeLeague.css";
import FormDialogFAB from "../interactivity/FormDialogFAB";

function HomeLeague() {
  const styleAdd = {
    margin: 0,
    top: "auto",
    right: 130,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };

  const styleJoin = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 25,
    left: "auto",
    position: "fixed",
  };

  return (
    <div>
      <div>HomeLeague</div>
      <LeaguesList />
      <div class="floatingButtons">
        <FormDialogFAB style={styleAdd} color="primary" variant="circular">
          {(callback) => {
            return <NewLeagueForm onSubmit={callback} />;
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
