import React from "react";
import { useState } from "react";
import axios from "axios";

import authToken from "../../utils/authToken";

function NewLeagueForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    coverPicture: null,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    await axios.post("http://localhost:3000/api/leagues", formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    setFormData({
      name: "",
      description: "",
      coverPicture: null,
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

  return (
    <div className="formContainer">
      <h1>Add new league</h1>
      <form onSubmit={handleSubmit} enctype="multipart/form-data">
        <div>
          <label for="name">Name</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            type="text"
            onChange={handleChanges}
          />
        </div>
        <div>
          <label for="description">description</label>
          <input
            id="description"
            name="description"
            value={formData.description}
            type="text"
            onChange={handleChanges}
          />
        </div>
        <div>
          <label for="coverPicture">Picture</label>
          <input
            id="coverPicture"
            name="coverPicture"
            value={formData.coverPicture}
            type="file"
            onChange={handleChanges}
          />
        </div>
        <div>
          <button type="submit">Create league</button>
        </div>
      </form>
    </div>
  );
}

export default NewLeagueForm;
