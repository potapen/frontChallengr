import React from "react";
import { useState } from "react";
import axios from "axios";
import backendHost from "../../utils/backendHost";
import { Button, Slider } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";

function EditPointForm({ point, refreshPoint, handleClose }) {
  const [formData, setFormData] = useState({
    points: point.points,
  });
  const storedToken = localStorage.getItem("authToken");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.patch(`${backendHost}/api/points/${point._id}`, formData, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    refreshPoint();
    handleClose();
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
          <Slider
            value={formData.points}
            aria-label="Default"
            valueLabelDisplay="on"
            id="points"
            name="points"
            label="points"
            onChange={handleChanges}
            min={1}
            max={100}
          />
        </Grid>
        <Grid>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button type="submit">Edit Point</Button>
            <Button onClick={handleClose}>Close</Button>
          </ButtonGroup>
        </Grid>
      </Box>
    </form>
  );
}

export default EditPointForm;
