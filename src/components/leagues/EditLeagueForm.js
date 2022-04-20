import React from "react";
import { useState } from "react";
import axios from "axios";
import FileInput from "../../utils/FileInput";

import backendHost from "../../utils/backendHost";

import { Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';




function EditLeagueForm({ league, refreshLeague, handleClose }) {
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
    handleClose();
  };

  const handleMultiSelect = (event) => {
    console.log('event', event)
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

  const handleMultiSelect2 = (event) => {
    const { value } = event.target;
    const newFormData = {
      ...formData,
      members: value,
    };
    setFormData(newFormData);
  };

  const handleChanges = (event) => {
    const { value, name } = event.target;
    console.log(event.target)
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
      <Grid item>
          <TextField
            sx={{ m: 1, width: '30ch' }}
            id="name"
            name="name"
            label="name"
            type="text"
            value={formData.name}
            onChange={handleChanges}
          />
    </Grid>
    <Grid item>
          <TextField
            sx={{ m: 1, width: '30ch' }}
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
    <Grid item>
      <InputLabel id="members">members</InputLabel>
      <Select
        labelId="members"
        id="members"
        multiple
        value={formData.members}
        onChange={handleMultiSelect2}
      >
        {league.members.map((member) => (
          <MenuItem
            key={member._id}
            value={member._id}
          >
            {member.username}
          </MenuItem>
        ))}
      </Select>
    </Grid>

      {/* <div>
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
      </div> */}
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
        <Button type="submit">Edit league</Button>
        <Button onClick={handleClose}>Close</Button>
      </div>
    </form>
  );
}

export default EditLeagueForm;
