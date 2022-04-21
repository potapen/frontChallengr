import React, { useState } from "react";
import "./LeagueInviter.js";
import axios from "axios";
import LogoutIcon from "@mui/icons-material/Logout";

import backendHost from "../../utils/backendHost";
import ConfirmationDialog from "../../interactivity/ConfirmationDialog.js";
import { Alert, IconButton, Snackbar } from "@mui/material";

function LeagueLeaver({ league, updateLeaguesList }) {
  const storedToken = localStorage.getItem("authToken");
  const [open, setOpen] = React.useState(false);
  const [openSB, setOpenSB] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const leaveLeague = async () => {
    try {
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
    } catch (error) {
      const errorDescription = error.response.data.message;
      setOpenSB(true);
      setErrorMessage(errorDescription);
    }
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
      <Snackbar
        open={openSB}
        autoHideDuration={6000}
        onClose={() => {
          setOpenSB(false);
        }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default LeagueLeaver;
