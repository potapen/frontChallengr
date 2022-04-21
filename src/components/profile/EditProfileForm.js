import React from "react";
import { useState } from "react";
import axios from "axios";
import FileInput from "../../utils/FileInput";

import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

import backendHost from "../../utils/backendHost";

import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";

function EditProfileForm({ profile, updateProfile, handleClose }) {
  const [formData, setFormData] = useState({
    username: profile.username,
  });

  const { updateProfilePicture } = useContext(AuthContext);

  const storedToken = localStorage.getItem("authToken");

  const [fileData, setFileData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let fd = new FormData();
    fd.append("username", formData["username"]);
    fd.append("coverPicture", fileData);
    await axios.put(`${backendHost}/api/profile/`, fd, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-type": "multipart/form-data",
      },
    });
    updateProfile();
    handleClose();
    updateProfilePicture();
  };

  const handleChanges = (event) => {
    const { value, name } = event.target;
    console.log(event.target);
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
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          "& > *": {
            m: 1,
            r: 1,
            t: 1,
          },
        }}
      >
        <Grid>
          <TextField
            id="username"
            name="username"
            label="username"
            type="text"
            value={formData.username}
            onChange={handleChanges}
          />
        </Grid>
        <Grid>
          <label htmlFor="coverPicture">Picture </label>
          <FileInput
            id="coverPicture"
            name="coverPicture"
            value={fileData}
            type="file"
            onChange={handleFileChanges}
          />
        </Grid>
        <Grid>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button type="submit">Edit profile</Button>
            <Button onClick={handleClose}>Close</Button>
          </ButtonGroup>
        </Grid>
      </Box>
    </form>
  );
}

export default EditProfileForm;
