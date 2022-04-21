import React from "react";
import NewLeagueForm from "../components/leagues/NewLeagueForm";
import LeaguesList from "../components/leagues/LeaguesList";
import LeagueJoiner from "../components/leagues/LeagueJoiner";
import "./HomeLeague.css";
import FormDialogFAB from "../interactivity/FormDialogFAB";



function HomeLeague({leagues, setLeagues, getLeagues}) {
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

  



  return (
    <div>
      <LeaguesList leagues={leagues} updateLeaguesList={getLeagues} />
      <div>
        <FormDialogFAB
          style={styleAdd}
          color="primary"
          variant="extended"
          text="Create"
        >
          {(callback) => {
            return <NewLeagueForm handleClose={callback} getLeagues={getLeagues}/>;
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
