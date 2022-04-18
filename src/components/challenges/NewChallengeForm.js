import { useState, useEffect } from "react";
import axios from "axios";
import authToken from "../../utils/authToken";
import backendHost from "../../utils/backendHost";

const ChallengeNew = () => {
  const [leagues, setLeagues] = useState([]);

  const [games, setGames] = useState([]);

  const [contenders, setContenders] = useState([]);

  const [message, setMessage] = useState('select a league, a game and contenders'); //to display a message at the top

  const [contendersId, setContendersId] = useState([]);

  useEffect(() => {
    const getLeagues = async () => {
      const response = await axios.get(`${backendHost}/api/leagues`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setLeagues(response.data);
    };
    const getGames = async () => {
      const response = await axios.get(`${backendHost}/api/games`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setGames(response.data);
    };
    getLeagues();
    getGames();
  }, []);

  const submitCreate = async (event) => {
    event.preventDefault();
    const leagueId = event.target[0].value;
    const gameId = event.target[1].value;
    const contenders = event.target[2].value;

    const challengeToCreate = {
      league: leagueId,
      game: gameId,
      contenders: contenders
    }
    
    console.log('challengeToCreate', challengeToCreate);

    if(contenders.length===0){setMessage('you must select contenders')}
    else if(!gameId){setMessage('you must select a game')}
    else if(!leagueId){setMessage('you must select a league')}
    else{
        const response = await axios.post(`http://localhost:5005/api/challenges}`, challengeToCreate,{
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
        console.log('submit response:', response)
    }

  };
  const contenderOnChange = (e) => {
    // console.log(e.target)
    const selectedContendersId = []
    for(let i=0 ; i<e.target.length; i++){
        // console.log(`selected ${e.target[i].selected} value ${e.target[i].value}`)
        if(e.target[i].selected){selectedContendersId.push(e.target[i].value)}
    }
    setContendersId(selectedContendersId)
}

  const leagueOnChange = (e) => {
    const currentLeagueId = e.target.value;
    const findLeaguesArray = leagues.leagues.filter(
      (league) => league._id === currentLeagueId
    );
    const membersArray = findLeaguesArray[0].members;
    setContenders(membersArray);
  };
  return (
    <>
      <h1>New Challenge</h1>
      <p> {message} </p>
      <form onSubmit={submitCreate}>
        <div>
          <label htmlFor="league">league</label>
          <select id="league" onChange={leagueOnChange}>
            <option>please select a league</option>
            {leagues?.leagues &&
              leagues.leagues.map((league) => {
                return <option key={league._id} value={league._id}>{league.name}</option>;
              })}
          </select>
        </div>

        <div>
          <label htmlFor="game">game</label>
          <select id="game">
            {games?.games &&
              games.games.map((game) => {
                return <option key={game._id} value={game._id}>{game.name}</option>;
              })}
          </select>
        </div>

        <div>
          <label htmlFor="contenders">contenders</label>
          <select id="contenders" multiple>
            {contenders.length > 0 &&
              contenders.map((contender) => {
                return (
                  <option key={contender._id} value={contender._id}>{contender.username}</option>
                );
              })}
          </select>
        </div>

        <button type="submit">Create Challenge</button>
      </form>
    </>
  );
};

export default ChallengeNew;
