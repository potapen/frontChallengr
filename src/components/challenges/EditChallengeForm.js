import axios from "axios";
import { useState, useEffect } from "react";
import authToken from "../../utils/authToken";
import backendHost from "../../utils/backendHost";

const EditChallengeForm = ({challenge,refreshChallenge, leagues,games}) => {
  const [members, setMembers] = useState([])
  const [formData, setFormData] = useState({
    id : challenge._id,
    game : challenge.game._id,
    contenders: challenge.contenders.map(c => c._id),
    isCompleted: challenge.isCompleted,
    winners: challenge.winners.map(c => c._id),
  });

  const getLeaguesMembers = async (leagueId) => {
    const l = await axios.get(`${backendHost}/api/leagues/${leagueId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    setMembers(l.data.league.members)
  };
  useEffect(() => {
    getLeaguesMembers(challenge.league._id)
  }, []);

  const submitUpdate = async (event) => {
    event.preventDefault();
    console.log('formData', formData)
    const l = await axios.patch(`${backendHost}/api/challenges/${formData.id}`,formData,{
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log('submitCreate l', l)
    refreshChallenge()
  };


  const handleChanges = (event) => {
    const { value, name } = event.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);
  };

  const handleCheckbox = (event) => {
    const { checked, name } = event.target;
    const newFormData = {
      ...formData,
      [name]: checked,
    };
    setFormData(newFormData);
  };

  const onLeagueChange = (event) => {
    getLeaguesMembers(event.target.value)
    handleChanges(event)
  };

  const handleMultiSelect = (event) => {
    let value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    const { name } = event.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);
  };
  return (
    <>
      <h1>Edit Challenge</h1>
      <form onSubmit={submitUpdate}>
        <div>
          <label htmlFor="game">game</label>
          <select id="game" name="game" onChange={handleChanges} value={formData.game}>
            {games.map((game) => <option key={game._id} value={game._id}>{game.name}</option>)}
          </select>
        </div>

        <div>
            <label htmlFor="contenders">contenders</label>
            <select id="contenders"  name="contenders" multiple onChange={handleMultiSelect} value={formData.contenders}>
                {members.map(member => <option key={member._id} value={member._id}>{member.username}</option>)}
            </select>
        </div>
        <div>
            <label htmlFor="winners">winners</label>
            <select id="winners"  name="winners" multiple onChange={handleMultiSelect} value={formData.winners}>
                {challenge.contenders.map(member => <option key={member._id} value={member._id}>{member.username}</option>)}
            </select>
        </div>

        <div>
            <label htmlFor="isCompleted">close the challenge</label>
            {(formData.isCompleted)?
            <input id="isCompleted"  name="isCompleted" type='checkbox' checked onChange={handleCheckbox}/>
            :
            <input id="isCompleted"  name="isCompleted" type='checkbox' onChange={handleCheckbox}/>
            }
           
        </div>

        <button type="submit">Edit Challenge</button>
      </form>
    </>
  );
};

export default EditChallengeForm;
