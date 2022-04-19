import React from "react";
import "./LeagueInviter.js";
import axios from "axios";
import LogoutIcon from "@mui/icons-material/Logout";

import backendHost from "../../utils/backendHost";
import ConfirmationDialog from "../../interactivity/ConfirmationDialog.js";
import { IconButton } from "@mui/material";

function LeagueLeaver({ league, updateLeaguesList }) {
  const storedToken = localStorage.getItem("authToken");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const leaveLeague = async () => {
    await axios.patch(
      `${backendHost}/api/leagues/${league._id}/leave`,
      {},
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    updateLeaguesList(league);
  };

  return (
    <>
      <IconButton aria-label="leave" onClick={handleClickOpen}>
        <LogoutIcon />
      </IconButton>
      <ConfirmationDialog
        title={`Leave ${league.name} league ?`}
        subtitle={`You will need the invite key to join the league again`}
        onAccept={leaveLeague}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}

export default LeagueLeaver;
