import { useState, useEffect } from "react"
import axios from 'axios'
import authToken from "../../utils/authToken"
const NewChallengeForm = () => {
    const [leagues, setLeagues] = useState([])
    const [leagueId, setLeagueId] = useState()

    const [games, setGames] = useState([])
    const [gameId, setGameId] = useState()

    const [contenders, setContenders] = useState([])
    const [contendersId, setContendersId] = useState([])

    const [message, setMessage] = useState('select a league, a game and contenders')
    useEffect(()=>{
        const getLeagues = async ()=>{
            const response = await axios.get("http://localhost:5005/api/leagues", {
                headers: {
                  Authorization: `Bearer ${authToken}`,
                },
              })
            setLeagues(response.data)
        }
        const getGames = async ()=>{
            const response = await axios.get("http://localhost:5005/api/games", {
                headers: {
                  Authorization: `Bearer ${authToken}`,
                },
              })
            setGames(response.data)
        }
        getLeagues()
        getGames()
    },[])

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
            league: leagueId,
            game: gameId,
            contenders: contendersId
        }
        console.log('challengeToCreate', challengeToCreate)

        if(contendersId.length===0){setMessage('you must select contenders')}
        if(!gameId){setMessage('you must select a game')}
        if(!leagueId){setMessage('you must select a league')}


    }

    const leagueOnChange = (e) => {
        const currentLeagueId = e.target.value
        setLeagueId(currentLeagueId)
        const findLeaguesArray = leagues.leagues.filter(league => league._id===currentLeagueId)
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
    return(
        <>
            <h1>New Challenge</h1>
            <p> {message} </p>
            <form onSubmit={submitCreate}>
                <div>
                    <label htmlFor="league">league</label>
                    <select id="league" onChange={leagueOnChange}>
                        <option>---league select ---</option>
                        {leagues?.leagues && leagues.leagues.map(league =>
                        {
                            return <option value={league._id}>{league.name}</option>
                        }
                        )}
                    </select>
                </div>

                <div>
                    <label htmlFor="game">game</label>
                    <select id="game" onChange={gameOnChange}>
                        <option>---game select ---</option>
                        {games?.games && games.games.map(game =>
                        {
                            return <option value={game._id}>{game.name}</option>
                        }
                        )}
                    </select>
                </div>

                <div>
                    <label htmlFor="contenders">contenders</label>
                    <select id="contenders" multiple onChange={contenderOnChange}>
                        {(contenders.length >0) && contenders.map(contender =>
                        {
                            return <option value={contender._id}>{contender.username}</option>
                        }
                        )}
                    </select>
                </div>

                <button type="submit">Create Challenge</button>
            </form>
        </>
    )
}

export default NewChallengeForm