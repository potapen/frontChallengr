import axios from "axios";
import { useState, useEffect } from "react";
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
import Checkbox from '@mui/material/Checkbox';

const EditChallengeForm = ({
  leagues,
  games,
  challenge,
  updateChallengesList,
  updateFullChallengesList,
}) => {
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({
    id: challenge._id,
    game: challenge.game._id,
    contenders: challenge.contenders,
    isCompleted: challenge.isCompleted,
    winners: challenge.winners,
  });

  const storedToken = localStorage.getItem("authToken");

  const getLeaguesMembers = async (leagueId) => {
    const l = await axios.get(`${backendHost}/api/leagues/${leagueId}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    setMembers(l.data.league.members);
    //members come from leagues.members. contenders comes from challenge.contenders.
    //They are different objects so we need to udpate contenders with matching objects from members.
    //otherwise the multi select will show duplicates.
    const contendersBis = l.data.league.members.filter(m=>{
      return challenge.contenders.some(c => c._id === m._id)
    })

    const winnersBis = contendersBis.filter(m=>{
      return challenge.winners.some(c => c._id === m._id)
    })
    console.log('contendersBis', contendersBis)
    console.log('winnersBis', winnersBis)
    
    const newFormData = {
      ...formData,
      contenders: contendersBis,
      winners: winnersBis,
    };
    setFormData(newFormData);

  };
  useEffect(() => {
    getLeaguesMembers(leagues[0]._id);
    // getLeaguesMembers(challenge.league._id);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const contendersId = formData.contenders.map((c) => c._id);
    const cleanedFormData = {
      ...formData,
      contenders: contendersId,
    };
    console.log("cleanedFormData", cleanedFormData);
    const response = await axios.patch(`${backendHost}/api/challenges/${formData.id}`, cleanedFormData, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    console.log('response', response)
    // setFormData({
    //   league: leagues[0]._id,
    //   game: games[0]._id,
    //   contenders: [],
    // });
    updateFullChallengesList();
    updateChallengesList();
  };

  const handleSelect = (event, name) => {
    const { value } = event.target;
    console.log('-----------value', value)
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);
  };

  const handleCheckBox = (event, name) => {
    const { value } = event.target;
    const newFormData = {
      ...formData,
      [name]: Boolean(value),
    };
    
    console.log('-----------newFormData', newFormData)
    setFormData(newFormData);
  };

  if (members.length > 0) {
    return (
      <>
        <h1>Edit Challenge</h1>
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
                <InputLabel id="game-select-label">game</InputLabel>
                <Select
                  labelId="game-select-label"
                  id="game"
                  value={formData.game}
                  label="league"
                  onChange={(event) => handleSelect(event, "game")}
                >
                  {games.map((game) => (
                    <MenuItem key={game._id} value={game._id}>
                      {game.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl fullWidth>
                <InputLabel id="contenders-multiple-chip-label">
                  contenders
                </InputLabel>
                <Select
                  labelId="contenders-multiple-chip-label"
                  id="contenders"
                  multiple
                  value={formData.contenders}
                  onChange={(event) => handleSelect(event, "contenders")}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="contenders"
                    />
                  }
                  renderValue={(contenders) => {
                    return (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {contenders.map((contender) => {
                          return (
                            <Chip
                              key={contender._id}
                              label={contender.username}
                            />
                          );
                        })}
                      </Box>
                    );
                  }}
                >
                  {members.map((member) => (
                    <MenuItem key={member._id} value={member}>
                      {member.username}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl fullWidth>
                <InputLabel id="winners-multiple-chip-label">
                  winners
                </InputLabel>
                <Select
                  labelId="winners-multiple-chip-label"
                  id="winners"
                  multiple
                  value={formData.winners}
                  onChange={(event) => handleSelect(event, "winners")}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="winners"
                    />
                  }
                  renderValue={(winners) => {
                    return (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {winners.map((winner) => {
                          return (
                            <Chip
                              key={winner._id}
                              label={winner.username}
                            />
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
                <Button type="submit">Create challenge</Button>
              </ButtonGroup>
            </Grid>
            <Grid>
              <Checkbox
                  checked={formData.isCompleted}
                  onChange={(event) => handleCheckBox(event, "isCompleted")}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
            </Grid>

          </Box>
        </form>
      </>
    );
  }
};

export default EditChallengeForm;
