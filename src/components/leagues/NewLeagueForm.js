import React from "react";
import { useState } from "react";
import axios from "axios";
import FileInput from "../../utils/FileInput";

import backendHost from "../../utils/backendHost";

import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";

function NewLeagueForm({ handleClose ,getLeagues}) {
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
    const response = await axios.post(`${backendHost}/api/leagues`, fd, {
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
    handleClose();
    getLeagues();
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
    <>
      <h1>Add new league</h1>
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
              id="name"
              name="name"
              label="name"
              type="text"
              value={formData.name}
              onChange={handleChanges}
            />
          </Grid>
          <Grid>
            <TextField
              id="description"
              name="description"
              label="description"
              multiline
              maxRows={4}
              type="text"
              value={formData.description}
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
              <Button type="submit">Create league</Button>
              <Button onClick={handleClose}>Close</Button>
            </ButtonGroup>
          </Grid>
        </Box>
      </form>
    </>
  );
}

export default NewLeagueForm;
