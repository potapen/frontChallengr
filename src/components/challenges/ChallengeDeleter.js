import React from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import backendHost from "../../utils/backendHost";
import ConfirmationDialog from "../../interactivity/ConfirmationDialog.js";
import { IconButton } from "@mui/material";

function ChallengeDeleter({
  challenge,
  updateChallengesList,
  updateFullChallengesList,
}) {
  const [open, setOpen] = React.useState(false);
  const storedToken = localStorage.getItem("authToken");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const deleteChallenge = async () => {
    await axios.delete(`${backendHost}/api/challenges/${challenge._id}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    updateChallengesList();
    updateFullChallengesList();
  };

  return (
    <>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <ConfirmationDialog
        title={`Delete challenge ?`}
        subtitle={`This will irretrievably impact your stats`}
        onAccept={deleteChallenge}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}

export default ChallengeDeleter;
