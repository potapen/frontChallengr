import React from "react";
import { useState } from "react";
import axios from "axios";
import FileInput from "../../utils/FileInput";

import backendHost from "../../utils/backendHost";

import { Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import ButtonGroup from '@mui/material/ButtonGroup';





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
    // console.log('fd', fd)
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
    const { value } = event.target;
    const newFormData = {
      ...formData,
      members: value,
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
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        '& > *': {
          m:1,
          r:1,
          t:1,
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
    <FormControl>
        <InputLabel id="demo-multiple-chip-label">members</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={formData.members}
          onChange={handleMultiSelect}
          input={<OutlinedInput id="select-multiple-chip" label="members" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => 
                {
                  let memberObj = league.members.filter( m => m['_id']===value)
                  return <Chip key={value} label={memberObj[0].username} />
                }
              )}
            </Box>
          )}

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
      </FormControl>

    </Grid>
      <Grid>
        <label htmlFor="coverPicture">Picture  </label>
        <FileInput
          id="coverPicture"
          name="coverPicture"
          value={fileData}
          type="file"
          onChange={handleFileChanges}
        />
      </Grid>
      <Grid>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button type="submit">Edit league</Button>
          <Button onClick={handleClose}>Close</Button>
        </ButtonGroup>
      </Grid>
    </Box>
    </form>
  );
}

export default EditLeagueForm;
