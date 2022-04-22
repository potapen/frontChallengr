import React, { useState } from "react";
import axios from "axios";
import backendHost from "../../utils/backendHost";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";

function LeagueJoiner({handleClose,getLeagues}) {
  const [inviteKey, setInviteKey] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  const joinLeague = async (event) => {
    event.preventDefault();
    await axios.patch(
      `${backendHost}/api/leagues/join`,
      { inviteKey },
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    handleClose();
    getLeagues();
  };

  const handleChanges = (event) => {
    setInviteKey(event.target.value);
  };

  return (
    <form onSubmit={joinLeague} encType="multipart/form-data">
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
              id="inviteKey"
              name="inviteKey"
              label="invite Key"
              type="text"
              value={inviteKey}
              onChange={handleChanges}
            />
          </Grid>
      </Box>
      <Grid>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button type="submit">Join league</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </ButtonGroup>
          </Grid>
      {/* <div>
        <label htmlFor="name">Invite Key</label>
        <input
          id="inviteKey"
          name="inviteKey"
          value={inviteKey}
          type="text"
          onChange={handleChanges}
        />
      </div>
      <button type="submit">Join</button> */}
    </form>
  );
}

export default LeagueJoiner;
