import React from "react";
import { useState } from "react";
import axios from "axios";

import authToken from "../../utils/authToken";

function EditPointForm({ point, refreshPoint }) {
  const [formData, setFormData] = useState({
    points: point.points,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.patch(
      `http://localhost:3000/api/points/${point._id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    refreshPoint();
  };

  const handleChanges = (event) => {
    const { value, name } = event.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);
  };

  return (
    <div className="formContainer">
      <h1>Edit Point</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="points">Points</label>
          <input
            id="points"
            name="points"
            value={formData.points}
            type="number"
            onChange={handleChanges}
          />
        </div>
        <div>
          <button type="submit">Edit Point</button>
        </div>
      </form>
    </div>
  );
}

export default EditPointForm;
