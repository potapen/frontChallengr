import { useState, useEffect } from "react"
import axios from 'axios'
const ChallengeNew = () => {

    const [newChallenge, setNewChallenge] = useState({
        "contenders": [
            "62568ec9a6714fef61e70653",
            "62568ec9a6714fef61e70654",
            "62568ec9a6714fef61e70655"
        ],
        "league": "62568ec9a6714fef61e70657",
        "game": "62568ec9a6714fef61e70660"
        })
    const [league, setLeague] = useState('Clash of titans')

    useEffect(()=>{
        const getLeague = async ()=>{
            const {data} = await axios.get('https://ih-beers-api2.herokuapp.com/beers')
            setLeague(data)
        }
        getLeague()
    },[])
    const updateField = (event) =>{
        const {id,value} = event.target
        const challenge = {...newChallenge}
        challenge[id] = value
        setNewChallenge(challenge)
    }
    const submitCreate = async (event) => {
        event.preventDefault()
        const response = await axios.post('http://localhost:5005/api/challenges/', newChallenge)
        console.log('response', response)
    }
    
    return(
        <>
            <h1>New Challenge</h1>
            <form onSubmit={submitCreate}>
                <div>
                    <label htmlFor="league">league</label>
                    <input type="text" id="league" value={league} onChange={(e) => setLeague(e.target.value)}></input>
                </div>

                <div>
                    <label htmlFor="game">game</label>
                    <input type="text" id="game" value={newChallenge.game} onChange={updateField}></input>
                </div>

                <div>
                    <label htmlFor="description">contenders</label>
                    <input type="text" id="contenders" value={newChallenge.contenders} onChange={updateField}></input>
                </div>

                <button type="submit">Create Challenge</button>
            </form>
        </>
    )
}

export default ChallengeNew