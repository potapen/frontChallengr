import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import authToken from "../../utils/authToken";
import backendHost from "../../utils/backendHost";

const EditChallengeForm = () => {
    const {challengeId} = useParams();

    const [leagues, setLeagues] = useState([]); //for axios call to get leagues
    const [leagueId, setLeagueId] = useState(); //set after the previous axios call or when the form field is changed 

    const [games, setGames] = useState([]); //for axios call to get games
    const [gameId, setGameId] = useState(); //set after the previous axios call or when the form field is changed 

    const [contenders, setContenders] = useState([]);
    const [contendersId, setContendersId] = useState([]);

    const [message, setMessage] = useState('select a league, a game and contenders'); //to display a message at the top

    const [challenge, setChallenge] = useState({}); //for axios call to get specific challenge
    useEffect(()=>{
        const getLeagues = async ()=>{
            // const response = await axios.get("http://localhost:5005/api/leagues", {
            const response = await axios.get(`${backendHost}/api/leagues`, {
                headers: {
                  Authorization: `Bearer ${authToken}`,
                },
              });
            setLeagues(response.data.leagues);
            return response;
        }
        const getGames = async ()=>{
            // const response = await axios.get("http://localhost:5005/api/games", {
            const response = await axios.get(`${backendHost}/api/games`, {
                headers: {
                  Authorization: `Bearer ${authToken}`,
                },
              });
            setGames(response.data.games);
            return response;
        }
        const getChallenge = async ()=>{
            // const response = await axios.get(`http://localhost:5005/api/challenges/${challengeId}`, {
            const response = await axios.get(`${backendHost}/api/challenges/${challengeId}`, {
                headers: {
                  Authorization: `Bearer ${authToken}`,
                },
              });
            setChallenge(response.data.challenge);
            // challenge.contenders.map(cont => cont._id)
            setLeagueId(response.data.challenge.league._id);
            return response;
            
        }
        const retrieveData = async()=>{
            const leagueResponse = await getLeagues();
            await getGames();
            const challengeResponse = await getChallenge();
            const currentLeagueId = challengeResponse.data.challenge.league._id
            const currentLeagues = leagueResponse.data.leagues
            const currentLeague = currentLeagues.filter(league => league._id === currentLeagueId )[0]
            const allUsers = currentLeague.members
            const currentUsersId = challengeResponse.data.challenge.contenders.map(c => c._id)
            setContendersId(currentUsersId)//the id of the contenders to pre select

            setContenders(allUsers)//all the contenders, retrieved from the league
            const currentGameId = challengeResponse.data.challenge.game._id
            setGameId(currentGameId)
            
        }

        retrieveData()

    },[challengeId])

/*
what we need to send
{
"contenders": [
	"62568ec9a6714fef61e70653",
	"62568ec9a6714fef61e70654",
	"62568ec9a6714fef61e70655"
],
"league": "62568ec9a6714fef61e70657",
"game": "62568ec9a6714fef61e70660"
}
*/

    const submitCreate = async (event) => {
        event.preventDefault()
        const challengeToCreate = {
            id : challenge._id,
            league: leagueId,
            game: gameId,
            contenders: contendersId
        }
        
        console.log('challengeToCreate', challengeToCreate);

        if(contendersId.length===0){setMessage('you must select contenders')}
        else if(!gameId){setMessage('you must select a game')}
        else if(!leagueId){setMessage('you must select a league')}
        else{
            const response = await axios.put(`http://localhost:5005/api/challenges/${challengeId}`, challengeToCreate,{
                headers: {
                  Authorization: `Bearer ${authToken}`,
                },
              });
            console.log('submit response:', response)
        }


    }

    const leagueOnChange = (e) => {
        const currentLeagueId = e.target.value
        setLeagueId(currentLeagueId)
        const findLeaguesArray = leagues.filter(league => league._id===currentLeagueId)
        const membersArray = findLeaguesArray[0].members
        setContenders(membersArray)
    }

    const gameOnChange = (e) => {
        const currentGameId = e.target.value
        setGameId(currentGameId)
    }

    const contenderOnChange = (e) => {
        // console.log(e.target)
        const selectedContendersId = []
        for(let i=0 ; i<e.target.length; i++){
            // console.log(`selected ${e.target[i].selected} value ${e.target[i].value}`)
            if(e.target[i].selected){selectedContendersId.push(e.target[i].value)}
        }
        setContendersId(selectedContendersId)
    }
    if(
        (leagues.length >0) &&
        (Object.keys(challenge).length > 0) &&
        (games.length >0) &&
        (contenders.length >0)
    ){
    return(
        <>
            <h1>Edit Challenge</h1>
            <p> {message} </p>
            <form onSubmit={submitCreate}>

                <div>
                    <label htmlFor="league">league</label>
                    <select id="league" onChange={leagueOnChange} value={leagueId}>
                        <option key='leagueSelect'>---league select ---</option>
                        {leagues.map(league => <option key={league._id} value={league._id}>{league.name}</option>)}
                    </select>
                </div>

                <div>
                    <label htmlFor="game">game</label>
                    <select id="game" onChange={gameOnChange} value={gameId}>
                        <option key='gameSelect'>---game select ---</option>
                        {games.map(game => <option key={game._id} value={game._id}>{game.name}</option>)}
                    </select>
                </div>

                <div>
                    <label htmlFor="contenders">contenders</label>
                    <select id="contenders" multiple onChange={contenderOnChange} value={contendersId}>
                        {contenders.map(contender => <option key={contender._id} value={contender._id}>{contender.username}</option>)}
                    </select>
                </div>

                <button type="submit">Create Challenge</button>
            </form>
        </>
    )
}else{return <p>Loading</p>}
}
export default EditChallengeForm