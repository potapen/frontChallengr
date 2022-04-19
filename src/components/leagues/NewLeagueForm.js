import React from "react";
import { useState } from "react";
import axios from "axios";
import FileInput from "../../utils/FileInput";

import backendHost from "../../utils/backendHost";

function NewLeagueForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const storedToken = localStorage.getItem("authToken");

  const [fileData, setFileData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let fd = new FormData();
    fd.append("name", formData["name"]);
    fd.append("description", formData["description"]);
    fd.append("coverPicture", fileData);
    await axios.post(`${backendHost}/api/leagues`, fd, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-type": "multipart/form-data",
      },
    });
    setFormData({
      name: "",
      description: "",
    });
    setFileData(null);
    onSubmit();
  };

  const handleChanges = (event) => {
    const { value, name } = event.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);
  };

  const handleFileChanges = (event) => {
    setFileData(event.target.files[0]);
  };

  return (
    <div className="formContainer">
      <h1>Add new league</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            type="text"
            onChange={handleChanges}
          />
        </div>
        <div>
          <label htmlFor="description">description</label>
          <input
            id="description"
            name="description"
            value={formData.description}
            type="text"
            onChange={handleChanges}
          />
        </div>
        <div>
          <label htmlFor="coverPicture">Picture</label>
          <FileInput
            id="coverPicture"
            name="coverPicture"
            value={fileData}
            type="file"
            onChange={handleFileChanges}
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
