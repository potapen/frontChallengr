import React from "react";
import NewChallengeForm from "../components/challenges/NewChallengeForm";
import OngoingChallengesList from "../components/challenges/OngoingChallengesList";
import HomeLeaguesStats from "../components/stats/HomeLeaguesStats";
import FormDialogFAB from "../interactivity/FormDialogFAB";

import "./Home.css";

function Home() {
  const styleAdd = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };

  return (
    <div className="homeContainer">
      <FormDialogFAB
        style={styleAdd}
        color="primary"
        variant="extended"
        text="New Challenge"
      >
        {(callback) => {
          return <NewChallengeForm onSubmit={callback} />;
        }}
      </FormDialogFAB>
      <OngoingChallengesList />
      <HomeLeaguesStats />
    </div>
  );
}

export default Home;
