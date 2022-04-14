import { useState, useEffect } from "react"
import axios from 'axios'
import authToken from "../../utils/authToken"
const ChallengeNew = () => {

    const [leagues, setLeagues] = useState([])

    const [games, setGames] = useState([])

    const [contenders, setContenders] = useState([])
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


    const submitCreate = async (event) => {
        event.preventDefault()
        console.log('response')
        const leagueId = event.target[0].value
        const gameId = event.target[1].value
        const contenders = event.target[2].value
        console.log(event.target[2])

    }

    const leagueOnChange = (e) => {
        const currentLeagueId = e.target.value
        const findLeaguesArray = leagues.leagues.filter(league => league._id===currentLeagueId)
        const membersArray = findLeaguesArray[0].members
        setContenders(membersArray)
    }
    return(
        <>
            <h1>New Challenge</h1>
            <form onSubmit={submitCreate}>
                <div>
                    <label htmlFor="league">league</label>
                    <select id="league" onChange={leagueOnChange}>
                        <option>please select a league</option>
                        {leagues?.leagues && leagues.leagues.map(league =>
                        {
                            return <option value={league._id}>{league.name}</option>
                        }
                        )}
                    </select>
                </div>

                <div>
                    <label htmlFor="game">game</label>
                    <select id="game">
                        {games?.games && games.games.map(game =>
                        {
                            return <option value={game._id}>{game.name}</option>
                        }
                        )}
                    </select>
                </div>

                <div>
                    <label htmlFor="contenders">contenders</label>
                    <select id="contenders" multiple>
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

export default ChallengeNew