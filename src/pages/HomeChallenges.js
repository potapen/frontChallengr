import NewChallengeForm from "../components/challenges/NewChallengeForm";
import ChallengesList from "../components/challenges/ChallengesList";
import { useState, useEffect } from "react";
import backendHost from "../utils/backendHost";
import axios from "axios";
import FormDialogFAB from "../interactivity/FormDialogFAB";

const HomeChallenges = () => {
  const styleAdd = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };
  const [fullChallenges, setFullChallenges] = useState([]);
  const [filters, setFilters] = useState({});

  const [challenges, setChallenges] = useState([]);

  const getChallenges = async () => {
    const l = await axios.get(`${backendHost}/api/challenges`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    setChallenges(l.data.challenges);
  };

  // useEffect(() => {
  //   getChallenges();
  // }, []);

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

  const [leagues, setLeagues] = useState([]);
  const [games, setGames] = useState([]);
  const storedToken = localStorage.getItem("authToken");
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
    console.log('updateFullChallengesList')
    getFullChallenges();
    return;
  };
  const updateChallengesList = () => {
    console.log('updateChallengesList')
    getChallenges();
    return;
  };

  if (leagues.length > 0 && games.length > 0) {
    return (
      <>
        <ChallengesList
          leagues={leagues}
          games={games}
          fullChallenges={fullChallenges}
          filters={filters}
          updateFullChallengesList={updateFullChallengesList}
          challenges={challenges}
          setChallenges={setChallenges}
          updateChallengesList={updateChallengesList}
        />
        <FormDialogFAB
          style={styleAdd}
          color="primary"
          variant="extended"
          text="New"
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
      </>
    );
  }
};
export default HomeChallenges;
