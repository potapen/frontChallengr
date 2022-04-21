import axios from "axios";
import { useState, useEffect } from "react";
import backendHost from "../../utils/backendHost";

const ChallengeNew = ({ leagues, games }) => {
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({
    league: leagues[0]._id,
    game: games[0]._id,
    contenders: [],
  });

  const storedToken = localStorage.getItem("authToken");

  const getLeaguesMembers = async (leagueId) => {
    const l = await axios.get(`${backendHost}/api/leagues/${leagueId}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    setMembers(l.data.league.members);
  };
  useEffect(() => {
    getLeaguesMembers(leagues[0]._id);
  }, []);

  const submitCreate = async (event) => {
    event.preventDefault();
    await axios.post(`${backendHost}/api/challenges`, formData, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    setFormData({
      league: leagues[0]._id,
      game: games[0]._id,
      contenders: [],
    });
  };

  const handleChanges = (event) => {
    const { value, name } = event.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);
  };

  const onLeagueChange = (event) => {
    getLeaguesMembers(event.target.value);
    handleChanges(event);
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
      <h1>New Challenge</h1>
      <form onSubmit={submitCreate}>
        <div>
          <label htmlFor="league">league</label>
          <select
            id="league"
            name="league"
            onChange={onLeagueChange}
            value={formData.league}
          >
            {leagues.map((league) => (
              <option key={league._id} value={league._id}>
                {league.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="game">game</label>
          <select
            id="game"
            name="game"
            onChange={handleChanges}
            value={formData.game}
          >
            {games.map((game) => (
              <option key={game._id} value={game._id}>
                {game.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contenders">contenders</label>
          <select
            id="contenders"
            name="contenders"
            multiple
            onChange={handleMultiSelect}
          >
            {members.map((member) => (
              <option key={member._id} value={member._id}>
                {member.username}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Create Challenge</button>
      </form>
    </>
  );
};

export default ChallengeNew;
