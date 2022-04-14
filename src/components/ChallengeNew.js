import { useState } from "react"
import axios from 'axios'
const BeerNew = () => {

    const [newBeer, setNewBeer] = useState({
        name : 'my own beer',
        tagline : 'good stuff',
        description : 'very very good stuff',
        first_brewed : '01/01/2022',
        brewers_tips : 'boil it',
        attenuation_level : 0,
        contributed_by : 'master booze',
    })
    const updateField = (event) =>{
        const {id,value} = event.target
        const beer = {...newBeer}
        beer[id] = value
        setNewBeer(beer)
    }
    const submitCreate = async (event) => {
        event.preventDefault()
        console.log('newBeer', newBeer)
        const response = await axios.post('https://ih-beers-api2.herokuapp.com/beers/new', newBeer)
        console.log('response', response)
    }
    
    return(
        <>
            <h1>New Beer</h1>
            <form onSubmit={submitCreate}>
                <div>
                    <label htmlFor="name">name</label>
                    <input type="text" id="name" value={newBeer.name} onChange={updateField}></input>
                </div>

                <div>
                    <label htmlFor="tagline">tagline</label>
                    <input type="text" id="tagline" value={newBeer.tagline} onChange={updateField}></input>
                </div>

                <div>
                    <label htmlFor="description">description</label>
                    <input type="text" id="description" value={newBeer.description} onChange={updateField}></input>
                </div>

                <div>
                    <label htmlFor="first_brewed">first_brewed</label>
                    <input type="text" id="first_brewed" value={newBeer.first_brewed} onChange={updateField}></input>
                </div>

                <div>
                    <label htmlFor="brewers_tips">brewers_tips</label>
                    <input type="text" id="brewers_tips" value={newBeer.brewers_tips} onChange={updateField}></input>
                </div>

                <div>
                    <label htmlFor="attenuation_level">attenuation_level</label>
                    <input type="number" id="attenuation_level" value={newBeer.attenuation_level} onChange={updateField}></input>
                </div>

                <div>
                    <label htmlFor="contributed_by">contributed_by</label>
                    <input type="text" id="contributed_by" value={newBeer.contributed_by} onChange={updateField}></input>
                </div>
                <button type="submit">Create Beer</button>
            </form>
        </>
    )
}

export default BeerNew