import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import * as React from "react";

export default function ConfirmationDialog({
  title,
  subtitle,
  onAccept,
  setOpen,
  open,
}) {
  const handleAccept = () => {
    onAccept();
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {subtitle}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleAccept} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
