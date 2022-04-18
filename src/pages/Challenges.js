import NewChallengeForm from '../components/challenges/NewChallengeForm'
import EditChallengeForm from '../components/challenges/EditChallengeForm'

import {
    Routes,
    Route,
  } from "react-router-dom";

const Challenges = () => {
    return(
        <>
            <p>challenge page</p>
            <Routes>
                <Route path="/:challengeId" element={<EditChallengeForm/>}/>
                <Route path="/" element={<NewChallengeForm/>}/>
            </Routes>
        </>

    )
}
export default Challenges