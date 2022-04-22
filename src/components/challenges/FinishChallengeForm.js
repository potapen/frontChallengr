import axios from "axios";
import { useState } from "react";
import backendHost from "../../utils/backendHost";

import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import ButtonGroup from "@mui/material/ButtonGroup";

const FinishChallengeForm = ({
  challenge,
  refreshChallenge,
  updateChallengesList,
  getLeaguesStats,
  handleClose,
}) => {
  const [formData, setFormData] = useState({
    id: challenge._id,
    game: challenge.game._id,
    contenders: challenge.contenders,
    isCompleted: challenge.isCompleted,
    winners: challenge.winners,
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
    getLeaguesStats();
    handleClose();
    refreshChallenge();
    updateChallengesList();
  };

  const handleSelect = (event, name) => {
    const { value } = event.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);
  };


  return (
    <>
      <h2>Finish Challenge</h2>
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
            <FormControl fullWidth>
              <InputLabel id="winners-multiple-chip-label">winners</InputLabel>
              <Select
                labelId="winners-multiple-chip-label"
                id="winners"
                multiple
                value={formData.winners}
                onChange={(event) => handleSelect(event, "winners")}
                input={
                  <OutlinedInput id="select-multiple-chip" label="winners" />
                }
                renderValue={(winners) => {
                  return (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {winners.map((winner) => {
                        return (
                          <Chip key={winner._id} label={winner.username} />
                        );
                      })}
                    </Box>
                  );
                }}
              >
                {formData.contenders.map((member) => (
                  <MenuItem key={member._id} value={member}>
                    {member.username}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button type="submit">Finish challenge</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </ButtonGroup>
          </Grid>
        </Box>
      </form>
    </>
  );
};

export default FinishChallengeForm;
