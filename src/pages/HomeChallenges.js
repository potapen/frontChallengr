import NewChallengeForm from '../components/challenges/NewChallengeForm'
import EditChallengeForm from '../components/challenges/EditChallengeForm'
import ChallengesList from '../components/challenges/ChallengesList';
import { useState, useEffect } from "react";
import backendHost from "../utils/backendHost";
import axios from "axios";
import authToken from "../utils/authToken";

import {
    Routes,
    Route,
  } from "react-router-dom";

const HomeChallenges = () => {
    const [leagues, setLeagues] = useState([]);
    const [games, setGames] = useState([]);
    const getLeagues = async () => {
        const l = await axios.get(`${backendHost}/api/leagues`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setLeagues(l.data.leagues);
      };
      const getGames = async () => {
        const l = await axios.get(`${backendHost}/api/games`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setGames(l.data.games);
      };


    useEffect(() => {
        getLeagues();
        getGames();
      }, []);
    
    if(leagues.length>0 && games.length>0){
        return(
            <>
                {console.log('league', leagues)}
                {console.log('games', games)}
                <p>challenge page</p>
                <NewChallengeForm leagues={leagues} games={games}/>
                <ChallengesList leagues={leagues} games={games}/>
            </>
        )
    }
}
export default HomeChallenges