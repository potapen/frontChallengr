import { Alert, IconButton, Snackbar } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import React from "react";

function LeagueInviter({ league }) {
  const [open, setOpen] = React.useState(false);

  const copyInvitationLink = () => {
    navigator.clipboard.writeText(league.inviteKey);
    setOpen(true);
  };

  return (
    <>
      <IconButton aria-label="share" onClick={copyInvitationLink}>
        <ShareIcon />
      </IconButton>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Invitation link copied !
        </Alert>
      </Snackbar>
    </>
  );
}

export default LeagueInviter;
