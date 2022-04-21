import React from "react";
import NewChallengeForm from "../components/challenges/NewChallengeForm";
import OngoingChallengesList from "../components/challenges/OngoingChallengesList";
import HomeLeaguesStats from "../components/stats/HomeLeaguesStats";
import FormDialogFAB from "../interactivity/FormDialogFAB";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import backendHost from "../utils/backendHost";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Home() {
  const styleAdd = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };
  const [challenges, setChallenges] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [games, setGames] = useState([]);
  const [leaguesStats, setLeaguesStats] = useState([]);
  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);

  const getLeaguesStats = async () => {
    const s = await axios.get(`${backendHost}/api/stats/profile/${user._id}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    setLeaguesStats(s.data.statsPerLeague);
  };

  const getChallenges = async () => {
    const l = await axios.get(`${backendHost}/api/challenges/ongoing`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    setChallenges(l.data.challenges);
  };

  const updateChallengesList = () => {
    getChallenges();
    return;
  };

  const getLeagues = async () => {
    const l = await axios.get(`${backendHost}/api/leagues`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    setLeagues(l.data.leagues);
  };
  const getGames = async () => {
    const l = await axios.get(`${backendHost}/api/games`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    setGames(l.data.games);
  };

  useEffect(() => {
    getLeagues();
    getGames();
    getChallenges();
    getLeaguesStats();
  }, []);

  return (
    <div className="homeContainer">
      <FormDialogFAB
        style={styleAdd}
        color="primary"
        variant="extended"
        text="New Challenge"
      >
        {(callback) => {
          return (
            <NewChallengeForm
              leagues={leagues}
              games={games}
              handleClose={callback}
              updateFullChallengesList={updateChallengesList}
              updateChallengesList={updateChallengesList}
            />
          );
        }}
      </FormDialogFAB>
      <OngoingChallengesList
        challenges={challenges}
        updateChallengesList={updateChallengesList}
        getLeaguesStats={getLeaguesStats}
      />
      <HomeLeaguesStats leaguesStats={leaguesStats} />
    </div>
  );
}

export default Home;
