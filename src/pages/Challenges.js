import NewChallengeForm from "../components/challenges/NewChallengeForm";
import ChallengesList from "../components/challenges/ChallengesList";
import { useState, useEffect } from "react";
import backendHost from "../utils/backendHost";
import axios from "axios";

const Challenges = () => {
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
  }, []);

  if (leagues.length > 0 && games.length > 0) {
    return (
      <>
        <p>Challenge page</p>
        <NewChallengeForm leagues={leagues} games={games} />
        <ChallengesList leagues={leagues} games={games} />
      </>
    );
  }
};
export default Challenges;
