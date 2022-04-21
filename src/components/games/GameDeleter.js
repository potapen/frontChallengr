import React from "react";
import axios from "axios";

import DeleteIcon from "@mui/icons-material/Delete";

import backendHost from "../../utils/backendHost";
import ConfirmationDialog from "../../interactivity/ConfirmationDialog.js";
import { IconButton } from "@mui/material";

function GameDeleter({ game, updateGamesList }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const storedToken = localStorage.getItem("authToken");

  const deleteGame = async () => {
    await axios.delete(`${backendHost}/api/games/${game._id}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    updateGamesList();
  };

  return (
    <>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <ConfirmationDialog
        title={`Delete ${game.name} game ?`}
        subtitle={`This will irretrievably impact all current challenges`}
        onAccept={deleteGame}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}

export default GameDeleter;
