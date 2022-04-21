import React from "react";
import NewChallengeForm from "../components/challenges/NewChallengeForm";
import OngoingChallengesList from "../components/challenges/OngoingChallengesList";
import HomeLeaguesStats from "../components/stats/HomeLeaguesStats";
import FormDialogFAB from "../interactivity/FormDialogFAB";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import backendHost from "../utils/backendHost";

function Home() {
  const styleAdd = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };
  const [fullChallenges, setFullChallenges] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [filters, setFilters] = useState({});
  const [leagues, setLeagues] = useState([]);
  const [games, setGames] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  const getChallenges = async () => {
    const l = await axios.get(`${backendHost}/api/challenges`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    setChallenges(l.data.challenges);
  };

  const getFullChallenges = async () => {
    const l = await axios.get(`${backendHost}/api/challenges`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    setFullChallenges(l.data.challenges);
    const menuLeagues = [
      ...new Set(l.data.challenges.map((challenge) => challenge.league.name)),
    ];
    const menuGames = [
      ...new Set(l.data.challenges.map((challenge) => challenge.game.name)),
    ];
    setFilters({ menuLeagues, menuGames });
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
    getFullChallenges();
    getChallenges();
  }, []);

  const updateFullChallengesList = () => {
    getFullChallenges();
    return;
  };
  const updateChallengesList = () => {
    getChallenges();
    return;
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
          return (
            <NewChallengeForm
              leagues={leagues}
              games={games}
              handleClose={callback}
              updateFullChallengesList={updateFullChallengesList}
              updateChallengesList={updateChallengesList}
            />
          );
        }}
      </FormDialogFAB>
      <OngoingChallengesList
        challenges={challenges}
        setChallenges={setChallenges}
      />
      <HomeLeaguesStats />
    </div>
  );
}

export default Home;
