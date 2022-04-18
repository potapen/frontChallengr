import React from "react";
import { useState } from "react";
import axios from "axios";
import FileInput from "../../utils/FileInput";

import backendHost from "../../utils/backendHost";

function EditLeagueForm({ league, refreshLeague }) {
  const [formData, setFormData] = useState({
    name: league.name,
    description: league.description,
    members: league.members.map((member) => {
      return member._id;
    }),
  });

  const storedToken = localStorage.getItem("authToken");

  const [fileData, setFileData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let fd = new FormData();
    fd.append("name", formData["name"]);
    fd.append("description", formData["description"]);
    fd.append("members", formData["members"]);
    fd.append("coverPicture", fileData);
    await axios.put(`${backendHost}/api/leagues/${league._id}`, fd, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-type": "multipart/form-data",
      },
    });
    refreshLeague();
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
      <h1>Edit league</h1>
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
          <label htmlFor="members">Members</label>
          <select
            name="members"
            id="members"
            multiple
            onChange={handleMultiSelect}
            value={formData.members}
          >
            {league.members.map((member) => {
              return (
                <option key={member._id} value={member._id}>
                  {member.username}
                </option>
              );
            })}
          </select>
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
          <button type="submit">Edit league</button>
        </div>
      </form>
    </div>
  );
}

export default EditLeagueForm;
