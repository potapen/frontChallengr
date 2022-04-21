import axios from "axios";
import { useState, useEffect } from "react";
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

const NewChallengeForm = ({ leagues, games, handleClose }) => {
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({
    league: leagues[0]._id,
    game: games[0]._id,
    contenders: [],
  });

  const storedToken = localStorage.getItem("authToken");

  const getLeaguesMembers = async (leagueId) => {
    const l = await axios.get(`${backendHost}/api/leagues/${leagueId}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    setMembers(l.data.league.members);
  };
  useEffect(() => {
    getLeaguesMembers(leagues[0]._id);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const contendersId = formData.contenders.map(c => c._id)
    const cleanedFormData = {
      ...formData,
      contenders: contendersId,
    }
    console.log('cleanedFormData', cleanedFormData)
    await axios.post(`${backendHost}/api/challenges`, cleanedFormData, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    setFormData({
      league: leagues[0]._id,
      game: games[0]._id,
      contenders: [],
    });
  };

  const onLeagueChange = (event) => {
    getLeaguesMembers(event.target.value);
    handleSelect(event,'league')
  };


  const handleSelect = (event, name) => {
    const { value } = event.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);
  };

  if(members.length >0){
    return (
      <>
        <h1>New Challenge</h1>
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
              <FormControl fullWidth>
                <InputLabel id="league-select-label">league</InputLabel>
                <Select
                  labelId="league-select-label"
                  id="league"
                  value={formData.league}
                  label="league"
                  onChange={onLeagueChange}
                >
                  {leagues.map((league) => (
                    <MenuItem key={league._id} value={league._id}>
                      {league.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl fullWidth>
                <InputLabel id="game-select-label">game</InputLabel>
                <Select
                  labelId="game-select-label"
                  id="game"
                  value={formData.game}
                  label="league"
                  // onChange={handleChanges}
                  onChange={(event)=>handleSelect(event,'game')}
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
                <InputLabel id="contenders-multiple-chip-label">contenders</InputLabel>
                <Select
                  labelId="contenders-multiple-chip-label"
                  id="contenders"
                  multiple
                  value={formData.contenders}
                  onChange={(event)=>handleSelect(event,'contenders')}
                  input={<OutlinedInput id="select-multiple-chip" label="contenders" />}
                  renderValue={(contenders) => {
                    return <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {
                        contenders.map((contender) => 
                        {
                          return <Chip key={contender._id} label={contender.username} />
                        }
                      )}
                    </Box>
                    }
                  }
  
                >
                  {members.map((member) => (
                    <MenuItem
                      key={member._id}
                      value={member}
                    >
                      {member.username}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid>
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button type="submit">Create challenge</Button>
                <Button onClick={handleClose}>Close</Button>
              </ButtonGroup>
            </Grid>
          </Box>
        </form>
      </>
    );
  }
};

export default NewChallengeForm;
