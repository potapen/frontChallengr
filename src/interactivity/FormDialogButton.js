import { Box, Button, Dialog, DialogActions, TextField } from "@mui/material";
import * as React from "react";
import './FormDialogButton.css'

export default function FormDialog({ buttonName, children }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button type="button" onClick={handleOpen}>
        {buttonName}
      </Button>
      <Dialog open={open}>
          <div className="FormDialogSubDiv">{children(handleClose)}</div>
        {/* <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
