import React from "react";
import "./LeagueInviter.js";
import axios from "axios";

import DeleteIcon from "@mui/icons-material/Delete";

import backendHost from "../../utils/backendHost";
import ConfirmationDialog from "../../interactivity/ConfirmationDialog.js";
import { IconButton } from "@mui/material";

function LeagueDeleter({ league, updateLeaguesList }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const storedToken = localStorage.getItem("authToken");

  const deleteLeague = async () => {
    await axios.delete(`${backendHost}/api/leagues/${league._id}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    updateLeaguesList(league);
  };

  return (
    <>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <ConfirmationDialog
        title={`Delete ${league.name} league ?`}
        subtitle={`This will irretrievably impact all current members of the league`}
        onAccept={deleteLeague}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}

export default LeagueDeleter;
