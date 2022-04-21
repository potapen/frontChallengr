import axios from "axios";
import { useState } from "react";
import backendHost from "../../utils/backendHost";

const FinishChallengeForm = ({
  challenge,
  refreshChallenge,
  updateChallengesList,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    id: challenge._id,
    game: challenge.game._id,
    contenders: challenge.contenders.map((c) => c._id),
    isCompleted: challenge.isCompleted,
    winners: challenge.winners.map((c) => c._id),
  });

  const storedToken = localStorage.getItem("authToken");

  const handleSubmit = async (event) => {
    const newFormData = {
      ...formData,
      isCompleted: true,
    };

    event.preventDefault();
    await axios.patch(
      `${backendHost}/api/challenges/${newFormData.id}`,
      newFormData,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    onSubmit();
    refreshChallenge();
    updateChallengesList();
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
      <h2>Finish Challenge</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="winners">winners</label>
          <select
            id="winners"
            name="winners"
            multiple
            onChange={handleMultiSelect}
            value={formData.winners}
          >
            {challenge.contenders.map((member) => (
              <option key={member._id} value={member._id}>
                {member.username}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Finish Challenge</button>
      </form>
    </>
  );
};

export default FinishChallengeForm;
